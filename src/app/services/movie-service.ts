import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiKey = '18a998ebbc39ada05ea8fed830166965';
  private baseUrl: string = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  // 🔍 فلترة محتوى + Adult
  private filterResults(results: any[]): any[] {
    const badWordRegex = /(sex|porn|nude|xxx|erotic|fetish|18\+|adult|hentai|ecchi|harem)/i;

    return (results || []).filter(item => {
      if (item.adult) return false;
      if (!item.poster_path) return false; 
      const title = (item.title || item.name || '').toString();
      const overview = (item.overview || '').toString();
      if (badWordRegex.test(title) || badWordRegex.test(overview)) return false;
      return true;
    });
  }

  // 📌 الأفلام Discover
  getMovies(category: string, page: number = 1): Observable<any> {
    let sortBy = 'popularity.desc';
    if (category === 'top_rated') sortBy = 'vote_average.desc';
    if (category === 'upcoming') sortBy = 'primary_release_date.desc';

    let params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('language', 'en-US')
      .set('page', page)
      .set('vote_count.gte', '1000')
      .set('vote_average.gte', '6')
      .set('primary_release_date.gte', '2000-01-01')
      .set('certification_country', 'US')
      .set('certification.lte', 'PG-13')
      .set('sort_by', sortBy);

    return this.http
      .get<any>(`${this.baseUrl}/discover/movie`, { params })
      .pipe(
        map(res => ({
          ...res,
          results: this.filterResults(res.results).slice(0, 12)
        }))
      );
  }

  // 🔍 البحث
  searchMovies(query: string, page: number = 1): Observable<any> {
    let params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('language', 'en-US')
      .set('query', query)
      .set('page', page)
      .set('vote_count.gte', '100')
      .set('certification_country', 'US')
      .set('certification.lte', 'PG-13');

    return this.http
      .get<any>(`${this.baseUrl}/search/movie`, { params })
      .pipe(
        map(res => ({
          ...res,
          results: this.filterResults(res.results).slice(0, 12)
        }))
      );
  }

  // 🎬 تفاصيل فيلم
  getMovieDetails(id: string): Observable<any> {
    return this.http
      .get<any>(`${this.baseUrl}/movie/${id}?api_key=${this.apiKey}&language=en-US`)
      .pipe(
        map(movie => {
          if (!movie || movie.adult) return null;
          const title = (movie.title || movie.name || '').toString();
          const overview = (movie.overview || '').toString();
          const badWordRegex = /(sex|porn|nude|xxx|erotic|fetish|18\+|adult|hentai|ecchi|harem)/i;
          if (badWordRegex.test(title) || badWordRegex.test(overview)) return null;
          return movie;
        })
      );
  }

  // ⭐ توصيات فيلم
  getRecommendedMovies(movieId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/${movieId}/recommendations?api_key=${this.apiKey}&language=en-US`)
      .pipe(
        map((res: any) => ({
          ...res,
          results: this.filterResults(res.results)
        }))
      );
  }

  // 🔥 Trending Now (يجيب Top الأفلام اليومية)
  getTrending(time: 'day' | 'week' = 'day'): Observable<any> {
    return this.http
      .get<any>(`${this.baseUrl}/trending/movie/${time}?api_key=${this.apiKey}&language=en-US`)
      .pipe(
        map(res => ({
          ...res,
          results: this.filterResults(res.results).slice(0, 10) // أول 10 أفلام
        }))
      );
  }
}
