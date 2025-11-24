// export async function fetchAPI(path: string) {
//   const res = await fetch(`${BASE_URL}/api/${path}?populate=*`);
//   if (!res.ok) {
//     throw new Error(`Failed to fetch API: ${res.statusText}`);
//   }
//   const data = await res.json();
//   return data.data;
// }

export const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";
