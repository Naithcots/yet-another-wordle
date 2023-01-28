export default function isAlphabetKey(key: string) {
  return /^[a-z]$/i.test(key);
}
