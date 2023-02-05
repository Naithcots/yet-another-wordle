import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { lang, word } = req.query;
    const response = await axios.get(`${process.env.DOMAIN_URL!}/${lang}.json`);
    const words: string[] = response.data;

    if (words.includes(word as string)) res.status(200).json({ exists: true });
    else res.status(200).json({ exists: false });
  } catch (err) {
    res.status(503).json({
      error: "Couldn't get word repository",
      message: "Dictionary error. Please try again later",
    });
    return;
  }
}
