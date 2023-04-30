import { Card as MantineCard, Text, createStyles } from "@mantine/core";
import { useGame } from "../contexts/GameContext";
import { ICard } from "../interfaces";

interface CellProps {
  card?: ICard | undefined;
}

const useStyles = createStyles(() => ({
  cell: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    userSelect: "none",

    "&:hover": {
      filter: "brightness(1.25)",
      transform: "rotateY(0)",
    },
  },
}));

export function Card({ card }: CellProps) {
  const { gameStatus, flip } = useGame();
  const { classes } = useStyles();

  return (
    <MantineCard
      className={`${gameStatus !== "not-started" ? classes.cell : ""} ${card?.found ? "cell-found" : ""}`}
      style={{ aspectRatio: 1 / 1 }}
      onClick={() => flip(card)}
    >
      {(card?.show || card?.found) && (
        <Text fw={700} fz={"200%"}>
          {card?.value}
        </Text>
      )}
    </MantineCard>
  );
}
