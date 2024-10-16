import {environment} from '../../environments/environment';

export class Endpoints {
  static MOVIES: string = 'discover/movie'
  static MOVIES_TITLE = (params: string) => `search/movie?api_key=${environment.token}&query=${params}`
  static MOVIES_NEXT_PAGE = (page: number) => `search/movie?api_key=${environment.token}&page=${page}`
  static TV_SHOWS: string = 'discover/tv'
  static TV_SHOWS_TITLE = (params: string) => `search/tv?api_key=${environment.token}&query=${params}`
  static MOVIE_ID = (movie_id: string)=> `movie/${movie_id}`
  static TV_SHOW_ID = (series_id: string)=> `tv/${series_id}`
  static TRENDS: string = 'trending/all/day?language=en-US'
  static IMAGE_BASE: string = 'https://image.tmdb.org/t/p'
}
