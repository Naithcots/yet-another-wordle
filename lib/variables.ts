export const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const language = "english" as const;
const maxTurns = 6;
const revealAnimationDurationMs = 350;
const revealAnimationLetterDelayMs = 200;
const totalRevealAnimationDurationMs =
  revealAnimationDurationMs + 4 * revealAnimationLetterDelayMs;

export const settings = {
  language,
  maxTurns,
  revealAnimationDurationMs,
  revealAnimationLetterDelayMs,
  totalRevealAnimationDurationMs,
};
