import { useEffect, useRef, useState } from "react";
import { embedUrl, loadIframeApi, thumbnailUrl } from "../lib/youtube.js";
import Icon from "./Icon.jsx";

export default function VideoPlayer({ videoId, title, onPlayer, className = "" }) {
  const mountRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!playing || failed) return undefined;
    let cancelled = false;

    loadIframeApi()
      .then((YT) => {
        if (cancelled || !mountRef.current) return;
        const player = new YT.Player(mountRef.current, {
          videoId,
          playerVars: { rel: 0 },
          events: {
            onReady: () => onPlayer?.(player),
          },
        });
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, [playing, failed, videoId, onPlayer]);

  if (failed) {
    return (
      <div className={`relative aspect-video ${className}`}>
        <iframe
          src={embedUrl(videoId)}
          title={title}
          className="absolute inset-0 size-full rounded-inner border border-base-300"
          allow="accelerometer; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  if (playing) {
    return (
      <div className={`relative aspect-video ${className}`}>
        <div
          ref={mountRef}
          className="absolute inset-0 overflow-hidden rounded-inner [&_iframe]:size-full"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className={`group relative aspect-video w-full overflow-hidden rounded-inner border-2 border-white ${className}`}
      style={{
        backgroundImage: "linear-gradient(160deg, #1aa7e0 0%, #0a6ea8 100%)",
        boxShadow: "0 14px 30px -14px rgba(10,74,107,0.85)",
      }}
      aria-label={`Play ${title}`}
    >
      <img
        src={thumbnailUrl(videoId)}
        alt=""
        className="absolute inset-0 size-full object-cover opacity-90 group-hover:opacity-80 transition-opacity"
        loading="lazy"
      />
      <span className="absolute inset-0 grid place-items-center">
        <span
          className="grid place-items-center size-16 sphere border-2 border-white text-white transition-transform duration-200 group-hover:scale-110"
          style={{
            backgroundImage: "linear-gradient(160deg, #7fd4f5 0%, #0f8ec9 100%)",
            boxShadow: "0 10px 24px -8px rgba(10,74,107,0.95)",
          }}
        >
          <Icon name="play" size={26} className="ml-1" />
        </span>
      </span>
    </button>
  );
}
