import {Component} from '@angular/core';
import {NavBarComponent} from '../../components/nav-bar/nav-bar.component';
import {SegmentedControlComponent} from '../../components/segmented-control/segmented-control.component';
import {SegmentedControlConfig} from '../../interfaces/ui-configs/segmented-control-config.interface';
import {InputComponent} from '../../components/input/input.component';
import {MovieRateComponent} from '../../components/movie-rate/movie-rate.component';
import {MovieCardComponent} from '../../components/movie-card/movie-card.component';
import {MovieCardConfig} from '../../interfaces/ui-configs/movie-card-config.interface';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [
    NavBarComponent, SegmentedControlComponent, InputComponent, MovieRateComponent, MovieCardComponent
  ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {
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

  movieCards: MovieCardConfig[] = [
    {
      movieName: 'Чужой',
      img: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1704946/14af6019-b2fe-4e1e-bee5-334d9e472d94/300x450',
      rate: 8.14
    },
    {
      movieName: 'Прометей',
      img: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/b4410674-5bfd-4a22-8e6f-92ec2395df96/300x450',
      rate: 7.01
    },
  ]
}
