import {Component, OnInit} from '@angular/core';
import {MovieCardConfig} from '../../interfaces/ui-configs/movie-card-config.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {GenericHttpService} from '../../services/generic-http.service';
import {Endpoints} from '../../endpoints/endpoints';
import {MovieData, MovieResult} from '../../interfaces/models/movies.interface';
import {TVShowData, TVShowResult} from '../../interfaces/models/tvshows.interface';
import {InputComponent} from '../../components/input/input.component';
import {MovieRateComponent} from '../../components/movie-rate/movie-rate.component';
import {MovieCardComponent} from '../../components/movie-card/movie-card.component';

@Component({
  selector: 'app-view-category',
  standalone: true,
  imports: [
    InputComponent,
    MovieRateComponent,
    MovieCardComponent
  ],
  templateUrl: './view-category.component.html',
  styleUrl: './view-category.component.scss'
})
export class ViewCategoryComponent implements OnInit {
  title: string = ''
  cards: MovieCardConfig[] = []

  constructor(private activatedRoute: ActivatedRoute, private router: Router,
              private genericService: GenericHttpService) {
  }

  ngOnInit(): void {
    this.activatedRoute.url.subscribe((res) => {
      this.title = res[0].path.includes('movie') ? 'Movies' : 'TV Shows'
      if (this.title === 'Movies') {
        this.getAll(Endpoints.MOVIES)
      } else if (this.title === 'TV Shows') {
        this.getAll(Endpoints.TV_SHOWS)
      } else {
        this.router.navigateByUrl('')
      }
    })
  }

  getAll(endpoint: string) {
    this.genericService.httpGet(endpoint)
      .subscribe({
        next: (res: MovieData | TVShowData) => {
          this.cards = res.results.map((item: TVShowResult | MovieResult) => {
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
        error: (err: Error) => console.log(err)
      })
  }
}
