import { fetchControllers } from "../api/controllers";
import { useControllerStore } from "@/app/store/useControllerStore";

const useControllers = () => {
  const { controllers, setControllers } = useControllerStore();

  if (!controllers) {
    fetchControllers().then(setControllers);
  }
};
export default useControllers;
