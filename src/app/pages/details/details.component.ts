import {Component, OnInit} from '@angular/core';
import {DetailBannerComponent} from '../../components/detail-banner/detail-banner.component';
import {ActivatedRoute} from '@angular/router';
import {GenericHttpService} from '../../services/generic-http.service';
import {Endpoints} from '../../endpoints/endpoints';
import {TVDetailsResult} from '../../interfaces/models/tv-details.interface';
import {Genre, MovieDetailsResult} from '../../interfaces/models/movie-details.interface';
import {DetailBannerConfig} from '../../interfaces/ui-configs/detail-banner-config';
import {MovieRateComponent} from '../../components/movie-rate/movie-rate.component';
import {DetailsConfig} from '../../interfaces/ui-configs/details-config.interface';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  providers: [GenericHttpService],
  imports: [
    DetailBannerComponent,
    MovieRateComponent,
    CommonModule
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute,
              private genericService: GenericHttpService) {
  }

  bannerConfig!: DetailBannerConfig
  config!: DetailsConfig

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: any) => {
      if (paramMap.params.movie_id) {
        this.getMovieById(paramMap.params.movie_id)
      }
      if (paramMap.params.series_id) {
        this.getTVShowById(paramMap.params.series_id)
      }
    })
  }

  getMovieById(id: string) {
      this.genericService.httpGet(Endpoints.MOVIE_ID(id)).subscribe({
        next: (res: MovieDetailsResult) => {
          this.bannerConfig = {
            img: Endpoints.IMAGE_BASE + `/w1280${res.backdrop_path}`,
            pageName: 'Movies',
            path: 'movies',
            title: res.original_title
          }
          let genresResult = ''
          res.genres.map((item: Genre, index: number) => {
            genresResult += `${item.name}${index === res.genres.length - 1 ? '' : ', '}`
          })

          this.config = {
            img: Endpoints.IMAGE_BASE + `/w1280${res.backdrop_path}`,
            subtitle: res.tagline,
            description: res.overview,
            rate: res.vote_average,
            isVertical: true,
            detailsCards: [
              {
                title: 'Type',
                description: 'Movie',
              },
              {
                title: 'Release date',
                description: res.release_date,
              },
              {
                title: 'Run time',
                description: res.runtime.toString(),
              },
              {
                title: 'Genres',
                description: genresResult,
              },
            ],
            details: ''
          }
        },
        error: (err: Error) => {
          console.log(err)
        }
      })
  }
  getTVShowById(id: string) {
    this.genericService.httpGet(Endpoints.TV_SHOW_ID(id)).subscribe({
      next: (res: TVDetailsResult) => {
        this.bannerConfig = {
          img: Endpoints.IMAGE_BASE + `/w1280${res.backdrop_path}`,
          pageName: 'TV Shows',
          path: 'tvshows',
          title: res.name
        }
        let genresResult = ''
        res.genres.map((item: Genre, index: number) => {
          genresResult += `${item.name}${index === res.genres.length - 1 ? '' : ', '}`
        })

        this.config = {
          img: Endpoints.IMAGE_BASE + `/w1280${res.backdrop_path}`,
          subtitle: res.tagline,
          description: res.overview,
          rate: res.vote_average,
          isVertical: false,
          detailsCards: [
            {
              title: 'Type',
              description: 'TV Show',
            },
            {
              title: 'Status',
              description: res.status,
            },
            {
              title: 'First air date',
              description: res.first_air_date,
            },
            {
              title: 'Last air date',
              description: res.last_air_date,
            },
            {
              title: 'Number of seasons',
              description: res.number_of_seasons.toString(),
            },
            {
              title: 'Number of episodes',
              description: res.number_of_episodes.toString(),
            },
            {
              title: 'Episode run time',
              description: res.episode_run_time.toString(),
            },
            {
              title: 'Genres',
              description: genresResult,
            },
          ],
          details: ''
        }
      },
      error: (err: Error) => {
        console.log(err)
      }
    })
  }
}
