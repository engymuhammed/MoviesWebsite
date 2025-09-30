export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;

  // Optional properties from details API
  overview?: string;
  runtime?: number;
  genres?: { id: number; name: string }[];
}
