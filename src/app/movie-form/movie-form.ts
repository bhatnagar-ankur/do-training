import { Component, EventEmitter, Input, OnChanges, Output, SimpleChange } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Movie } from '../../models/movie';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './movie-form.html',
  styleUrl: './movie-form.scss'
})
export class MovieForm implements OnChanges{
  @Input() movie!: Movie;

  @Output() movieAdded = new EventEmitter<Movie>();

  title: string;
  description: string;
  date: string;
  genre: string;
  rating: number;
  language: string;

  constructor(){
    this.title='';
    this.description='';
    this.date='';
    this.genre='';
    this.rating=0;
    this.language='';
  }

  ngOnChanges(changes:SimpleChange):void {
    console.log(changes);
    if(changes['movie'].currentValue){
      this.title=this.movie.title;
    }
  }

  addMovies(){
    // console.log(this.title, this.description,this.date,this.genre,this.rating,this.language);
    if(this.title && this.description && this.date && this.genre && this.rating && this.language){
      const movie:Movie = {
        title: this.title,
        description: this.description,
        date: this.date,
        genre: this.genre,
        rating: this.rating,
        language: this.language
      };
      this.movieAdded.emit(movie);
    }
  }

  updateMovies(){

  }

}
