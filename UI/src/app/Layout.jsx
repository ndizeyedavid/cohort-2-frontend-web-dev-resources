import { Suspense, lazy, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Spinner from "../ui/Spinner.jsx";
import BubbleField from "../ui/BubbleField.jsx";
import CommandPalette from "../features/search/components/CommandPalette.jsx";
import { useVault } from "./providers/VaultProvider.jsx";

const TutorPanel = lazy(() => import("../features/tutor/components/TutorPanel.jsx"));

export default function Layout() {
  const { degraded } = useVault();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <BubbleField />
      <Navbar />
      {degraded ? (
        <div className="alert rounded-none border-x-0 border-t-0 bg-warning/90 text-warning-content text-[13px] py-2.5 flex justify-center">
          <span>
            Progress cannot be saved on this device right now. It will work for this
            session only.
          </span>
        </div>
      ) : null}
      <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 flex-1">
        <Suspense
          fallback={
            <div className="py-24 grid place-items-center">
              <Spinner label="Loading" />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <Suspense fallback={null}>
        <TutorPanel />
      </Suspense>
      <CommandPalette />
    </div>
  );
}
