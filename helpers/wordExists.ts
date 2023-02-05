import { Tlanguage } from "@/types";
import axios from "axios";

interface Response {
  exists: boolean;
}

export default async function wordExists(word: string, language: Tlanguage) {
  try {
    const res = await axios.get<Response>(
      `/api/check?lang=${language}&word=${word}`
    );
    const data = res.data;
    return data.exists;
  } catch (err) {
    return "error";
  }
}
