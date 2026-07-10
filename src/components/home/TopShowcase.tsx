import { CapabilitySection } from "./CapabilitySection";
import { GatewaySection } from "./GatewaySection";
import { HeroShowcase } from "./HeroShowcase";

export function TopShowcase() {
  return (
    <div className="relative z-10">
      <HeroShowcase />
      <GatewaySection />
      <CapabilitySection />
    </div>
  );
}
