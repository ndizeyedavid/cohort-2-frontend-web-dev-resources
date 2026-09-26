import VideoPlayer from "../../../ui/VideoPlayer.jsx";
import BadgeChip from "../../../ui/BadgeChip.jsx";
import Icon from "../../../ui/Icon.jsx";
import { useVideoTracker } from "../../../app/hooks/useVideoTracker.js";
import { getModule } from "../../../services/catalog.js";

export default function VideoCard({ video }) {
  const { completed, onPlayer } = useVideoTracker(video.id);
  const module = getModule(video.moduleId);

  return (
    <div className="card glass flex flex-col p-4">
      <div className="flex items-start justify-between gap-3 mb-3.5">
        <div className="min-w-0">
          <h2 className="font-display font-bold text-[15px] leading-snug text-water">
            {video.title}
          </h2>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-water/50 mt-1.5">
            {module ? `Week ${String(module.week).padStart(2, "0")}` : ""}
            {video.duration ? ` · ${video.duration}` : ""}
          </p>
        </div>
        {completed ? (
          <BadgeChip tone="success" className="gap-1 shrink-0">
            <Icon name="check" size={12} strokeWidth={2.6} />
            Watched
          </BadgeChip>
        ) : null}
      </div>
      <VideoPlayer videoId={video.youtubeId} title={video.title} onPlayer={onPlayer} />
      <p className="text-[12.5px] text-water/60 mt-3.5">
        {completed
          ? "Marked done automatically. Well watched."
          : "Play it, and 80 percent watched marks it done automatically."}
      </p>
    </div>
  );
}
