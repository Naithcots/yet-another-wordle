import { getBaseUrl } from "@/helpers/getBaseUrl";
import { ValidateWordResponse } from "@/pages/api/validate-word";

export default async function validateWord(word: string) {
  try {
    const response = await fetch(
      `${getBaseUrl()}/api/validate-word?word=${word}`,
    );
    if (!response.ok) throw new Error("Unable to fetch dictionary");

    const data = (await response.json()) as ValidateWordResponse;
    return data.data!.valid;
  } catch (err) {
    return undefined;
  }
}
