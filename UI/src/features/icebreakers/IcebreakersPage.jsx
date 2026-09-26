import { useState } from "react";
import { icebreakers } from "../../services/catalog.js";
import PageHeader from "../../ui/PageHeader.jsx";
import EmptyState from "../../ui/EmptyState.jsx";
import BadgeChip from "../../ui/BadgeChip.jsx";
import Modal from "../../ui/Modal.jsx";
import Icon from "../../ui/Icon.jsx";
import { formatDate } from "../../lib/format.js";

export default function IcebreakersPage() {
  const [selected, setSelected] = useState(null);

  return (
    <div>
      <PageHeader
        eyebrow="Class warm ups"
        title="Icebreakers"
        description="Warm up decks from class sessions. Pick one and play it full screen."
      />

      {icebreakers.length ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {icebreakers.map((deck) => (
            <button
              key={deck.id}
              type="button"
              onClick={() => setSelected(deck)}
              className="card glass glass-hover text-left overflow-hidden"
            >
              <div className="h-1.5 bg-gradient-to-r from-aqua to-primary" />
              <div className="p-5">
                <div className="flex items-center justify-between gap-2">
                  <BadgeChip tone="accent">{deck.tag}</BadgeChip>
                  {deck.classDate ? (
                    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-water/50">
                      {formatDate(deck.classDate)}
                    </span>
                  ) : null}
                </div>
                <h2 className="font-display font-bold text-[17px] mt-3.5 leading-snug text-water group-hover:text-primary">
                  {deck.title}
                </h2>
                <p className="lift text-[13.5px] font-bold text-primary mt-3.5">
                  Open deck
                  <Icon name="arrowRight" size={16} />
                </p>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <EmptyState
          icon="users"
          title="No decks yet"
          description="The class Canva icebreaker decks will show up here. Each deck needs an embed link in data/icebreakers.json."
        />
      )}

      <Modal
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        title={selected?.title || "Icebreaker"}
      >
        {selected ? (
          <>
            <div className="aspect-video w-full">
              <iframe
                src={selected.canvaEmbedUrl}
                title={selected.title}
                className="size-full rounded-inner border border-base-300"
                allowFullScreen
              />
            </div>
            <p className="text-[12.5px] text-water/60 mt-3.5">
              If the deck does not load here, open it directly in Canva.
            </p>
          </>
        ) : null}
      </Modal>
    </div>
  );
}
