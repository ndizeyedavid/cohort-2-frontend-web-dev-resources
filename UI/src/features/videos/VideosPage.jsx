import { useState } from "react";
import { modules, videos } from "../../services/catalog.js";
import PageHeader from "../../ui/PageHeader.jsx";
import EmptyState from "../../ui/EmptyState.jsx";
import VideoCard from "./components/VideoCard.jsx";

function FilterChip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`btn btn-sm rounded-pill font-bold ${
        active ? "" : "btn-ghost text-water/70 hover:bg-white/70"
      }`}
      style={
        active
          ? {
              backgroundImage: "linear-gradient(160deg, #57c9e8 0%, #0f8ec9 100%)",
              border: "none",
              color: "#fff",
              boxShadow: "0 8px 18px -9px rgba(15,142,201,1)",
            }
          : undefined
      }
    >
      {children}
    </button>
  );
}

export default function VideosPage() {
  const [filter, setFilter] = useState("all");
  const list =
    filter === "all" ? videos : videos.filter((video) => video.moduleId === filter);
  const activeModules = new Set(videos.map((video) => video.moduleId));

  return (
    <div>
      <PageHeader
        eyebrow="Watch and learn"
        title="Videos"
        description="Class video picks, watched right here. Watching 80 percent of a video marks it done."
      />

      {videos.length ? (
        <>
          <div className="flex flex-wrap gap-2 mb-6">
            <FilterChip active={filter === "all"} onClick={() => setFilter("all")}>
              All weeks
            </FilterChip>
            {modules
              .filter((module) => activeModules.has(module.id))
              .map((module) => (
                <FilterChip
                  key={module.id}
                  active={filter === module.id}
                  onClick={() => setFilter(module.id)}
                >
                  Week {String(module.week).padStart(2, "0")}
                </FilterChip>
              ))}
          </div>

          {list.length ? (
            <div className="grid md:grid-cols-2 gap-4">
              {list.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon="play"
              title="Nothing in this week yet"
              description="Pick another week above."
            />
          )}
        </>
      ) : (
        <EmptyState
          icon="play"
          title="Videos are on the way"
          description="Once the class video list is added, they will appear here grouped by week."
        />
      )}
    </div>
  );
}
