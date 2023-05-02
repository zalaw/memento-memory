import { DifficultyLevels, ICard, IValues } from "../interfaces";

export const difficulties: DifficultyLevels = {
  6: {
    label: "Beginner",
    cols: 3,
    visibleFor: 1000,
  },
  8: {
    label: "Easy",
    cols: 4,
    visibleFor: 1500,
  },
  12: {
    label: "Medium",
    cols: 4,
    visibleFor: 2000,
  },
  20: {
    label: "Challenging",
    cols: 5,
    visibleFor: 2500,
  },
  30: {
    label: "Hard",
    cols: 6,
    visibleFor: 3000,
  },
  42: {
    label: "Expert",
    cols: 6,
    visibleFor: 3500,
  },
};

export const values: IValues = {
  numbers: {
    label: "Numbers",
    values: Array.from({ length: 24 }, (_, i) => (i + 1).toString()),
  },
  letters: {
    label: "Letters",
    values: Array.from({ length: 24 }, (_, i) => String.fromCharCode(i + 65)),
  },
  emojis: {
    label: "Emojis",
    values: [
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
    ],
  },
};

export const generateCards = (length: number, valuesParan: string): ICard[] => {
  const result: ICard[] = [];

  for (let i = 0; i < length / 2; i++) {
    result.push({ id: crypto.randomUUID(), show: true, found: false, value: values[valuesParan].values[i] });
    result.push({ id: crypto.randomUUID(), show: true, found: false, value: values[valuesParan].values[i] });
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
