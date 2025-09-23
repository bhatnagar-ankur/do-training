import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-movie-profile',
  imports: [],
  templateUrl: './movie-profile.html',
  styleUrl: './movie-profile.scss'
})
export class MovieProfile {

   @Input() movie!: Movie;
   @Output() delete=new EventEmitter<number>();
   @Output() sendMovie = new EventEmitter<Movie>();

   onEditMovie(){
    this.sendMovie.emit(this.movie)
   }

   onDeleteMovie(){
    this.delete.emit(this.movie.id);

   }

}
