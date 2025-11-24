import { useSettingsStore } from "@/app/store/useSettingsStore";
import { fetchSettings } from "../api/settings";

const useSettings = () => {
  const { settings, setSettings } = useSettingsStore();

  if (!settings) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fetchSettings().then(setSettings as any);
  }
};
export default useSettings;
