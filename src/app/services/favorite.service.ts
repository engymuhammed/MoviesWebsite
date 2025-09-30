import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private favorites: any[] = [];

  addFavorite(movie: any) {
    if (!this.isFavorite(movie)) {
      this.favorites.push(movie);
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
    }
  }

  removeFavorite(movie: any) {
    this.favorites = this.favorites.filter(m => m.id !== movie.id);
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  isFavorite(movie: any): boolean {
    return this.favorites.some(m => m.id === movie.id);
  }

  getFavorites(): any[] {
    const saved = localStorage.getItem('favorites');
    this.favorites = saved ? JSON.parse(saved) : [];
    return this.favorites;
  }
}
