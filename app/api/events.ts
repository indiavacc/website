import { BASE_URL } from "@/lib/api";
import { buildPopulateQuery } from "@/lib/populateQuery";

const populateQuery = buildPopulateQuery({ banner: true });

export async function fetchEvents() {
  const res = await fetch(`${BASE_URL}/api/events?${populateQuery}`, {
    next: { revalidate: 60 },
  });
  const data = await res.json();
  return data?.data;
}
