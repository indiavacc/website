import { usePartnerStore } from "@/app/store/usePartnerStore";
import { fetchPartners } from "../api/partners";

const usePartners = () => {
  const { partners, setPartners } = usePartnerStore();

  if (!partners) {
    fetchPartners().then(setPartners);
  }
};
export default usePartners;
