export type Pokemon = {
  id: number;
  name: string;
  genus: string;
  description: string;
  imageUrl: string;
  types: Array<string>;
  color: string;
};

export type PokemonDetail = {
  id: number;
  name: string;
  genus: string;
  description: string;
  imageUrl: string;
  types: Array<string>;
  abilities: Array<{
    name: string;
    effect: string;
    description: string;
  }>;
  stats: {
    HP: number;
    Attack: number;
    Defense: number;
    'Special Attack': number;
    'Special Defense': number;
    Speed: number;
  };
  locations: Array<string>;
  color: string;
};
