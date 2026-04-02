import { ArrowUpRight, Mic, WifiOff } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center px-4 pt-12 pb-8 text-center">
      {/* Badge */}
      <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-950/60 border border-blue-800/40 py-2 text-sm px-3">
        <span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-xs font-medium text-blue-300">ОФЛАЙН</span>
        <span className="text-blue-200/70">Работает без интернета и сотовой связи</span>
        <WifiOff className="h-4 w-4 text-blue-400" />
      </div>

      {/* Heading */}
      <h1 className="mb-4 max-w-3xl text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white text-balance">
        Переводи деньги{" "}
        <span className="text-blue-400">голосом</span>
        <br />
        без связи и интернета
      </h1>

      <p className="mb-8 max-w-xl text-blue-200/60">
        Скажи сумму и получателя — и деньги дойдут. Работает через Bluetooth,
        звуковые волны и офлайн-сети даже там, где нет сигнала.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
        <Button className="rounded-full bg-blue-600 px-6 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30">
          <Mic className="mr-2 h-4 w-4" /> Начать голосовой перевод
        </Button>
        <Button variant="outline" className="rounded-full border-blue-800 bg-transparent text-blue-200 hover:bg-blue-900/40 hover:text-white">
          <ArrowUpRight className="mr-2 h-4 w-4 text-blue-400" /> Как это работает
        </Button>
      </div>

      {/* Voice Animation Widget */}
      <div className="relative w-full max-w-sm mx-auto">
        <div className="rounded-2xl bg-[#0a1628] border border-blue-800/40 p-6 shadow-2xl shadow-blue-900/30">
          {/* Top label */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-blue-400 font-medium uppercase tracking-widest">Голосовой ввод</span>
            <span className="flex items-center gap-1 text-xs text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
              Активен
            </span>
          </div>

          {/* Soundwave */}
          <div className="flex items-center justify-center gap-1 h-12 mb-4">
            {[28, 44, 56, 40, 60, 48, 32].map((h, i) => (
              <div
                key={i}
                className="soundwave-bar w-2 rounded-full bg-blue-500"
                style={{ height: `${h}px`, opacity: 0.7 + i * 0.04 }}
              />
            ))}
          </div>

          {/* Recognized text */}
          <div className="rounded-xl bg-blue-950/60 border border-blue-800/30 px-4 py-3 text-left mb-4">
            <p className="text-xs text-blue-400/60 mb-1">Распознано:</p>
            <p className="text-white text-sm font-medium">
              «Отправь <span className="text-blue-300">5 000 рублей</span> Маше Ивановой»
            </p>
          </div>

          {/* Transfer info */}
          <div className="flex items-center justify-between rounded-xl bg-blue-900/20 border border-blue-800/20 px-4 py-3">
            <div className="text-left">
              <p className="text-xs text-blue-400/60">Получатель</p>
              <p className="text-sm text-white font-medium">Маша Иванова</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-blue-400/60">Сумма</p>
              <p className="text-sm text-blue-300 font-bold">5 000 ₽</p>
            </div>
          </div>

          {/* Offline badge */}
          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-blue-400/50">
            <WifiOff className="h-3 w-3" />
            <span>Передача через Bluetooth · офлайн-режим</span>
          </div>
        </div>

        {/* Glow effect */}
        <div className="absolute -inset-2 rounded-3xl bg-blue-600/10 blur-xl -z-10" />
      </div>
    </section>
  )
}
