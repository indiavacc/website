export async function fetchEvents() {
  const res = await fetch(
    `https://my.vatsim.net/api/v2/events/view/division/WA`,
    {
      next: { revalidate: 60 },
    }
  );
  const data = await res.json();
  return data.data;
}
