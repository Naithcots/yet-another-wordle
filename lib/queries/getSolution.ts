import { appUrl, secretKey } from "@/lib/variables";

export default async function getSolution() {
  if (!appUrl || !secretKey) {
    throw new Error("Missing variables");
  }

  const response = await fetch(`${appUrl}/api/solution`);
  if (!response.ok) throw new Error("Unable to fetch solution");
  const data = (await response.json()) as {
    data: string;
    error: null;
  };

  return data.data;
}
