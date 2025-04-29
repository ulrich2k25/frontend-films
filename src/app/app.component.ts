import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // pour *ngFor
import { FormsModule } from '@angular/forms'; // pour [(ngModel)]
import { AddMovieComponent } from './add-movie/add-movie.component'; // ✅
import { MovieService, Movie } from './services/movie.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, AddMovieComponent], // ✅
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  movies: Movie[] = [];
  isAdmin: boolean = true; // ✅ Visible seulement pour l'admin (toi)

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getMovies().subscribe({
      next: (data) => this.movies = data,
      error: (err) => console.error('Erreur lors du chargement des films', err)
    });
  }
}
