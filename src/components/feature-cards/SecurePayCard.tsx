import { ShieldCheck, ArrowUpRight, Lock, Eye, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SecurePayCard() {
  return (
    <div className="rounded-2xl bg-[#060e1c] border border-blue-900/40 p-6 flex flex-col">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-900/30 border border-blue-800/40">
        <ShieldCheck className="h-5 w-5 text-blue-400" />
      </div>

      <h3 className="mb-2 text-lg font-semibold text-white">Защита и шифрование</h3>
      <p className="mb-4 text-sm text-blue-200/50">Голосовая биометрия + шифрование AES-256 защищают каждую транзакцию</p>

      <a href="#" className="mb-6 inline-flex items-center text-sm text-blue-400/70 hover:text-blue-300 transition-colors">
        Подробнее <ArrowUpRight className="ml-1 h-4 w-4" />
      </a>

      <div className="mt-auto space-y-4 rounded-xl bg-blue-950/40 border border-blue-900/30 p-4">
        {/* Voice biometrics */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-900/40 border border-blue-800/30">
              <Eye className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Голосовая биометрия</p>
              <p className="text-xs text-blue-400/50">Распознавание голоса</p>
            </div>
          </div>
          <span className="text-sm text-emerald-400">Включена</span>
        </div>

        {/* Encrypt method */}
        <div>
          <label className="mb-2 flex items-center gap-1 text-xs text-blue-400/60">
            Метод шифрования <Lock className="h-3 w-3" />
          </label>
          <div className="flex items-center justify-between rounded-lg bg-blue-900/20 border border-blue-800/30 px-3 py-2.5">
            <span className="text-sm text-white">AES-256 · End-to-End</span>
            <ChevronDown className="h-4 w-4 text-blue-600" />
          </div>
          <p className="mt-1 text-xs text-blue-400/40">Военный уровень защиты данных.</p>
        </div>

        {/* Divider */}
        <div className="border-t border-dashed border-blue-900/50 pt-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-900/40 border border-blue-800/30">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Транзакция верифицирована</p>
              <p className="text-xs text-blue-400/50">Хэш: ••a8f2 · 0.3 сек</p>
            </div>
          </div>
        </div>

        <Button className="w-full bg-blue-800/50 text-blue-200 hover:bg-blue-700/50 hover:text-white border border-blue-700/30">
          Проверить безопасность
        </Button>
      </div>
    </div>
  )
}
