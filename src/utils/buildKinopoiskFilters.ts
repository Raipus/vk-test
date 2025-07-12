import type { MovieFilterValues } from '../components/MovieFilters';

export function buildKinopoiskFilters(values: MovieFilterValues) {
  const params: Record<string, string | string[]> = {};

  params.year = `${values.year[0]}-${values.year[1]}`;

  params['rating.kp'] = `${values.rating[0]}-${values.rating[1]}`;

  if (values.genres.length) {
    params['genres.name'] = values.genres;
  }

  return params;
}
