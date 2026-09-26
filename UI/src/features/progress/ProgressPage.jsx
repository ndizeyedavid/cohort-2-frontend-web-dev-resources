import { levelFor } from "../../services/gamification.js";
import { currentStreak, moduleStats } from "../../services/progress.js";
import { modules } from "../../services/catalog.js";
import { useVault } from "../../app/providers/VaultProvider.jsx";
import PageHeader from "../../ui/PageHeader.jsx";
import ProgressBar from "../../ui/ProgressBar.jsx";
import StatTile from "../../ui/StatTile.jsx";
import LevelCard from "./components/LevelCard.jsx";
import ActivityChart from "./components/ActivityChart.jsx";
import ModuleProgressList from "./components/ModuleProgressList.jsx";
import QuizScoreList from "./components/QuizScoreList.jsx";
import BadgeGrid from "./components/BadgeGrid.jsx";

export default function ProgressPage() {
  const { state } = useVault();
  const level = levelFor(state.gamification.xp);
  const streak = currentStreak(state.activity);

  const totals = modules.reduce(
    (acc, module) => {
      const stats = moduleStats(module, state);
      return { done: acc.done + stats.done, total: acc.total + stats.total };
    },
    { done: 0, total: 0 },
  );
  const overall = totals.total ? Math.round((totals.done / totals.total) * 100) : 0;

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Your record"
        title="Progress"
        description="Everything on this page is stored in this browser only. Clearing browser data clears it too."
      />

      <div className="grid sm:grid-cols-3 gap-4">
        <LevelCard level={level} xp={state.gamification.xp} />
        <StatTile
          label="Streak"
          value={streak}
          tone="accent"
          sub={streak === 1 ? "Day with activity in a row" : "Days with activity in a row"}
        />
        <StatTile
          label="Overall"
          value={`${overall}%`}
          sub={`${totals.done} of ${totals.total} items`}
        >
          <ProgressBar value={overall} size="sm" className="mt-3" />
        </StatTile>
      </div>

      <ActivityChart activity={state.activity} />

      <div className="grid lg:grid-cols-2 gap-8">
        <ModuleProgressList state={state} />
        <QuizScoreList state={state} />
      </div>

      <BadgeGrid owned={state.gamification.badges} />
    </div>
  );
}
