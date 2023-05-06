import { ReactNode, createContext, useContext, useState, useLayoutEffect, useRef, useEffect } from "react";
import { ICard } from "../interfaces";
import { difficulties, generateCards, shuffle } from "../utils";

interface GameProviderProps {
  children: ReactNode;
}

interface GameContextInterface {
  gameStatus: "not-started" | "started" | "finished";
  length: number;
  values: "numbers" | "letters" | "emojis";
  cards: ICard[];
  prev: ICard | undefined;
  secondsPassed: number | null;
  setLength: (val: number) => void;
  setValues: (val: "numbers" | "letters" | "emojis") => void;
  start: () => void;
  end: () => void;
  finish: () => void;
  flip: (card: ICard | undefined) => void;
}

const defaultState = {
  gameStatus: "not-started",
  length: Number(Object.keys(difficulties)[0]),
  values: "numbers",
  cards: [],
  prev: undefined,
  secondsPassed: null,
  setLength: () => {},
  setValues: () => {},
  start: () => {},
  end: () => {},
  flip: () => {},
  finish: () => {},
  setTime: () => {},
} as GameContextInterface;

const GameContext = createContext<GameContextInterface>(defaultState);

export function useGame() {
  return useContext(GameContext);
}

export function GameProvider({ children }: GameProviderProps) {
  const [gameStatus, setGameStatus] = useState(defaultState.gameStatus);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [finishedAt, setFinishedAt] = useState<number | null>(null);
  const [length, setLength] = useState<number>(defaultState.length);
  const [values, setValues] = useState(defaultState.values);
  const [cards, setCards] = useState<ICard[]>(defaultState.cards);
  const [prev, setPrev] = useState<ICard | undefined>(defaultState.prev);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const secondsPassed: number | null = finishedAt ? Number(((finishedAt - startedAt!) / 1000).toFixed(2)) : null;

  useEffect(() => {
    console.log("localstorage");
  }, []);

  useLayoutEffect(() => {
    if (gameStatus !== "not-started") return;

    if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);

    const generatedCards = generateCards(length, values);
    setCards(generatedCards);
  }, [gameStatus, length, values]);

  const start = () => {
    const shuffledCards = shuffle(cards);

    setGameStatus("started");
    setCards(shuffledCards);
    setStartedAt(Date.now());

    if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setCards(shuffledCards.map(card => ({ ...card, flipped: false })));
    }, difficulties[length].visibleFor);
  };

  const end = () => {
    setGameStatus("not-started");
    setStartedAt(null);
    setPrev(undefined);
  };

  const finish = () => {
    setGameStatus("finished");
    setFinishedAt(Date.now());
  };

  const flip = (card: ICard | undefined) => {
    if (gameStatus !== "started" || !card) return;
    if (card.found || prev?.id === card.id) return;
    if (cards.filter(card => card.flipped).length > 1) return;

    setCards(cards.map(c => (c.id === card.id ? { ...c, flipped: true } : c)));

    if (prev) {
      if (prev.value === card.value) {
        setCards(cards.map(c => (c.id === prev.id || c.id === card.id ? { ...c, found: true, flipped: false } : c)));
      } else {
        setTimeout(() => {
          setCards(cards.map(c => ({ ...c, flipped: false })));
        }, 500);
      }

      if (cards.filter(c => c.found).length === length - 2) {
        finish();
      }

      setPrev(undefined);
    } else {
      setPrev(card);
    }
  };

  const value: GameContextInterface = {
    gameStatus,
    length,
    values,
    cards,
    prev,
    secondsPassed,
    setLength,
    setValues,
    start,
    end,
    flip,
    finish,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
