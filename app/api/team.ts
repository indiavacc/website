import { BASE_URL } from "@/lib/api";
import { buildPopulateQuery } from "@/lib/populateQuery";

const populateQuery = buildPopulateQuery({ photo: true });

export async function fetchTeams() {
  const res = await fetch(`${BASE_URL}/api/teams?${populateQuery}`, {
    next: { revalidate: 60 },
  });
  const data = await res.json();
  return data?.data;
}
