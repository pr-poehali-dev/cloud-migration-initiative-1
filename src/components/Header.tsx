import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-4">
      <div className="flex items-center gap-2">
        <VoicePayLogo />
        <span className="text-lg font-semibold text-white">
          ГолосПей<sup className="text-xs">™</sup>
        </span>
      </div>

      <nav className="hidden md:flex items-center gap-8">
        <a href="#" className="text-sm text-blue-200/70 hover:text-white transition-colors">
          Как это работает
        </a>
        <a href="#" className="text-sm text-blue-200/70 hover:text-white transition-colors flex items-center gap-1">
          Возможности <ChevronDown className="h-4 w-4" />
        </a>
        <a href="#" className="text-sm text-blue-200/70 hover:text-white transition-colors">
          Безопасность
        </a>
        <a href="#" className="text-sm text-blue-200/70 hover:text-white transition-colors">
          Тарифы
        </a>
        <a href="#" className="text-sm text-blue-200/70 hover:text-white transition-colors">
          Поддержка
        </a>
      </nav>

      <Button
        variant="outline"
        className="rounded-full border-blue-500 text-blue-400 hover:bg-blue-500/10 hover:text-blue-300 bg-transparent"
      >
        Попробовать бесплатно
      </Button>
    </header>
  )
}

function VoicePayLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Mic shape */}
      <rect x="10" y="3" width="8" height="13" rx="4" fill="#3B82F6" />
      {/* Mic arc */}
      <path d="M6 14a8 8 0 0 0 16 0" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Mic stand */}
      <line x1="14" y1="22" x2="14" y2="26" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" />
      <line x1="10" y1="26" x2="18" y2="26" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" />
      {/* Sound waves */}
      <path d="M21 10 Q24 14 21 18" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.7" />
      <path d="M7 10 Q4 14 7 18" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.7" />
    </svg>
  )
}
