import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../services/movie-service';
import { RouterLink, Router } from '@angular/router';
import { FavoriteService } from '../services/favorite.service';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './movie-list.html',
  styleUrls: ['./movie-list.css']
})
export class MovieList implements OnInit {

  @ViewChild('trendingSlider') trendingSlider!: ElementRef;

  movies: Movie[] = [];
  favorites: Movie[] = [];
  recommendedMovies: Movie[] = [];
  trending: Movie[] = [];

  searchQuery: string = '';
  page: number = 1;

  constructor(
    private movieService: MovieService,
    private favoriteService: FavoriteService,
    private router: Router
  ) { }

  // ✅ OnInit واحد فقط
  ngOnInit(): void {
    this.loadMovies();
    this.loadTrending();

    // استرجاع المفضلة من localStorage
    const saved = localStorage.getItem('favoritesData');
    this.favorites = saved ? JSON.parse(saved) as Movie[] : [];
  }

  // 📌 تحميل الأفلام (popular أو search)
  loadMovies(): void {
    const fetch = this.searchQuery.trim() === ''
      ? this.movieService.getMovies('popular', this.page)
      : this.movieService.searchMovies(this.searchQuery, this.page);

    fetch.subscribe((data: any) => {
      this.movies = data.results;

      // جلب توصيات لأول فيلم فقط
      if (this.movies.length > 0) {
        this.loadRecommendedMovies(this.movies[0].id);
      } else {
        this.recommendedMovies = [];
      }
    });
  }

  // 📌 تحميل الأفلام التريند
  loadTrending(): void {
    this.movieService.getTrending().subscribe((data: any) => {
      this.trending = data.results.slice(0, 10); // أول 10 أفلام
      console.log("Trending:", this.trending);
    });
  }

  // 📌 المفضلة
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

  // 📌 البحث
  searchMovies(): void {
    this.page = 1;
    this.loadMovies();
  }

  // 📌 Pagination
  nextPage(): void {
    this.page++;
    this.loadMovies();
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadMovies();
    }
  }

  // 📌 التنقل لتفاصيل الفيلم
  goToDetails(movieId: number): void {
    this.router.navigate(['/movie', movieId]);
  }

  // 📌 التوصيات
  loadRecommendedMovies(movieId: number): void {
    this.movieService.getRecommendedMovies(movieId).subscribe((res: any) => {
      this.recommendedMovies = res.results || [];
    });
  }
    scrollTrending(direction: 'left' | 'right') {
    const slider = this.trendingSlider.nativeElement;
    const scrollAmount = 250; // مقدار التحريك بالبكسل

    if (direction === 'left') {
      slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }
}
