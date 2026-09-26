import SectionHeading from "../../../ui/SectionHeading.jsx";
import ItemCard from "../../../ui/ItemCard.jsx";
import BadgeChip from "../../../ui/BadgeChip.jsx";
import Button from "../../../ui/Button.jsx";
import EmptyState from "../../../ui/EmptyState.jsx";
import Icon from "../../../ui/Icon.jsx";
import { useVault } from "../../../app/providers/VaultProvider.jsx";
import { getLink, relatedTo } from "../../../services/catalog.js";
import { itemState, keys } from "../../../services/progress.js";
import { XP_REWARDS } from "../../../services/gamification.js";
import { formatDate } from "../../../lib/format.js";

function LinkRow({ link }) {
  const { state, completeItem, revertItem, openItem } = useVault();
  const key = keys.link(link.id);
  const status = itemState(state, key);
  const done = status === "completed";

  return (
    <ItemCard
      icon="link"
      done={done}
      title={
        <a
          href={link.url}
          target="_blank"
          rel="noreferrer"
          className="hover:text-primary"
          onClick={() => openItem(key)}
        >
          {link.title}
        </a>
      }
      description={link.description}
      meta={`${link.kind} · verified ${formatDate(link.verifiedOn)}`}
      badge={done ? null : status === "opened" ? <BadgeChip tone="accent">Opened</BadgeChip> : null}
      action={
        <Button
          size="sm"
          variant={done ? "ghost" : "secondary"}
          onClick={() => (done ? revertItem(key) : completeItem(key, XP_REWARDS.link))}
        >
          {done ? (
            <>
              <Icon name="undo" size={15} />
              Undo
            </>
          ) : (
            "Mark done"
          )}
        </Button>
      }
    />
  );
}

export default function ModuleResources({ moduleId }) {
  const links = relatedTo(moduleId).linkIds.map(getLink).filter(Boolean);

  if (!links.length) {
    return (
      <section>
        <SectionHeading icon="link">Practice links</SectionHeading>
        <EmptyState
          icon="link"
          title="No links yet"
          description="Trusted external resources for this module will show up here."
        />
      </section>
    );
  }

  return (
    <section>
      <SectionHeading icon="link" eyebrow={`${links.length} trusted links`}>
        Practice links
      </SectionHeading>
      <div className="space-y-3">
        {links.map((link) => (
          <LinkRow key={link.id} link={link} />
        ))}
      </div>
      <p className="flex items-start gap-2 text-[12.5px] text-water/55 mt-3.5">
        <Icon name="link" size={15} className="mt-0.5 shrink-0" />
        Links open in a new tab, so we cannot see if you finished them. Mark them done
        yourself.
      </p>
    </section>
  );
}
