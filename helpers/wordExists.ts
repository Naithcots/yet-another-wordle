import axios from "axios";

interface Response {
  exists: boolean;
}

export default async function wordExists(word: string) {
  try {
    const res = await axios.get<Response>(`/api/check?word=${word}`);
    const data = res.data;
    return data.exists;
  } catch (err) {
    return "error";
  }
}
