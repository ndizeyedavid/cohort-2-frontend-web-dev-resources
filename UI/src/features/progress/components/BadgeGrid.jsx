import { ALL_BADGES } from "../../../services/badges.js";
import SectionHeading from "../../../ui/SectionHeading.jsx";
import Icon from "../../../ui/Icon.jsx";

function ruleText(rule) {
  if (rule.type === "lessonsCompleted") return `Finish ${rule.target} lessons`;
  if (rule.type === "quizzesPassed") return `Score 70%+ on ${rule.target} quizzes`;
  if (rule.type === "streakDays") return `Keep a ${rule.target} day streak`;
  if (rule.type === "moduleCompleted") return `Finish every item in ${rule.target}`;
  return "Special achievement";
}

export default function BadgeGrid({ owned }) {
  const ownedSet = new Set(owned);

  return (
    <section>
      <SectionHeading
        icon="trophy"
        eyebrow="Achievements"
        action={
          <span className="font-mono text-[11px] text-water/55 tabular-nums">
            {ownedSet.size}/{ALL_BADGES.length} earned
          </span>
        }
      >
        Badges
      </SectionHeading>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {ALL_BADGES.map((badge) => {
          const earned = ownedSet.has(badge.id);
          return (
            <div
              key={badge.id}
              className={`card flex-row items-start gap-3.5 p-4 ${
                earned ? "border-sun/60" : "glass"
              }`}
              style={
                earned
                  ? {
                      backgroundImage: "linear-gradient(160deg, #fffaf0 0%, #fff3d1 100%)",
                      boxShadow:
                        "inset 0 1px 0 rgba(255,255,255,0.95), 0 10px 24px -14px rgba(255,196,46,0.9)",
                    }
                  : undefined
              }
            >
              <span
                className={`grid place-items-center size-11 sphere border-2 border-white text-[17px] shrink-0 ${
                  earned ? "" : "text-water/35"
                }`}
                style={{
                  backgroundImage: earned
                    ? "linear-gradient(160deg, #ffe9a8 0%, #ffc42e 100%)"
                    : "linear-gradient(160deg, #eef4f8 0%, #d5e2ec 100%)",
                  boxShadow: earned
                    ? "0 8px 18px -8px rgba(255,196,46,0.95)"
                    : "0 6px 14px -10px rgba(10,74,107,0.6)",
                }}
                aria-hidden="true"
              >
                {earned ? badge.icon : <Icon name="lock" size={16} />}
              </span>
              <div className="min-w-0">
                <p
                  className={`font-display font-bold text-sm ${
                    earned ? "text-[#8a5a08]" : "text-water/50"
                  }`}
                >
                  {badge.name}
                </p>
                <p className="text-xs text-water/60 mt-0.5 leading-relaxed">
                  {badge.description}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-water/40 mt-2">
                  {ruleText(badge.rule)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
