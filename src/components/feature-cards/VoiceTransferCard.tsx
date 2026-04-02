import { Mic, ArrowUpRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const steps = [
  { label: "Скажи получателя", done: true },
  { label: "Назови сумму", done: true },
  { label: "Подтверди голосом", done: false },
]

export function VoiceTransferCard() {
  return (
    <div className="rounded-2xl bg-[#060e1c] border border-blue-900/40 p-6 flex flex-col">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-900/30 border border-blue-800/40">
        <Mic className="h-5 w-5 text-blue-400" />
      </div>

      <h3 className="mb-2 text-lg font-semibold text-white">Голосовой перевод</h3>
      <p className="mb-4 text-sm text-blue-200/50">Скажи вслух кому и сколько — система всё поймёт и выполнит перевод</p>

      <a href="#" className="mb-6 inline-flex items-center text-sm text-blue-400/70 hover:text-blue-300 transition-colors">
        Подробнее <ArrowUpRight className="ml-1 h-4 w-4" />
      </a>

      <div className="mt-auto rounded-xl bg-blue-950/40 border border-blue-900/30 p-4 space-y-3">
        {/* Active mic + wave */}
        <div className="flex items-center gap-3 rounded-lg bg-blue-900/20 border border-blue-800/20 px-3 py-2.5">
          <div className="relative flex items-center justify-center h-9 w-9 rounded-full bg-blue-600/20 border border-blue-500/30">
            <Mic className="h-4 w-4 text-blue-400" />
            <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-[#060e1c]" />
          </div>
          <div className="flex items-center gap-0.5">
            {[12, 20, 28, 18, 24, 14, 22].map((h, i) => (
              <div
                key={i}
                className="soundwave-bar w-1.5 rounded-full bg-blue-500"
                style={{ height: `${h}px` }}
              />
            ))}
          </div>
          <span className="ml-auto text-xs text-blue-400/60">0:03</span>
        </div>

        {/* Steps */}
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-3 px-1">
            <CheckCircle2
              className={`h-4 w-4 flex-shrink-0 ${step.done ? "text-emerald-400" : "text-blue-800"}`}
            />
            <span className={`text-sm ${step.done ? "text-blue-200/80" : "text-blue-400/40"}`}>
              {step.label}
            </span>
          </div>
        ))}

        <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white mt-2 rounded-lg">
          Отправить перевод
        </Button>
      </div>
    </div>
  )
}
