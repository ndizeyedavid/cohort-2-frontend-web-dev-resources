import ModuleCard from "../../../ui/ModuleCard.jsx";
import { useModuleStats } from "../../../app/hooks/useModuleStats.js";

export default function ModuleGridItem({ module }) {
  const stats = useModuleStats(module);
  return <ModuleCard module={module} stats={stats} />;
}
