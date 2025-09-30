import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, DecimalPipe } from '@angular/common';
import { MovieService } from '../services/movie-service';
import { Movie } from '../models/movie.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './movie-detitls.html',
  styleUrls: ['./movie-detitls.css']
})
export class MovieDetails implements OnInit {
  movieId!: number;
  movie!: Movie | null;
  recommendedMovies: Movie[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
    this.movieId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadMovieDetails();
    this.loadRecommendations();
  }

  loadMovieDetails(): void {
    this.movieService.getMovieDetails(String(this.movieId)).subscribe(res => {
      this.movie = res;
    });
  }

  loadRecommendations(): void {
    this.movieService.getRecommendedMovies(this.movieId).subscribe(res => {
      this.recommendedMovies = res.results || [];
    });
  }

  goToDetails(movieId: number): void {
    this.router.navigate(['/movie', movieId]).then(() => {
      // بعد التنقل نعيد تحميل التفاصيل والتوصيات للفيلم الجديد
      this.movieId = movieId;
      this.loadMovieDetails();
      this.loadRecommendations();
    });
  }


}
