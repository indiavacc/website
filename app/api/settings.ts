import { BASE_URL } from "@/lib/api";
import { buildPopulateQuery } from "@/lib/populateQuery";

const populateQuery = buildPopulateQuery({
  background: true,
  socials: {
    logo: true,
  },
  namedLogo: true,
  logo: true,
});

export async function fetchSettings() {
  const res = await fetch(`${BASE_URL}/api/homepage?${populateQuery}`, {
    next: { revalidate: 60 },
  });
  const data = await res.json();
  return data?.data;
}
