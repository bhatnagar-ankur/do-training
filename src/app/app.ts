import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MovieList } from './movie-list/movie-list';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [MovieList, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('movies');
}
