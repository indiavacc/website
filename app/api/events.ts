// import { BASE_URL } from "@/lib/api";
// import { buildPopulateQuery } from "@/lib/populateQuery";
import eventsData from "@/data/events.json";

// const populateQuery = buildPopulateQuery({ banner: true });

// TEMP: Static data until backend is ready
export async function fetchEvents() {
  // const res = await fetch(`${BASE_URL}/api/events?${populateQuery}`, {
  //   next: { revalidate: 60 },
  // });
  // const data = await res.json();
  // return data?.data;
  return eventsData.data;
}
