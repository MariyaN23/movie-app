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
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-view-category',
  standalone: true,
  imports: [
    InputComponent,
    MovieRateComponent,
    MovieCardComponent,
    NgIf
  ],
  templateUrl: './view-category.component.html',
  styleUrl: './view-category.component.scss'
})
export class ViewCategoryComponent implements OnInit {
  title: string = ''
  message: string = ''
  cards: MovieCardConfig[] = []
  currentPage: number = 1

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

  showCards(cardsData: any) {
    this.cards = cardsData.map((item: TVShowResult | MovieResult) => {
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
  }

  getAll(endpoint: string) {
    this.genericService.httpGet(endpoint)
      .subscribe({
        next: (res: MovieData | TVShowData) => {
          const cardsData = res.results
          this.showCards(cardsData)
        },
        error: (err: Error) => console.log(err)
      })
  }

  setSearchResult(result: MovieCardConfig[]) {
    this.cards = result
    if (result.length) {
      this.showCards(result)
    } else if (!result.length) {
      this.message = 'No results'
    }
    /*(this.title === 'Movies')
      ? this.getAll(Endpoints.MOVIES)
      : this.getAll(Endpoints.TV_SHOWS)*/
  }
}
