import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { MovieService, Movie } from './services/movie.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, AddMovieComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  movies: Movie[] = [];
  isAdmin: boolean = false;


  private _currentPage = 1;
  itemsPerPage = 20;

  constructor(private movieService: MovieService) {}

  checkAdmin() {
  const password = prompt("Entrez le mot de passe admin :");
  if (password === 'monmotdepasse123') {
    this.isAdmin = true;
  } else {
    alert('Accès refusé');
  }
}


  ngOnInit(): void {
    const savedPage = localStorage.getItem('currentPage');
    this.currentPage = savedPage ? +savedPage : 1;

    this.movieService.getMovies().subscribe({
      next: (data) => this.movies = data,
      error: (err) => console.error('Erreur lors du chargement des films', err)
    });
  }

  get currentPage(): number {
    return this._currentPage;
  }

  set currentPage(value: number) {
    this._currentPage = value;
    localStorage.setItem('currentPage', value.toString());
  }

  get paginatedMovies(): Movie[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.movies.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPagesArray(): number[] {
    const totalPages = Math.ceil(this.movies.length / this.itemsPerPage);
    return Array(totalPages).fill(0).map((_, i) => i + 1);
  }
}
