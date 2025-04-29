import { Component } from '@angular/core';
import { MovieService, Movie } from '../services/movie.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent {

  constructor(private movieService: MovieService) {}

  addMovie(event: Event) {
    event.preventDefault(); // important pour ne pas recharger la page

    const target = event.target as HTMLFormElement | null;

    if (!target) {
      console.error('Le formulaire est introuvable.');
      return;
    }

    const title = (target.elements.namedItem('title') as HTMLInputElement).value;
    const img = (target.elements.namedItem('img') as HTMLInputElement).value;
    const telegram = (target.elements.namedItem('telegram') as HTMLInputElement).value;

    const newMovie: Movie = { title, img, telegram };

    this.movieService.addMovie(newMovie).subscribe({
      next: () => {
        alert('Film ajouté avec succès !');
        target.reset();
      },
      error: () => alert('Erreur lors de l\'ajout du film.')
    });
  }
}
