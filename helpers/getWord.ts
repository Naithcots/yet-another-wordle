import { Tlanguage } from "@/types";
import axios from "axios";
import CryptoJS from "crypto-js";

export default async function getWord(language: Tlanguage) {
  const response = await axios.get(`/api/word?lang=${language}`);
  const word = CryptoJS.AES.decrypt(
    response.data.word,
    process.env.NEXT_PUBLIC_CRYPTO_SECRET!
  ).toString(CryptoJS.enc.Utf8);
  // setTimeout(() => {
    return word;
  // }, 3000);
  // return word;
}
