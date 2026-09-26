const REPO_URL = "https://github.com/ndizeyedavid/cohort-2-frontend-web-dev-resources";

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-white/70 bg-white/70 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt=""
            width={34}
            height={34}
            className="size-[34px] rounded-tile border-2 border-white shadow-[0_6px_14px_-8px_rgba(10,74,107,0.9)]"
          />
          <p className="text-[13px] text-water/70 leading-snug">
            <span className="font-display font-bold text-water">Cohort Vault</span>
            <br />
            Frontend web development, cohort 2.
          </p>
        </div>
        <p className="text-[13px] text-water/70 leading-snug">
          Your progress stays in this browser, on this device.
          <br />
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="font-bold text-primary hover:underline"
          >
            Course repository
          </a>
        </p>
      </div>
    </footer>
  );
}
