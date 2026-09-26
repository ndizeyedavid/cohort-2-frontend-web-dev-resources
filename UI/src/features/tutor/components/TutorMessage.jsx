import Markdown from "../../../ui/Markdown.jsx";

export default function TutorMessage({ message }) {
  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <div
          className="rounded-inner rounded-br-tile px-4 py-2.5 max-w-[85%] text-[14px] text-white whitespace-pre-wrap"
          style={{
            backgroundImage: "linear-gradient(160deg, #57c9e8 0%, #0f8ec9 100%)",
            boxShadow: "0 8px 18px -10px rgba(15,142,201,0.95)",
          }}
        >
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div>
      {message.chip ? (
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-water/50 mb-1.5">
          {message.chip}
        </p>
      ) : null}
      <div className="rounded-inner rounded-tl-tile px-4 py-3.5 bg-sky-soft/80 border border-base-300 [&_.markdown]:text-[14.5px] [&_.markdown]:my-0 [&_.markdown_h2]:text-base [&_.markdown_h2]:mt-3 [&_.markdown_h2]:border-0 [&_.markdown_pre]:my-2 [&_.markdown_p]:my-1.5">
        <Markdown>{message.content}</Markdown>
        {message.streaming ? (
          <span className="inline-block size-1.5 sphere bg-aqua animate-pulse ml-1 align-middle" />
        ) : null}
      </div>
    </div>
  );
}
