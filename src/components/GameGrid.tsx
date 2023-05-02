import { SimpleGrid } from "@mantine/core";
import { useGame } from "../contexts/GameContext";
import { Card } from "./Card";
import { difficulties } from "../utils";

export function GameGrid() {
  const { cards, length } = useGame();

  return (
    <SimpleGrid cols={difficulties[length].cols} spacing={6} verticalSpacing={6}>
      {cards.map(card => (
        <Card key={card.id} card={card} />
      ))}
    </SimpleGrid>
  );
}
