import { Header } from "@/components/Header"
import { HeroSection } from "@/components/HeroSection"
import { PartnersSection } from "@/components/PartnersSection"
import { FeaturesSection } from "@/components/FeaturesSection"
import { Mic, WifiOff, ShieldCheck } from "lucide-react"

export default function Index() {
  return (
    <main className="min-h-screen bg-[#03080f]">
      {/* Subtle blue top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <Header />
      <HeroSection />
      <PartnersSection />

      {/* Stats row */}
      <section className="px-4 md:px-8 py-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: Mic, value: "98%", label: "Точность распознавания голоса" },
            { icon: WifiOff, value: "100 м", label: "Дальность офлайн-передачи" },
            { icon: ShieldCheck, value: "AES-256", label: "Шифрование каждой транзакции" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-2 rounded-2xl bg-blue-950/20 border border-blue-900/30 px-6 py-5 text-center"
            >
              <stat.icon className="h-5 w-5 text-blue-400" />
              <span className="text-2xl font-bold text-white">{stat.value}</span>
              <span className="text-sm text-blue-300/50">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <FeaturesSection />

      <footer className="py-8 text-center text-sm text-blue-400/40 border-t border-blue-900/20">
        От голосового ввода до офлайн-передачи —{" "}
        <span className="font-medium text-blue-300/60">деньги дойдут даже без связи.</span>
      </footer>
    </main>
  )
}
