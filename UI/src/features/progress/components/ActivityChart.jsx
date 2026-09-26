import { todayKey } from "../../../lib/format.js";
import SectionHeading from "../../../ui/SectionHeading.jsx";

const DAYS = 14;

function lastDays() {
  const out = [];
  for (let i = DAYS - 1; i >= 0; i -= 1) {
    out.push(todayKey(new Date(Date.now() - i * 86400000)));
  }
  return out;
}

export default function ActivityChart({ activity }) {
  const byDate = new Map(activity.map((day) => [day.date, day.events]));
  const days = lastDays();
  const max = Math.max(1, ...days.map((date) => byDate.get(date) || 0));
  const total = activity.reduce((sum, day) => sum + day.events, 0);
  const activeDays = days.filter((date) => byDate.get(date)).length;

  return (
    <section className="card glass p-4 sm:p-5">
      <SectionHeading
        icon="grid"
        action={
          <span className="font-mono text-[11px] text-water/55 tabular-nums">
            {total} events, {activeDays} of {DAYS} days
          </span>
        }
      >
        Last 14 days
      </SectionHeading>
      {total === 0 ? (
        <p className="text-[13.5px] text-water/60 border-2 border-dashed border-base-300 rounded-inner px-4 py-8 text-center bg-white/50">
          No activity yet. Finish a lesson or play a video and your week shows up here.
        </p>
      ) : (
        <>
          <div className="flex items-end gap-2 h-28">
            {days.map((date) => {
              const value = byDate.get(date) || 0;
              const height = value ? Math.max(10, (value / max) * 100) : 5;
              return (
                <div key={date} className="flex-1 flex items-end justify-center h-full">
                  <div
                    className={`w-full max-w-[24px] rounded-t-tile transition-all ${
                      value ? "text-white" : "bg-base-300"
                    }`}
                    style={{
                      height: `${height}%`,
                      ...(value
                        ? {
                            backgroundImage:
                              "linear-gradient(180deg, #7fd4f5 0%, #0f8ec9 100%)",
                            boxShadow: "0 6px 14px -8px rgba(15,142,201,0.95)",
                          }
                        : {}),
                    }}
                    title={`${date}: ${value} events`}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex justify-between font-mono text-[10px] uppercase tracking-[0.12em] text-water/45 mt-2.5">
            <span>{days[0].slice(5)}</span>
            <span>Today</span>
          </div>
        </>
      )}
    </section>
  );
}
