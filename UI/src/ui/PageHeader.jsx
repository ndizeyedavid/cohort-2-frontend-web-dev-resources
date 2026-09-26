export default function PageHeader({ eyebrow, title, description, action }) {
  return (
    <header className="mb-7 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
      <div className="max-w-2xl">
        {eyebrow ? <p className="eyebrow mb-1.5">{eyebrow}</p> : null}
        <h1 className="font-display text-[28px] sm:text-[34px] font-bold leading-[1.1] text-water">
          {title}
        </h1>
        {description ? (
          <p className="text-water/70 text-[15px] mt-2.5 max-w-xl leading-relaxed">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </header>
  );
}
