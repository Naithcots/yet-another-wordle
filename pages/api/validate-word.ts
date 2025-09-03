import { getBaseUrl } from "@/helpers/getBaseUrl";
import { NextApiRequest, NextApiResponse } from "next";

export type ValidateWordResponse = {
  data: { valid: boolean } | null;
  error: string | null;
};

const url = getBaseUrl();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ValidateWordResponse>,
) {
  try {
    const { word } = req.query;

    if (typeof word !== "string") {
      res.status(400).json({ error: "Invalid word", data: null });
      return;
    }

    const response = await fetch(`${url}/dictionary.json`);
    if (!response.ok) throw new Error("Unable to fetch dictionary");
    const wordList: string[] = await response.json();

    if (wordList.includes(word)) {
      res.status(200).json({ error: null, data: { valid: true } });
    } else {
      res.status(200).json({ error: null, data: { valid: false } });
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      res.status(500).json({
        error: err.message,
        data: null,
      });
    } else {
      res.status(500).json({
        error: "Internal Server Error",
        data: null,
      });
    }
  }
}
