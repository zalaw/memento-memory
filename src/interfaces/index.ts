export interface IStats {
  [key: number]: number[];
}

export interface ICard {
  id: string;
  flipped: boolean;
  found: boolean;
  value: string;
}

export interface DifficultyLevels {
  [key: number]: {
    label: string;
    cols: number;
    visibleFor: number;
  };
}

export interface IValues {
  [key: string]: {
    label: string;
    values: string[];
  };
}
