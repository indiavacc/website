import { fetchControllers } from "../api/controllers";
import { useControllerStore } from "@/app/store/useControllerStore";

const useControllers = () => {
  const { controllers, setControllers } = useControllerStore();

  if (!controllers) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fetchControllers().then(setControllers as any);
  }
};
export default useControllers;
