export async function fetchEvents() {
  const res = await fetch(
    `https://my.vatsim.net/api/v2/events/view/division/WA`,
    {
      next: { revalidate: 60 },
    }
  );
  const data = await res.json();

  const filteredData = filterIndianEvents(data);

  return filteredData;
}

export function filterIndianAirports<T extends Event>(event: T): T {
  const indianPrefixes = ["VA", "VE", "VI", "VO"];

  return {
    ...event,
    airports: event.airports?.filter((ap) =>
      indianPrefixes.some((prefix) => ap.icao?.toUpperCase().startsWith(prefix))
    ),
  };
}

export function filterIndianEvents<T extends EventResponse>(events: T) {
  return events.data
    .map(filterIndianAirports)
    .filter((event) => event.airports.length > 0);
}
