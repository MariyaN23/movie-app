import {Component, OnInit} from '@angular/core';
import {InputComponent} from '../../components/input/input.component';
import {MovieCardComponent} from '../../components/movie-card/movie-card.component';
import {GenericHttpService} from '../../services/generic-http.service';
import {Endpoints} from '../../endpoints/endpoints';
import {TrendData, TrendResult} from '../../interfaces/models/trends.interface';
import {MovieCardConfig} from '../../interfaces/ui-configs/movie-card-config.interface';
import {SegmentedControlComponent} from '../../components/segmented-control/segmented-control.component';
import {SegmentedControlConfig} from '../../interfaces/ui-configs/segmented-control-config.interface';
import {Router} from '@angular/router';
import {MovieData, MovieResult} from '../../interfaces/models/movies.interface';
import {TVShowData, TVShowResult} from '../../interfaces/models/tvshows.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    InputComponent,
    MovieCardComponent,
    SegmentedControlComponent
  ],
  providers: [GenericHttpService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  title: string = 'All'
  movieCards: MovieCardConfig[] = []
  segments: SegmentedControlConfig[] = [
    {
      name: 'All',
      active: true
    },
    {
      name: 'Movies',
      active: false
    },
    {
      name: 'TV Shows',
      active: false
    },
  ]

  constructor(private genericHttpService: GenericHttpService, private router: Router) {
  }

  ngOnInit(): void {
    this.segments.map((item: SegmentedControlConfig) => (
      item.onClick = () => {
        this.title = item.name
        if (item.name === 'Movies') {
          this.getShows(Endpoints.MOVIES)
        }
        if (item.name === 'TV Shows') {
          this.getShows(Endpoints.TV_SHOWS)
        }
        if (item.name === 'All') {
          this.getShows(Endpoints.TRENDS)
        }
      }
    ))
    this.getShows(Endpoints.TRENDS)
  }

  getShows(endpoint: string) {
    this.genericHttpService.httpGet(endpoint).subscribe({
      next: (res: TrendData | MovieData | TVShowData) => {
        this.movieCards = res.results.map((item: TrendResult | MovieResult | TVShowResult) => {
          return {
            img: `${Endpoints.IMAGE_BASE}/w500/${item.backdrop_path}`,
            movieName: 'original_title' in item ? item.original_title : item.original_name,
            rate: item.vote_average,
            onClick: () => {
              if ('first_air_date' in item) {
                this.router.navigateByUrl(`tvshows/${item.id}`)
              } else {
                this.router.navigateByUrl(`movie/${item.id}`)
              }
            }
          } as MovieCardConfig
        })
      },
      error: (error: any) => console.log(error)
    })
  }
}
