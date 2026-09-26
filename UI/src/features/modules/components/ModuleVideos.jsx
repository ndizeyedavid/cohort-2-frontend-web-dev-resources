import VideoPlayer from "../../../ui/VideoPlayer.jsx";
import BadgeChip from "../../../ui/BadgeChip.jsx";
import SectionHeading from "../../../ui/SectionHeading.jsx";
import EmptyState from "../../../ui/EmptyState.jsx";
import Icon from "../../../ui/Icon.jsx";
import { useVideoTracker } from "../../../app/hooks/useVideoTracker.js";
import { getVideo, relatedTo } from "../../../services/catalog.js";

function VideoRow({ video }) {
  const { completed, onPlayer } = useVideoTracker(video.id);

  return (
    <div className="card glass p-4">
      <div className="flex items-start justify-between gap-3 mb-3.5">
        <div className="min-w-0">
          <h3 className="font-display font-bold text-[15px] text-water truncate">
            {video.title}
          </h3>
          {video.duration ? (
            <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-water/50 mt-1.5">
              {video.duration}
            </p>
          ) : null}
        </div>
        {completed ? (
          <BadgeChip tone="success" className="gap-1 shrink-0">
            <Icon name="check" size={12} strokeWidth={2.6} />
            Watched
          </BadgeChip>
        ) : null}
      </div>
      <VideoPlayer videoId={video.youtubeId} title={video.title} onPlayer={onPlayer} />
    </div>
  );
}

export default function ModuleVideos({ moduleId }) {
  const videos = relatedTo(moduleId).videoIds.map(getVideo).filter(Boolean);

  if (!videos.length) {
    return (
      <section>
        <SectionHeading icon="play">Videos</SectionHeading>
        <EmptyState
          icon="play"
          title="No videos here yet"
          description="Videos for this module will appear once they are added."
        />
      </section>
    );
  }

  return (
    <section>
      <SectionHeading icon="play" eyebrow={`${videos.length} videos`}>
        Videos
      </SectionHeading>
      <div className="grid md:grid-cols-2 gap-4">
        {videos.map((video) => (
          <VideoRow key={video.id} video={video} />
        ))}
      </div>
    </section>
  );
}
