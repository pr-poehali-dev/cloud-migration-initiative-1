import { useState, useRef, useEffect, useCallback } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, Sparkles, Trophy, RotateCcw, Star, Gift } from "lucide-react"

// ──────────────────────────────────────────────
//  Wheel segments configuration
// ──────────────────────────────────────────────
const SEGMENTS = [
  { label: "500 ₽",   color: "#1d4ed8", textColor: "#fff", prize: "500 рублей",      emoji: "💸" },
  { label: "Пусто",   color: "#0f172a", textColor: "#94a3b8", prize: null,            emoji: "😢" },
  { label: "1 000 ₽", color: "#2563eb", textColor: "#fff", prize: "1 000 рублей",    emoji: "🤑" },
  { label: "Попытка", color: "#1e3a8a", textColor: "#93c5fd", prize: "Ещё попытка",  emoji: "🔄" },
  { label: "250 ₽",   color: "#1d4ed8", textColor: "#fff", prize: "250 рублей",      emoji: "💰" },
  { label: "Пусто",   color: "#0f172a", textColor: "#94a3b8", prize: null,            emoji: "😢" },
  { label: "5 000 ₽", color: "#7c3aed", textColor: "#fff", prize: "5 000 рублей",    emoji: "🏆" },
  { label: "100 ₽",   color: "#1e40af", textColor: "#bfdbfe", prize: "100 рублей",   emoji: "🎁" },
  { label: "Пусто",   color: "#0f172a", textColor: "#94a3b8", prize: null,            emoji: "😢" },
  { label: "750 ₽",   color: "#2563eb", textColor: "#fff", prize: "750 рублей",      emoji: "💎" },
  { label: "Пусто",   color: "#0f172a", textColor: "#94a3b8", prize: null,            emoji: "😢" },
  { label: "2 500 ₽", color: "#4f46e5", textColor: "#fff", prize: "2 500 рублей",    emoji: "✨" },
]

const TOTAL = SEGMENTS.length
const SEGMENT_ANGLE = 360 / TOTAL

// ──────────────────────────────────────────────
//  Draw wheel on canvas
// ──────────────────────────────────────────────
function drawWheel(canvas: HTMLCanvasElement, rotation: number) {
  const ctx = canvas.getContext("2d")!
  const W = canvas.width
  const cx = W / 2
  const cy = W / 2
  const radius = W / 2 - 6

  ctx.clearRect(0, 0, W, W)

  SEGMENTS.forEach((seg, i) => {
    const startAngle = ((i * SEGMENT_ANGLE - 90 + rotation) * Math.PI) / 180
    const endAngle = (((i + 1) * SEGMENT_ANGLE - 90 + rotation) * Math.PI) / 180

    // slice fill
    ctx.beginPath()
    ctx.moveTo(cx, cy)
    ctx.arc(cx, cy, radius, startAngle, endAngle)
    ctx.closePath()
    ctx.fillStyle = seg.color
    ctx.fill()

    // slice border
    ctx.beginPath()
    ctx.moveTo(cx, cy)
    ctx.arc(cx, cy, radius, startAngle, endAngle)
    ctx.closePath()
    ctx.strokeStyle = "rgba(59,130,246,0.25)"
    ctx.lineWidth = 1.5
    ctx.stroke()

    // label
    const midAngle = startAngle + (endAngle - startAngle) / 2
    const labelR = radius * 0.67
    const lx = cx + Math.cos(midAngle) * labelR
    const ly = cy + Math.sin(midAngle) * labelR

    ctx.save()
    ctx.translate(lx, ly)
    ctx.rotate(midAngle + Math.PI / 2)
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillStyle = seg.textColor
    ctx.font = `bold ${W * 0.038}px Inter, sans-serif`
    ctx.fillText(seg.label, 0, 0)
    ctx.restore()
  })

  // center circle
  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, W * 0.09)
  grad.addColorStop(0, "#1e40af")
  grad.addColorStop(1, "#0f172a")
  ctx.beginPath()
  ctx.arc(cx, cy, W * 0.09, 0, Math.PI * 2)
  ctx.fillStyle = grad
  ctx.fill()
  ctx.strokeStyle = "rgba(96,165,250,0.5)"
  ctx.lineWidth = 2
  ctx.stroke()

  // center icon ★
  ctx.fillStyle = "#60a5fa"
  ctx.font = `bold ${W * 0.065}px serif`
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillText("★", cx, cy)
}

// ──────────────────────────────────────────────
//  Confetti particles
// ──────────────────────────────────────────────
interface Particle {
  x: number; y: number; vx: number; vy: number
  color: string; size: number; alpha: number; rotation: number; rotationV: number
}

function createConfetti(count: number): Particle[] {
  const colors = ["#3b82f6","#8b5cf6","#06b6d4","#f59e0b","#10b981","#f43f5e"]
  return Array.from({ length: count }, () => ({
    x: Math.random() * window.innerWidth,
    y: -20,
    vx: (Math.random() - 0.5) * 4,
    vy: Math.random() * 3 + 2,
    color: colors[Math.floor(Math.random() * colors.length)],
    size: Math.random() * 8 + 4,
    alpha: 1,
    rotation: Math.random() * 360,
    rotationV: (Math.random() - 0.5) * 6,
  }))
}

// ──────────────────────────────────────────────
//  Main component
// ──────────────────────────────────────────────
export default function SpinWin() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const confettiRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const confettiRafRef = useRef<number>(0)
  const particlesRef = useRef<Particle[]>([])

  const [spinning, setSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const rotationRef = useRef(0)
  const [result, setResult] = useState<typeof SEGMENTS[0] | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [spinsLeft, setSpinsLeft] = useState(3)
  const [history, setHistory] = useState<typeof SEGMENTS[0][]>([])

  // ── Draw wheel ──
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    drawWheel(canvas, rotation)
  }, [rotation])

  // ── Resize canvas ──
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const size = Math.min(window.innerWidth - 48, 380)
    canvas.width = size
    canvas.height = size
    drawWheel(canvas, rotationRef.current)
  }, [])

  // ── Confetti animation ──
  const runConfetti = useCallback(() => {
    const canvas = confettiRef.current
    if (!canvas) return
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    particlesRef.current = createConfetti(120)

    const ctx = canvas.getContext("2d")!
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particlesRef.current = particlesRef.current
        .map(p => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          vy: p.vy + 0.08,
          rotation: p.rotation + p.rotationV,
          alpha: p.y > canvas.height * 0.8 ? Math.max(0, p.alpha - 0.02) : p.alpha,
        }))
        .filter(p => p.alpha > 0 && p.y < canvas.height + 20)

      particlesRef.current.forEach(p => {
        ctx.save()
        ctx.globalAlpha = p.alpha
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotation * Math.PI) / 180)
        ctx.fillStyle = p.color
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.5)
        ctx.restore()
      })

      if (particlesRef.current.length > 0) {
        confettiRafRef.current = requestAnimationFrame(animate)
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
    }
    animate()
  }, [])

  // ── Spin logic ──
  const spin = useCallback(() => {
    if (spinning || spinsLeft <= 0) return

    setShowResult(false)
    setResult(null)
    setSpinsLeft(s => s - 1)
    setSpinning(true)

    const startRotation = rotationRef.current
    const extra = 2160 + Math.random() * 720 // 6-8 full rotations
    const targetRotation = startRotation + extra

    // Determine winning segment
    const normalised = ((targetRotation % 360) + 360) % 360
    // Pointer is at top (270°). Segment index at that angle:
    const pointerAngle = (270 - normalised + 3600) % 360
    const winIndex = Math.floor(pointerAngle / SEGMENT_ANGLE) % TOTAL
    const winSeg = SEGMENTS[winIndex]

    const duration = 5000
    const start = performance.now()

    const animate = (now: number) => {
      const elapsed = now - start
      const t = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const ease = 1 - Math.pow(1 - t, 3)
      const current = startRotation + (targetRotation - startRotation) * ease

      rotationRef.current = current
      setRotation(current)

      if (t < 1) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        rotationRef.current = targetRotation
        setRotation(targetRotation)
        setSpinning(false)
        setResult(winSeg)
        setShowResult(true)
        setHistory(h => [winSeg, ...h].slice(0, 6))
        if (winSeg.prize) {
          setTimeout(runConfetti, 200)
        }
        // Bonus spin if "Попытка"
        if (winSeg.label === "Попытка") {
          setSpinsLeft(s => s + 1)
        }
      }
    }

    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(animate)
  }, [spinning, spinsLeft, runConfetti])

  // cleanup
  useEffect(() => () => {
    cancelAnimationFrame(rafRef.current)
    cancelAnimationFrame(confettiRafRef.current)
  }, [])

  const reset = () => {
    setSpinsLeft(3)
    setHistory([])
    setResult(null)
    setShowResult(false)
  }

  return (
    <div className="min-h-screen bg-[#03080f] flex flex-col overflow-hidden relative">
      {/* Background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-600/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-700/8 blur-[120px] rounded-full pointer-events-none" />

      {/* Confetti canvas */}
      <canvas
        ref={confettiRef}
        className="fixed inset-0 pointer-events-none z-50"
        style={{ opacity: 1 }}
      />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-4 md:px-8 py-4 border-b border-blue-900/20">
        <Link
          to="/"
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
          Назад
        </Link>
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-blue-400" />
          <span className="font-bold text-white text-lg">Spin &amp; Win</span>
        </div>
        <div className="flex items-center gap-1.5 bg-blue-950/40 border border-blue-800/30 rounded-full px-3 py-1">
          <Gift className="h-3.5 w-3.5 text-blue-400" />
          <span className="text-sm font-semibold text-blue-200">{spinsLeft} спинов</span>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex flex-col items-center px-4 py-6 gap-6">

        {/* Title */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-1 tracking-tight">
            Крути и выигрывай!
          </h1>
          <p className="text-blue-300/60 text-sm">Испытай удачу — призы ждут тебя</p>
        </div>

        {/* Wheel area */}
        <div className="relative flex items-center justify-center">
          {/* Outer glow ring */}
          <div
            className="absolute rounded-full pointer-events-none transition-all duration-300"
            style={{
              width: "calc(100% + 24px)",
              height: "calc(100% + 24px)",
              top: "-12px", left: "-12px",
              boxShadow: spinning
                ? "0 0 60px 20px rgba(59,130,246,0.35), 0 0 120px 40px rgba(99,102,241,0.2)"
                : "0 0 30px 8px rgba(59,130,246,0.15)",
            }}
          />

          {/* Pointer triangle (top) */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]">
            <div
              style={{
                width: 0, height: 0,
                borderLeft: "12px solid transparent",
                borderRight: "12px solid transparent",
                borderTop: "22px solid #ef4444",
                filter: "drop-shadow(0 2px 4px rgba(239,68,68,0.5))",
              }}
            />
          </div>

          {/* Canvas */}
          <canvas
            ref={canvasRef}
            className="rounded-full cursor-pointer select-none"
            style={{
              filter: spinning ? "brightness(1.08)" : "brightness(1)",
              transition: "filter 0.3s",
            }}
            onClick={spin}
          />
        </div>

        {/* Spin button */}
        <button
          onClick={spin}
          disabled={spinning || spinsLeft <= 0}
          className={`
            relative px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-200
            ${spinning || spinsLeft <= 0
              ? "bg-blue-950/40 text-blue-400/40 border border-blue-900/20 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-500 active:scale-95 text-white shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 border border-blue-400/20"
            }
          `}
        >
          {spinning ? (
            <span className="flex items-center gap-2">
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Крутится…
            </span>
          ) : spinsLeft <= 0 ? (
            "Нет спинов"
          ) : (
            <span className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Крутить!
            </span>
          )}
        </button>

        {/* Result card */}
        {showResult && result && (
          <div
            className={`
              w-full max-w-sm rounded-2xl border p-5 text-center animate-in fade-in slide-in-from-bottom-4 duration-500
              ${result.prize
                ? "bg-blue-950/50 border-blue-500/40 shadow-lg shadow-blue-500/10"
                : "bg-slate-900/50 border-slate-700/40"
              }
            `}
          >
            <div className="text-4xl mb-2">{result.emoji}</div>
            {result.prize ? (
              <>
                <div className="flex items-center justify-center gap-1.5 text-blue-300 text-xs font-medium mb-1 uppercase tracking-widest">
                  <Trophy className="h-3.5 w-3.5" /> Выигрыш!
                </div>
                <p className="text-2xl font-extrabold text-white">{result.prize}</p>
                <p className="text-blue-300/50 text-sm mt-1">зачислен на ваш счёт</p>
              </>
            ) : (
              <>
                <p className="text-lg font-bold text-slate-400">Не повезло</p>
                <p className="text-slate-500 text-sm mt-1">Попробуй ещё раз!</p>
              </>
            )}
          </div>
        )}

        {/* Spin history */}
        {history.length > 0 && (
          <div className="w-full max-w-sm">
            <p className="text-xs text-blue-400/50 font-medium uppercase tracking-widest mb-2 text-center">
              История
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {history.map((h, i) => (
                <span
                  key={i}
                  className={`
                    text-xs px-3 py-1 rounded-full font-medium border
                    ${h.prize
                      ? "bg-blue-950/50 border-blue-700/40 text-blue-300"
                      : "bg-slate-900/50 border-slate-700/40 text-slate-500"
                    }
                  `}
                >
                  {h.emoji} {h.label}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Reset / refill */}
        {spinsLeft <= 0 && !spinning && (
          <button
            onClick={reset}
            className="flex items-center gap-2 text-sm text-blue-400/70 hover:text-blue-300 transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            Получить ещё спины
          </button>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-4 text-center text-xs text-blue-400/25 border-t border-blue-900/20">
        Игра носит развлекательный характер · Spin &amp; Win © 2025
      </footer>
    </div>
  )
}
