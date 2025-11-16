"use client";
import Divider from "@/components/Divider";
import FlightTable from "@/app/flights/components/FlightsTable";

const FlightsPage = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 ">
      <Divider title="Live Flights" />
      <FlightTable />
    </div>
  );
};

export default FlightsPage;
