import { ICard } from "../interfaces";

export const generateCards = (length: number): ICard[] => {
  const result: ICard[] = [];

  for (let i = 0; i < length / 2; i++) {
    result.push({ id: crypto.randomUUID(), show: true, found: false, value: (i + 1).toString() });
    result.push({ id: crypto.randomUUID(), show: true, found: false, value: (i + 1).toString() });
  }

  return result;
};

export const shuffle = (array: ICard[]): ICard[] => {
  const result = [...array];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }

  return result;
};
