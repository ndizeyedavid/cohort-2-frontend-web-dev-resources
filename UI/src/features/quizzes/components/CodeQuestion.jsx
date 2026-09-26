export default function CodeQuestion({ value, onChange }) {
  return (
    <label className="block">
      <span className="eyebrow block mb-2">Your code</span>
      <textarea
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
        rows={10}
        spellCheck={false}
        placeholder="// Write your solution here"
        className="textarea w-full rounded-inner font-mono text-[13.5px] leading-relaxed text-white border-2 border-white/25 px-4 py-3.5 focus:border-aqua focus:outline-none"
        style={{
          backgroundImage: "linear-gradient(180deg, #0d5b83 0%, #062f47 100%)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18)",
        }}
      />
      <span className="block text-[12.5px] text-water/55 mt-2">
        Write working code. The tutor checks whether it does the job, not whether it
        matches word for word.
      </span>
    </label>
  );
}
