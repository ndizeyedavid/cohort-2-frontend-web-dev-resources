import Icon from "./Icon.jsx";

export default function SectionHeading({ icon, action, eyebrow, children }) {
  return (
    <div className="flex items-end justify-between gap-3 mb-4">
      <div>
        {eyebrow ? <p className="eyebrow mb-1">{eyebrow}</p> : null}
        <h2 className="font-display text-[20px] font-bold flex items-center gap-2 text-water">
          {icon ? (
            <span className="grid place-items-center size-7 sphere bg-aqua-soft text-aqua">
              <Icon name={icon} size={15} />
            </span>
          ) : null}
          {children}
        </h2>
      </div>
      {action}
    </div>
  );
}
