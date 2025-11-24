// import { BASE_URL } from "@/lib/api";
// import { buildPopulateQuery } from "@/lib/populateQuery";
import partnersData from "@/data/partners.json";

// const populateQuery = buildPopulateQuery({ photo: true });

// TEMP: Static data until backend is ready
export async function fetchPartners() {
  // const res = await fetch(`${BASE_URL}/api/partners?${populateQuery}`, {
  //   next: { revalidate: 60 },
  // });
  // const data = await res.json();
  // return data?.data;
  return partnersData.data;
}
