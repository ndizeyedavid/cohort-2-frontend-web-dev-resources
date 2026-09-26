import Icon from "./Icon.jsx";
import { hasIcon } from "../lib/icons.js";

export default function EmptyState({ icon = "book", title, description, children }) {
  return (
    <div className="flex flex-col items-center text-center py-14 px-6 border-2 border-dashed border-base-300 rounded-card bg-white/55">
      {icon ? (
        <span
          className="grid place-items-center size-14 sphere mb-4 text-[22px] text-white border-2 border-white swell"
          style={{
            backgroundImage:
              "radial-gradient(circle at 32% 26%, #bff0fb 0%, #57c9e8 45%, #2ea9d6 100%)",
            boxShadow: "0 10px 24px -10px rgba(46,169,214,0.9)",
          }}
          aria-hidden="true"
        >
          {hasIcon(icon) ? <Icon name={icon} size={22} /> : icon}
        </span>
      ) : null}
      <h3 className="text-lg font-display font-bold text-water">{title}</h3>
      {description ? (
        <p className="text-water/65 text-sm mt-2 max-w-md leading-relaxed">
          {description}
        </p>
      ) : null}
      {children ? <div className="mt-5">{children}</div> : null}
    </div>
  );
}
