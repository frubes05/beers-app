export interface IBeerFilters {
  beer_name: string;
  abv_lt: number;
  abv_gt: number;
  sortBy: 'abv:asc' | 'abv:desc' | 'name:asc' | 'name:desc';
  favoritesOnly: boolean;
  page: number;
}

interface IBeerVolume {
  value: number;
  unit: string;
}

interface IBeerMethod {
  mash_temp: Array<{
    temp: {
      value: number;
      unit: string;
    };
    duration: number;
  }>;
  fermentation: {
    temp: {
      value: number;
      unit: string;
    };
  };
  twist: string | null;
}

interface IBeerIngredients {
  malt: Array<{
    name: string;
    amount: {
      value: number;
      unit: string;
    };
  }>;
  hops: Array<{
    name: string;
    amount: {
      value: number;
      unit: string;
    };
    add: string;
    attribute: string;
  }>;
  yeast: string;
}

export interface IBeerProps {
  id: number;
  name: string;
  tagline: string;
  first_brewed: string;
  description: string;
  image_url: string;
  abv: number;
  ibu: number;
  target_fg: number;
  target_og: number;
  ebc: number;
  srm: number;
  ph: number;
  attenuation_level: number;
  volume: IBeerVolume;
  boil_volume: IBeerVolume;
  method: IBeerMethod;
  ingredients: IBeerIngredients;
  food_pairing: string[];
  brewers_tips: string;
  contributed_by: string;
}

export type IBeerViewModel = IBeerProps & { isFavorite: boolean };
