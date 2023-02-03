import axios from "axios";
import CryptoJS from "crypto-js";

export default async function getWord() {
  const response = await axios.get("/api/word");
  const word = CryptoJS.AES.decrypt(
    response.data.word,
    process.env.NEXT_PUBLIC_CRYPTO_SECRET!
  ).toString(CryptoJS.enc.Utf8);
  return word;
}
