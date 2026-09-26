export default function ShortQuestion({ value, onChange }) {
  return (
    <label className="block">
      <span className="eyebrow block mb-2">Your answer</span>
      <textarea
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
        rows={5}
        placeholder="Type your answer in your own words..."
        className="textarea w-full rounded-inner bg-white border-2 border-base-300 text-[14.5px] leading-relaxed text-water focus:border-primary focus:outline-none transition-colors"
      />
      <span className="block text-[12.5px] text-water/55 mt-2">
        The tutor reads it for meaning, exact wording does not matter.
      </span>
    </label>
  );
}
