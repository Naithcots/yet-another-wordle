export default function isAlphabetKey(key: string) {
  return /^[a-ząćęłńóśżź]$/i.test(key);
}
