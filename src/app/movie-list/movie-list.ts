import { Component } from '@angular/core';
import { MovieForm } from '../movie-form/movie-form';
import { MovieProfile } from '../movie-profile/movie-profile';
import { MovieDetails } from '../movie-details/movie-details';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-movie-list',
  imports: [MovieForm, MovieProfile, MovieDetails],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.scss'
})
export class MovieList {
  movieList: Movie[] = [];
  selectedMovie?: Movie;
  constructor() {

  }

  onGetMovies(movie: Movie) {
    movie.id = this.movieList.length + 1;
    movie.imgUrl = `${movie.id}.jpg`;
    this.movieList.push(movie);
    console.log(this.movieList);
  }

  onDelete(id: number) {
    const index = this.movieList.findIndex(movie => {
      return movie.id === id;
    });
    this.movieList.splice(index, 1);
  }
  onSelectMovie(movie: Movie) {
    this.selectedMovie = movie;
  }
}
