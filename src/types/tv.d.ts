export interface TV {
  adult: boolean;
  backdrop_path: string;
  created_by?: CreatedBy[];
  episode_run_time?: any[];
  first_air_date: string;
  genres?: Genre[];
  genre_ids?: string[];
  homepage?: string;
  id: number;
  in_production?: boolean;
  languages?: OriginalLanguage[];
  last_air_date?: string;
  last_episode_to_air?: TEpisodeToAir;
  name: string;
  next_episode_to_air?: TEpisodeToAir;
  networks?: Network[];
  number_of_episodes?: number;
  number_of_seasons?: number;
  origin_country: string[];
  original_language: OriginalLanguage;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies?: Network[];
  production_countries?: ProductionCountry[];
  seasons?: Season[];
  spoken_languages?: SpokenLanguage[];
  status?: string;
  tagline?: string;
  type?: string;
  vote_average: number;
  vote_count: number;
  images?: Images;
  videos?: Videos;
}

export interface CreatedBy {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Images {
  backdrops: Backdrop[];
  logos: Backdrop[];
  posters: Backdrop[];
}

export interface Backdrop {
  aspect_ratio: number;
  height: number;
  iso_639_1: OriginalLanguage;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export enum OriginalLanguage {
  En = "en",
}

export interface TEpisodeToAir {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: Date;
  episode_number: number;
  episode_type: string;
  production_code: string;
  runtime: number | null;
  season_number: number;
  show_id: number;
  still_path: string;
}

export interface Network {
  id: number;
  logo_path: null | string;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface Season {
  air_date: Date;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: null | string;
  season_number: number;
  vote_average: number;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: OriginalLanguage;
  name: string;
}

export interface Videos {
  results: Result[];
}

export interface Result {
  iso_639_1: OriginalLanguage;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: Date;
  id: string;
}

export interface PopularTV {
  page: number;
  results: TV[];
  total_pages: number;
  total_results: number;
}
