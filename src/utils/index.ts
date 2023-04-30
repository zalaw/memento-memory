import { ICard } from "../interfaces";

export const generateCards = (length: number, values?: string[]): ICard[] => {
  const result: ICard[] = [];

  for (let i = 0; i < length / 2; i++) {
    result.push({ id: crypto.randomUUID(), show: true, found: false, value: values?.[i] || (i + 1).toString() });
    result.push({ id: crypto.randomUUID(), show: true, found: false, value: values?.[i] || (i + 1).toString() });
  }

  return result;
};

export const shuffle = <T>(array: T[]): T[] => {
  const result = [...array];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }

  return result;
};

const generateValuesAsNumbers = () => {
  return Array.from({ length: 24 }, (_, i) => (i + 1).toString());
};

const generateValuesAsLetters = () => {
  return Array.from({ length: 24 }, (_, i) => String.fromCharCode(i + 65));
};

const generateValuesAsEmojis = () => {
  return [
    "😀",
    "🤣",
    "😎",
    "😍",
    "🤔",
    "😥",
    "🙃",
    "🤑",
    "😨",
    "😭",
    "🤯",
    "😱",
    "🥵",
    "🥶",
    "🤪",
    "😡",
    "😷",
    "🤢",
    "🤠",
    "🤡",
    "💀",
    "👽",
    "💩",
    "👻",
  ];
};

export const generateValues = (type: string) => {
  if (type === "numbers") return generateValuesAsNumbers();
  else if (type === "letters") return generateValuesAsLetters();
  else return generateValuesAsEmojis();
};
