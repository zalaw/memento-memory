import { useGame } from "../contexts/GameContext";
import { GameNotStarted } from "../components/GameNotStarted";
import { GameStarted } from "../components/GameStarted";
import { GameFinished } from "../components/GameFinished";
import { GameGrid } from "../components/GameGrid";

export function Main() {
  const { gameStatus } = useGame();

  return (
    <>
      {gameStatus === "not-started" ? (
        <GameNotStarted />
      ) : gameStatus === "started" ? (
        <GameStarted />
      ) : (
        <GameFinished />
      )}

      <GameGrid />
    </>
  );
}
