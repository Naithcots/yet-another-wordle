import { appUrl } from "@/lib/variables";
import { NextApiRequest, NextApiResponse } from "next";

export type SolutionResponse = {
  data: string | null;
  error: string | null;
};

async function getSolutions(): Promise<string[]> {
  const response = await fetch(`${appUrl}/en.json`);
  if (!response.ok) {
    throw new Error("Unable to fetch solutions");
  }
  return response.json();
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SolutionResponse>,
) {
  try {
    if (!appUrl) {
      throw new Error("Invalid request");
    }

    const solutions = await getSolutions();

    if (solutions.length < 1) {
      throw new Error("No solutions found");
    }

    const randomIndex = Math.floor(Math.random() * solutions.length);

    res.status(200).json({ error: null, data: solutions[randomIndex] });
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      res.status(400).json({ error: err.message, data: null });
    } else {
      res.status(500).json({ error: "Internal Server Error", data: null });
    }
  }
}
