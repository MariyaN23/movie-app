import {Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {TestComponent} from './pages/test/test.component';
import {DetailsComponent} from './pages/details/details.component';
import {ViewCategoryComponent} from './pages/view-category/view-category.component';
import {SuggestComponent} from './pages/suggest/suggest.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'test',
    component: TestComponent
  },
  {
    path: 'tvshows/:series_id',
    component: DetailsComponent
  },
  {
    path: 'movie/:movie_id',
    component: DetailsComponent
  },
  {
    path: 'movies',
    component: ViewCategoryComponent
  },
  {
    path: 'tvshows',
    component: ViewCategoryComponent
  },
  {
    path: 'suggestions',
    component: SuggestComponent
  },
];
