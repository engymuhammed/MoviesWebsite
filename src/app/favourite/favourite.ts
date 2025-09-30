import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favourite',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favourite.html',
  styleUrls: ['./favourite.css']
})
export class Favourite implements OnInit {

  favorites: Movie[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    // جلب الأفلام المفضلة من localStorage
    const saved = localStorage.getItem('favoritesData');
    this.favorites = saved ? JSON.parse(saved) : [];
  }

  toggleFavorite(movie: Movie): void {
    const index = this.favorites.findIndex(m => m.id === movie.id);
    if (index > -1) {
      this.favorites.splice(index, 1);
    } else {
      this.favorites.push(movie);
    }
    localStorage.setItem('favoritesData', JSON.stringify(this.favorites));
  }

  isFavorite(movie: Movie): boolean {
    return this.favorites.some(m => m.id === movie.id);
  }
  goToDetails(movieId: number): void {
    this.router.navigate(['/movie', movieId]);
  }
}
