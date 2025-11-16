import { useSettingsStore } from "@/app/store/useSettingsStore";
import { fetchSettings } from "../api/settings";

const useSettings = () => {
  const { settings, setSettings } = useSettingsStore();

  if (!settings) {
    fetchSettings().then(setSettings);
  }
};
export default useSettings;
