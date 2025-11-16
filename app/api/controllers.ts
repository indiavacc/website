import { BASE_URL } from "@/lib/api";

export async function fetchControllers() {
  const res = await fetch(`${BASE_URL}/api/controllers`, {
    next: { revalidate: 60 },
  });
  const data = await res.json();
  return data?.data;
}
