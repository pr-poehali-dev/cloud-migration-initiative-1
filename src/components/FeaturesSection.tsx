import { VoiceTransferCard } from "@/components/feature-cards/VoiceTransferCard"
import { OfflineNetworkCard } from "@/components/feature-cards/OfflineNetworkCard"
import { SecurePayCard } from "@/components/feature-cards/SecurePayCard"

export function FeaturesSection() {
  return (
    <section className="px-4 md:px-8 py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
        <VoiceTransferCard />
        <OfflineNetworkCard />
        <SecurePayCard />
      </div>
    </section>
  )
}
