import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Movie {
  id?: number;         // optionnel
  title: string;
  img: string;
  telegram: string;
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'https://stream-telegram-production.up.railway.app/api/movies'; // 🔁 ton backend Railway

  constructor(private http: HttpClient) {}

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiUrl);
  }

  addMovie(movie: Movie): Observable<Movie> {
    const movieData = {
      title: movie.title,
      img: movie.img,
      telegram: movie.telegram
    };
    return this.http.post<Movie>(this.apiUrl, movieData);
  }
}

