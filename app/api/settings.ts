// import { BASE_URL } from "@/lib/api";
// import { buildPopulateQuery } from "@/lib/populateQuery";
import homeData from "@/data/homepage.json";

// const populateQuery = buildPopulateQuery({
//   background: true,
//   socials: {
//     logo: true,
//   },
//   namedLogo: true,
//   logo: true,
// });

// TEMP: Static data until backend is ready
export async function fetchSettings() {
  // const res = await fetch(`${BASE_URL}/api/homepage?${populateQuery}`, {
  //   next: { revalidate: 60 },
  // });
  // const data = await res.json();
  // return data?.data;
  return homeData;
}
