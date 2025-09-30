import { Routes } from '@angular/router';
import { MovieList } from './movie-list/movie-list';
import { MovieDetails } from './movie-detitls/movie-detitls';
import { Favourite } from './favourite/favourite';
import { Home } from './home/home';
import { LoginComponent } from './login/login';
import { Signup } from './signup/signup';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: '', component: Home, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: Signup },
  { path: 'movie/:id', component: MovieDetails },
  { path: 'favorites', component: Favourite, canActivate: [AuthGuard] },
  { path: 'MovieList', component: MovieList, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];
