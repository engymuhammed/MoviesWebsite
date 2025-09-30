import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';   // ⬅️ استدعاء CommonModule
import { MovieService } from '../services/movie-service';

@Component({
  selector: 'app-home',
  standalone: true, // ⬅️ مهم
  imports: [CommonModule,RouterLink], // ⬅️ هنا ضيف CommonModule
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  trending: any[] = [];

  @ViewChild('trendingSlider', { static: false }) trendingSlider!: ElementRef;

  constructor(private movieService: MovieService, private router: Router) {}

  ngOnInit(): void {
    this.loadTrending();
  }

  loadTrending() {
    this.movieService.getTrending('day').subscribe((res: any) => {
      this.trending = res.results;
    });
  }

  scrollTrending(direction: 'left' | 'right') {
    const scrollAmount = 300;
    if (this.trendingSlider) {
      if (direction === 'left') {
        this.trendingSlider.nativeElement.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        this.trendingSlider.nativeElement.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  }

  goToDetails(id: number) {
    this.router.navigate(['/movie', id]);
  }
}
