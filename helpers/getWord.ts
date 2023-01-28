import axios from "axios";

export default async function getWord() {
  const response = await axios.get("http://localhost:5000/random");
  return response.data.word;
}
