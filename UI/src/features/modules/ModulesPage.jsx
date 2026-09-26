import { modules } from "../../services/catalog.js";
import ModuleGridItem from "./components/ModuleGridItem.jsx";
import PageHeader from "../../ui/PageHeader.jsx";

export default function ModulesPage() {
  return (
    <div>
      <PageHeader
        eyebrow="The whole course"
        title="Modules"
        description="Five weeks of class material, in the order we covered them. Open a week to see its lessons, quizzes and practice links."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {modules.map((module) => (
          <ModuleGridItem key={module.id} module={module} />
        ))}
      </div>
    </div>
  );
}
