import { useEffect, useState } from "react";

const INDIAN_ICAO_INITIALS = ["VA", "VE", "VI", "VO"];

export function useFilteredFlights(intervalMs = 120000) {
  const [flights, setFlights] = useState<Pilot[]>([]);
  const [controllers, setControllers] = useState<Controller[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchFlights = async () => {
      if (isMounted) setLoading(true); // start loading
      try {
        const res = await fetch("https://data.vatsim.net/v3/vatsim-data.json");
        if (!res.ok) throw new Error("Failed to fetch flights");
        const data: LiveData = await res.json();

        const filteredFlights = data.pilots.filter(
          (flight) =>
            flight.flight_plan &&
            (INDIAN_ICAO_INITIALS.includes(
              flight.flight_plan.departure.substring(0, 2)
            ) ||
              INDIAN_ICAO_INITIALS.includes(
                flight.flight_plan.arrival.substring(0, 2)
              ))
        );
        const filteredControllers = data.controllers.filter(
          (controller) =>
            controller.callsign &&
            controller.facility >= 1 &&
            controller.facility <= 10 && // exclude observers and other non-ATC roles
            INDIAN_ICAO_INITIALS.includes(controller.callsign.substring(0, 2))
        );

        if (isMounted) {
          setFlights(filteredFlights);
          setControllers(filteredControllers);
          setLoading(false);
          setError(null);
        }
      } catch (err: unknown) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Unknown error");
          setLoading(false);
        }
      }
    };

    fetchFlights(); // initial fetch

    const interval = setInterval(fetchFlights, intervalMs); // fetch every N ms

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [intervalMs]);

  return { flights, controllers, loading, error };
}
