import { Bluetooth, ArrowUpRight, WifiOff, Radio } from "lucide-react"

const channels = [
  {
    name: "Bluetooth",
    desc: "До 100 м без интернета",
    icon: Bluetooth,
    active: true,
  },
  {
    name: "Звуковой канал",
    desc: "Через аудио-сигнал",
    icon: Radio,
    active: true,
  },
  {
    name: "Wi-Fi Direct",
    desc: "Устройство–устройство",
    icon: WifiOff,
    active: false,
  },
]

export function OfflineNetworkCard() {
  return (
    <div className="rounded-2xl bg-[#060e1c] border border-blue-900/40 p-6 flex flex-col">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-900/30 border border-blue-800/40">
        <WifiOff className="h-5 w-5 text-blue-400" />
      </div>

      <h3 className="mb-2 text-lg font-semibold text-white">Работа без интернета</h3>
      <p className="mb-4 text-sm text-blue-200/50">Передаёт транзакции через Bluetooth, звуковые волны и Wi-Fi Direct — без сотовой сети</p>

      <a href="#" className="mb-6 inline-flex items-center text-sm text-blue-400/70 hover:text-blue-300 transition-colors">
        Подробнее <ArrowUpRight className="ml-1 h-4 w-4" />
      </a>

      <div className="mt-auto rounded-xl bg-blue-950/40 border border-blue-900/30 p-4 space-y-3">
        {channels.map((ch) => (
          <div key={ch.name} className="flex items-center justify-between rounded-lg bg-blue-900/20 border border-blue-800/20 px-3 py-2.5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-900/40 border border-blue-800/30">
                <ch.icon className="h-4 w-4 text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">{ch.name}</p>
                <p className="text-xs text-blue-400/50">{ch.desc}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span
                className={`h-2 w-2 rounded-full ${ch.active ? "bg-emerald-400 animate-pulse" : "bg-blue-800"}`}
              />
              <span className={`text-xs ${ch.active ? "text-emerald-400" : "text-blue-600"}`}>
                {ch.active ? "Активен" : "Ожидание"}
              </span>
            </div>
          </div>
        ))}

        {/* Range indicator */}
        <div className="flex items-center justify-between px-1 pt-1">
          <span className="text-xs text-blue-400/50">Дальность передачи</span>
          <div className="flex items-center gap-1">
            {[1,2,3,4,5].map(i => (
              <div
                key={i}
                className={`h-3 w-1.5 rounded-sm ${i <= 4 ? "bg-blue-500" : "bg-blue-900"}`}
              />
            ))}
            <span className="ml-1 text-xs text-blue-300">~80 м</span>
          </div>
        </div>
      </div>
    </div>
  )
}
