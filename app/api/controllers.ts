// import { BASE_URL } from "@/lib/api";
import controllersData from "@/data/controllers.json";

// TEMP: Static data until backend is ready
export async function fetchControllers() {
  // const res = await fetch(`${BASE_URL}/api/controllers`, {
  //   next: { revalidate: 60 },
  // });
  // const data = await res.json();
  // return data?.data;
  return controllersData.data;
}
