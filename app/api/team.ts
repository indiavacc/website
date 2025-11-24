// import { BASE_URL } from "@/lib/api";
// import { buildPopulateQuery } from "@/lib/populateQuery";
import teamData from "@/data/team.json";

// const populateQuery = buildPopulateQuery({ photo: true });

// TEMP: Static data until backend is ready
export async function fetchTeams() {
  // const res = await fetch(`${BASE_URL}/api/teams?${populateQuery}`, {
  //   next: { revalidate: 60 },
  // });
  // const data = await res.json();
  // return data?.data;
  return teamData.data;
}
