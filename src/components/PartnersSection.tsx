import { Radio, Bluetooth, Cpu, Globe, Satellite, ShieldCheck, Smartphone } from "lucide-react"

const partners = [
  { name: "МегаФон", icon: Radio },
  { name: "Bluetooth SIG", icon: Bluetooth },
  { name: "Сбербанк", icon: Cpu },
  { name: "ВТБ", icon: Globe },
  { name: "Роскосмос", icon: Satellite },
  { name: "ФСБ Сертификат", icon: ShieldCheck },
  { name: "Huawei", icon: Smartphone },
]

export function PartnersSection() {
  return (
    <section className="flex flex-wrap items-center justify-center gap-6 md:gap-10 px-4 py-10">
      {partners.map((partner) => (
        <div key={partner.name} className="flex items-center gap-2 text-blue-400/40 hover:text-blue-300/70 transition-colors">
          <partner.icon className="h-4 w-4" />
          <span className="text-sm font-medium">{partner.name}</span>
        </div>
      ))}
    </section>
  )
}
