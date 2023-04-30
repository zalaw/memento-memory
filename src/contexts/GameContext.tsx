import { ReactNode, createContext, useContext, useState, useEffect, useRef } from "react";
import { ICard, ColsMap } from "../interfaces";
import { generateCards, generateValues, shuffle } from "../utils";

interface GameProviderProps {
  children: ReactNode;
}

interface GameContextInterface {
  gameStatus: "not-started" | "started" | "finished";
  length: number;
  values: "numbers" | "letters" | "emojis";
  cards: ICard[];
  colsMap: ColsMap;
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
  length: 8,
  values: "numbers",
  cards: [],
  colsMap: { 8: { cols: 4, visible: 500 } },
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

  const secondsPassed: number | null = finishedAt ? (finishedAt - startedAt!) / 1000 : null;
  const colsMap: ColsMap = {
    8: { cols: 4, visible: 1000 },
    16: { cols: 4, visible: 1500 },
    24: { cols: 6, visible: 2000 },
    36: { cols: 6, visible: 2500 },
    48: { cols: 6, visible: 3000 },
  };

  useEffect(() => {
    if (gameStatus !== "not-started") return;

    if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);

    const generatedCards = generateCards(length, generateValues(values));
    setCards(generatedCards);
  }, [gameStatus, length, values]);

  const start = () => {
    const shuffledCards = shuffle(cards);

    setGameStatus("started");
    setCards(shuffledCards);
    setStartedAt(Date.now());

    if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setCards(shuffledCards.map(card => ({ ...card, show: false })));
    }, colsMap[length].visible);
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
    if (cards.filter(card => card.show).length > 1) return;

    setCards(cards.map(c => (c.id === card.id ? { ...c, show: true } : c)));

    if (prev) {
      if (prev.value === card.value) {
        setCards(cards.map(c => (c.id === prev.id || c.id === card.id ? { ...c, found: true, show: false } : c)));
      } else {
        setTimeout(() => {
          setCards(cards.map(c => ({ ...c, show: false })));
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
    colsMap,
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
