export interface ICard {
  id: string;
  show: boolean;
  found: boolean;
  value: string;
}

export interface ColsMap {
  [key: number]: {
    cols: number;
    visible: number;
  };
}
