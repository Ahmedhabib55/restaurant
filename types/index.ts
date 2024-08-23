export interface MenuItem<T extends string[] = string[]> {
  _id: string;
  name: string;
  ingredients: T;
  price: number;
}

export type Sandwich = MenuItem;
export type Talab = MenuItem<[string, string, string, string, string]>;

export type User = {
  _id: string;
  name: string;
};

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};
