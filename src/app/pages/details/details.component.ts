import {Component} from '@angular/core';
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
export class DetailsComponent {
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
      /*if (paramMap.params.series_id) {
        this.getById(paramMap.params.series_id)
      }*/
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
}
