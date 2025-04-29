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
  isAdmin: boolean = true; // ✅ Visible uniquement pour l'admin (toi)

  // ✅ Pagination
  currentPage: number = 1;
  itemsPerPage: number = 20;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getMovies().subscribe({
      next: (data) => this.movies = data,
      error: (err) => console.error('Erreur lors du chargement des films', err)
    });
  }

  // ✅ Getter pour retourner les films affichés sur la page actuelle
  get paginatedMovies(): Movie[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.movies.slice(startIndex, startIndex + this.itemsPerPage);
  }

  // ✅ Getter pour générer la liste des numéros de page
  get totalPagesArray(): number[] {
    const totalPages = Math.ceil(this.movies.length / this.itemsPerPage);
    return Array(totalPages).fill(0).map((_, i) => i + 1);
  }
}
