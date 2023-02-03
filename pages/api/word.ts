import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import CryptoJS from "crypto-js";

const { random, floor } = Math;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await axios.get(process.env.WORDS_URL!);
    const words: string[] = response.data;

    const r = floor(random() * words.length);
    const encrypted = CryptoJS.AES.encrypt(
      words[r],
      process.env.NEXT_PUBLIC_CRYPTO_SECRET!
    ).toString(CryptoJS.format.OpenSSL);

    res.status(200).json({ word: encrypted });
  } catch (err) {
    res.status(503).json({ error: "Couldn't get word repository" });
    return;
  }
}
