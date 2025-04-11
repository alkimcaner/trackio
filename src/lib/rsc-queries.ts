import { get } from "@vercel/edge-config";
import { Movie } from "../types/movie";
import { PopularMovies } from "@/types/movie";
import { PopularTV, TV } from "@/types/tv";
import { Game } from "@/types/game";

export const getGames = async (payload: string) => {
  try {
    if (!payload) return [];

    const options = {
      method: "POST",
      headers: {
        "Client-ID": process.env.IGDB_ID ?? "",
        Authorization: `Bearer ${await get("igdb_token")}`,
      },
      body: payload,
    };

    const res = await fetch("https://api.igdb.com/v4/games", options);

    return res.json() as Promise<Game[]>;
  } catch (error) {
    console.error(error);
    return;
  }
};

export const getMovie = async (id: string) => {
  try {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=en&append_to_response=images,videos`;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
      },
    };

    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error("Failed to reach TMDB API");
    }

    return res.json() as Promise<Movie>;
  } catch (error) {
    console.error(error);
    return;
  }
};

export const getPopularMovies = async (page: number) => {
  try {
    const url = `https://api.themoviedb.org/3/movie/popular?language=en&page=${page}`;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
      },
    };

    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error("Failed to reach TMDB API");
    }

    return res.json() as Promise<PopularMovies>;
  } catch (error) {
    console.error(error);
    return;
  }
};

export const getTV = async (id: string) => {
  try {
    const url = `https://api.themoviedb.org/3/tv/${id}?language=en&append_to_response=images,videos`;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
      },
    };

    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error("Failed to reach TMDB API");
    }

    return res.json() as Promise<TV>;
  } catch (error) {
    console.error(error);
    return;
  }
};

export const getPopularTV = async (page: number) => {
  try {
    const url = `https://api.themoviedb.org/3/tv/popular?language=en&page=${page}`;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
      },
    };

    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error("Failed to reach TMDB API");
    }

    return res.json() as Promise<PopularTV>;
  } catch (error) {
    console.error(error);
    return;
  }
};

export const getTopRatedMovies = async (page: number) => {
  try {
    const url = `https://api.themoviedb.org/3/movie/top_rated?language=en&page=${page}`;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
      },
    };

    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error("Failed to reach TMDB API");
    }

    return res.json() as Promise<PopularMovies>;
  } catch (error) {
    console.error(error);
    return;
  }
};

export const getNewMovies = async (page: number) => {
  try {
    const url = `https://api.themoviedb.org/3/movie/now_playing?language=en&page=${page}`;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
      },
    };

    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error("Failed to reach TMDB API");
    }

    return res.json() as Promise<PopularMovies>;
  } catch (error) {
    console.error(error);
    return;
  }
};

export const getTopRatedTV = async (page: number) => {
  try {
    const url = `https://api.themoviedb.org/3/tv/top_rated?language=en&page=${page}`;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
      },
    };

    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error("Failed to reach TMDB API");
    }

    return res.json() as Promise<PopularTV>;
  } catch (error) {
    console.error(error);
    return;
  }
};

export const getNewTV = async (page: number) => {
  try {
    const url = `https://api.themoviedb.org/3/tv/on_the_air?language=en&page=${page}`;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
      },
    };

    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error("Failed to reach TMDB API");
    }

    return res.json() as Promise<PopularTV>;
  } catch (error) {
    console.error(error);
    return;
  }
};

export const getPopularGames = async () => {
  const payload = `
    fields id, name, cover.url, cover.image_id, first_release_date, rating, genres.name, platforms.name, summary;
    where rating != null & cover != null;
    sort popularity desc;
    limit 50;
  `;
  return getGames(payload);
};

export const getTopRatedGames = async () => {
  const payload = `
    fields id, name, cover.url, cover.image_id, first_release_date, rating, genres.name, platforms.name, summary;
    where rating >= 80 & cover != null;
    sort rating desc;
    limit 50;
  `;
  return getGames(payload);
};

export const getNewGames = async () => {
  const currentTime = Math.floor(Date.now() / 1000);
  const oneYearAgo = currentTime - 365 * 24 * 60 * 60;
  const payload = `
    fields id, name, cover.url, cover.image_id, first_release_date, rating, genres.name, platforms.name, summary;
    where first_release_date >= ${oneYearAgo} & first_release_date <= ${currentTime} & cover != null;
    sort first_release_date desc;
    limit 50;
  `;
  return getGames(payload);
};
