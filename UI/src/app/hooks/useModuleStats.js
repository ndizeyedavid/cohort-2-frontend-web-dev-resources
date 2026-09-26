import { useVault } from "../providers/VaultProvider.jsx";
import { moduleStats } from "../../services/progress.js";

export function useModuleStats(module) {
  const { state } = useVault();
  return moduleStats(module, state);
}
