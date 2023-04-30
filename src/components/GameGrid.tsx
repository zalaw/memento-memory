import { SimpleGrid } from "@mantine/core";
import { useGame } from "../contexts/GameContext";
import { Card } from "./Card";

export function GameGrid() {
  const { gameStatus, cards, length, colsMap } = useGame();

  return (
    <SimpleGrid cols={colsMap[length].cols} spacing={6} verticalSpacing={6}>
      {gameStatus === "not-started"
        ? Array.from({ length }).map((_, index) => <Card key={index} />)
        : cards.map(card => <Card key={card.id} card={card} />)}
    </SimpleGrid>
  );
}
