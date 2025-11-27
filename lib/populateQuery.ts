export type PopulateObject = {
  [key: string]: true | PopulateObject;
};

export function buildPopulateQuery(
  obj: PopulateObject,
  prefix = "populate"
): string {
  const params: string[] = [];

  for (const [key, value] of Object.entries(obj)) {
    if (value === true) {
      params.push(`${prefix}[${key}]=true`);
    } else if (typeof value === "object" && value !== null) {
      const nested = buildPopulateQuery(value, `${prefix}[${key}][populate]`);
      params.push(nested);
    }
  }

  return params.join("&");
}
