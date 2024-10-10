import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-movie-rate',
  standalone: true,
  imports: [],
  templateUrl: './movie-rate.component.html',
  styleUrl: './movie-rate.component.scss'
})
export class MovieRateComponent implements OnInit {
  @Input() rate: number = 0
  @Input() placeDecimals: number = 0

  actualNumber: string = ''

  ngOnInit(): void {
    this.actualNumber = this.rate.toFixed(this.placeDecimals)
  }
}
