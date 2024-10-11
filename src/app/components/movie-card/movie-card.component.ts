import {Component, Input} from '@angular/core';
import {MovieCardConfig} from '../../interfaces/ui-configs/movie-card-config.interface';
import {MovieRateComponent} from '../movie-rate/movie-rate.component';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [
    MovieRateComponent
  ],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent {
  @Input() config!: MovieCardConfig
}
