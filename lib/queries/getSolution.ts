import { getBaseUrl } from "@/helpers/getBaseUrl";

export default async function getSolution() {
  const response = await fetch(`${getBaseUrl()}/api/solution`);
  if (!response.ok) throw new Error("Unable to fetch solution");
  const data = (await response.json()) as {
    data: string;
    error: null;
  };

  return data.data;
}
