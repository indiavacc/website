// components/PartnersSection.tsx
import React from "react";
import { PartnersSlider } from "./PartnersSlider";
import { usePartnerStore } from "@/app/store/usePartnerStore";
import Divider from "./Divider";
import usePartners from "@/app/hooks/usePartners";

const PartnersSection: React.FC = () => {
  usePartners();
  const { partners } = usePartnerStore();

  if (!partners?.length) return null;

  return (
    <section className="flex flex-col justify-center px-8 md:px-16 lg:px-24 py-16">
      <Divider title="Our Partners" />
      <PartnersSlider partners={partners} />
    </section>
  );
};

export default PartnersSection;
