import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {GenericHttpService} from '../../services/generic-http.service';
import {Endpoints} from '../../endpoints/endpoints';
import {MovieCardConfig} from '../../interfaces/ui-configs/movie-card-config.interface';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  inputText = ''
  searchResult: MovieCardConfig[] = []

  constructor(private activatedRoute: ActivatedRoute, private router: Router,
              private genericService: GenericHttpService) {
  }

  onInputChange() {
    let endpointUrl
    this.activatedRoute.url.subscribe((res) => {
      res[0].path.includes('movies')
        ? (endpointUrl = Endpoints.MOVIES_TITLE(this.inputText))
        : (endpointUrl = Endpoints.TV_SHOWS_TITLE(this.inputText))

      this.genericService.httpGet(endpointUrl).subscribe({
        next: (res: any) => {
          this.searchResult = res.results
          this.sendResult.emit(res.results)
        },
        error: (err: any) => {
          console.log(err)
        }
      })
    })
  }
  @Output() sendResult = new EventEmitter<MovieCardConfig[]>()
}
