export function findStartAndEndOfWordFromText(
  text: string,
  word: string
): [number, number] {
  const start = text.indexOf(word);
  const end = start + word.length;
  return [start, end];
}
