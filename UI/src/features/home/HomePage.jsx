import { Link } from "react-router-dom";
import { modules } from "../../services/catalog.js";
import { moduleStats } from "../../services/progress.js";
import { useVault } from "../../app/providers/VaultProvider.jsx";
import ModuleCard from "../../ui/ModuleCard.jsx";
import SectionHeading from "../../ui/SectionHeading.jsx";
import Hero from "./components/Hero.jsx";
import ContinueCard from "./components/ContinueCard.jsx";
import QuickLinks from "./components/QuickLinks.jsx";

export default function HomePage() {
  const { state } = useVault();
  const overall = modules.map((module) => ({
    module,
    stats: moduleStats(module, state),
  }));

  return (
    <div className="space-y-8">
      <Hero />
      <ContinueCard />
      <QuickLinks />

      <section>
        <SectionHeading
          icon="book"
          eyebrow="The five weeks"
          action={
            <Link
              to="/modules"
              className="text-[13.5px] font-bold text-primary hover:underline"
            >
              All modules
            </Link>
          }
        >
          Course modules
        </SectionHeading>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {overall.map(({ module, stats }) => (
            <ModuleCard key={module.id} module={module} stats={stats} />
          ))}
        </div>
      </section>
    </div>
  );
}
