import { Text } from "@mantine/core";
import { useGame } from "../contexts/GameContext";
import { ICard } from "../interfaces";

interface CardProps {
  card?: ICard | undefined;
}

export function Card({ card }: CardProps) {
  const { flip } = useGame();

  return (
    <div className="card-main-container" onClick={() => flip(card)}>
      <div className={`card ${card?.flipped || card?.found ? "card-flipped" : ""}`}>
        <div className={`card-front ${card?.found ? "card-found" : ""}`}>
          <Text className="card-text" fw={700} fz={"200%"}>
            {card?.value}
          </Text>
        </div>
        <div className="card-back"></div>
      </div>
    </div>
  );
}
