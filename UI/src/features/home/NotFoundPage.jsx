import { Link } from "react-router-dom";
import Button from "../../ui/Button.jsx";
import EmptyState from "../../ui/EmptyState.jsx";

export default function NotFoundPage() {
  return (
    <div className="py-10">
      <EmptyState
        icon="search"
        title="That page is not in the vault"
        description="The link may be old, or the page may have been renamed. Everything still lives under the modules."
      >
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <Link to="/">
            <Button>Back home</Button>
          </Link>
          <Link to="/modules">
            <Button variant="glass">Browse modules</Button>
          </Link>
        </div>
      </EmptyState>
    </div>
  );
}
