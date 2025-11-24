// import { BASE_URL } from "@/lib/api";
import controllersData from "@/data/controllers.json";

// TEMP: Static data until backend is ready
export async function fetchControllers() {
  // const res = await fetch(`https://api.vatsim.net/v2/orgs/division/wa`, {
  //   next: { revalidate: 60 },
  // });
  // const data = await res.json();
  // console.log("🚀 ~ fetchControllers ~ data:", data)
  // return data?.data;
  return controllersData.data;
}
