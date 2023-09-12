import { Component, OnInit } from '@angular/core';
import { globalData } from '../globalData';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit{
  

  
  constructor(){}
  
  printData(){
    // console.log(localStorage.getItem('globalData'))
   }


   ngOnInit(): void {
       this.printData()
   }

}
