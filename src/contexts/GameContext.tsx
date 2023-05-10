import { ReactNode, createContext, useContext, useState, useLayoutEffect, useRef, useEffect } from "react";
import { ICard, IStats } from "../interfaces";
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
  stats: IStats;
  setLength: (val: number) => void;
  setValues: (val: "numbers" | "letters" | "emojis") => void;
  start: () => void;
  end: () => void;
  finish: () => void;
  flip: (card: ICard | undefined) => void;
  resetStats: () => void;
}

const defaultState = {
  gameStatus: "not-started",
  length: Number(Object.keys(difficulties)[0]),
  values: "numbers",
  cards: [],
  prev: undefined,
  secondsPassed: null,
  stats: { 6: [], 8: [], 12: [], 20: [], 30: [], 42: [] },
  setLength: () => {},
  setValues: () => {},
  start: () => {},
  end: () => {},
  flip: () => {},
  finish: () => {},
  setTime: () => {},
  resetStats: () => {},
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
  const [stats, setStats] = useState<IStats>(defaultState.stats);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const secondsPassed: number | null = finishedAt ? Number(((finishedAt - startedAt!) / 1000).toFixed(2)) : null;

  useEffect(() => {
    const generatedCards = generateCards(length, values);
    const _stats = localStorage.getItem("MEMENTO_MEMORY_STATS");

    if (_stats) setStats(JSON.parse(_stats));
    setCards(generatedCards);
    // setStats(_stats ? JSON.parse(_stats) : stats);
  }, []);

  useLayoutEffect(() => {
    const generatedCards = generateCards(length, values);
    setCards(generatedCards);
  }, [length, values]);

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
    if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    setGameStatus("not-started");
    setCards(cards.map(card => ({ ...card, flipped: true, found: false })));
    setStartedAt(null);
    setFinishedAt(null);
    setPrev(undefined);
  };

  const resetStats = () => {
    const _stats = { ...stats };

    for (const key in _stats) {
      _stats[key] = [];
    }

    setStats(_stats);
    localStorage.setItem("MEMENTO_MEMORY_STATS", JSON.stringify(_stats));
  };

  const finish = () => {
    const _stats = { ...stats };
    const now = Date.now();
    const time = Number(((now - startedAt!) / 1000).toFixed(2));

    if (_stats[length].some(x => time < x) || _stats[length].length < 5) {
      _stats[length].push(time);
      _stats[length] = [..._stats[length].sort((a, b) => a - b)].slice(0, 5);
      setStats(_stats);
      localStorage.setItem("MEMENTO_MEMORY_STATS", JSON.stringify(_stats));
    }

    setGameStatus("finished");
    setFinishedAt(now);
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
    stats,
    setLength,
    setValues,
    start,
    end,
    flip,
    finish,
    resetStats,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
