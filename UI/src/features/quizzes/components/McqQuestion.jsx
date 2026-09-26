export default function McqQuestion({ question, value, onChange }) {
  return (
    <div className="space-y-2.5">
      {question.options.map((option, index) => {
        const selected = value === index;
        return (
          <label
            key={index}
            className={`flex items-start gap-3 border-2 rounded-inner p-4 cursor-pointer transition-all ${
              selected
                ? "border-primary bg-sky-soft shadow-[0_8px_20px_-12px_rgba(15,159,224,0.9)]"
                : "border-base-300 bg-white hover:border-aqua/70"
            }`}
          >
            <input
              type="radio"
              name={`option-${question.id}`}
              checked={selected}
              onChange={() => onChange(index)}
              className="mt-1 size-4.5 accent-[#0f9fe0]"
            />
            <span className="text-sm leading-relaxed text-water">{option}</span>
          </label>
        );
      })}
    </div>
  );
}
