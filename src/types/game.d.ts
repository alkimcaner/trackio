export interface Game {
  id: number;
  age_ratings: number[];
  aggregated_rating?: number;
  aggregated_rating_count?: number;
  alternative_names: number[];
  artworks: number[];
  bundles?: number[];
  category: number;
  collection: number;
  cover: Cover;
  created_at: number;
  dlcs?: number[];
  external_games: number[];
  first_release_date: number;
  follows: number;
  franchises: number[];
  game_engines?: number[];
  game_modes: number[];
  genres: number[];
  hypes?: number;
  involved_companies: InvolvedCompany[];
  keywords?: number[];
  name: string;
  platforms: number[];
  player_perspectives: number[];
  rating: number;
  rating_count: number;
  release_dates: number[];
  screenshots: Cover[];
  similar_games: number[];
  slug: string;
  storyline: string;
  summary: string;
  tags: number[];
  themes: number[];
  total_rating: number;
  total_rating_count: number;
  updated_at: number;
  url: string;
  videos: number[];
  websites: Website[];
  checksum: string;
  language_supports: number[];
  game_localizations: number[];
  collections: number[];
  standalone_expansions?: number[];
  remakes?: number[];
  expanded_games?: number[];
  remasters?: number[];
  ports?: number[];
  parent_game?: number;
}

export interface Cover {
  id: number;
  alpha_channel?: boolean;
  animated?: boolean;
  game: number;
  height: number;
  image_id: string;
  url: string;
  width: number;
  checksum: string;
}

export interface InvolvedCompany {
  id: number;
  company: Company;
  created_at: number;
  developer: boolean;
  game: number;
  porting: boolean;
  publisher: boolean;
  supporting: boolean;
  updated_at: number;
  checksum: string;
}

export interface Company {
  id: number;
  change_date_category: number;
  country?: number;
  created_at: number;
  description?: string;
  developed?: number[];
  logo?: number;
  name: string;
  published?: number[];
  slug: string;
  start_date?: number;
  start_date_category: number;
  updated_at: number;
  url: string;
  websites?: number[];
  checksum: string;
  parent?: number;
  change_date?: number;
  changed_company_id?: number;
}

export interface Website {
  id: number;
  category: number;
  game: number;
  trusted: boolean;
  url: string;
  checksum: string;
}
