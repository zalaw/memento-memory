import { SimpleGrid } from "@mantine/core";
import { useGame } from "../contexts/GameContext";
import { Card } from "./Card";

export function GameGrid() {
  const { cards, length, colsMap } = useGame();

  return (
    <SimpleGrid cols={colsMap[length].cols} spacing={6} verticalSpacing={6}>
      {cards.map(card => (
        <Card key={card.id} card={card} />
      ))}
    </SimpleGrid>
  );
}
