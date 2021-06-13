import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service'
import {Number} from '../number/number'
import { Subject } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  throttle = 0;
  distance = 1;
  page = 1;
  pageSize:number = 50;
  numbers: Number[] | any[] = [];
  term:any="";

  destroy$: Subject<boolean> = new Subject<boolean>();
  
  constructor(private dataService:DataService) {}

  ngOnInit(): void {
    this.dataService
      .sendGetRequest(this.page,this.pageSize)
      .subscribe((numbers: Number[]) => {
        this.numbers = numbers;
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

  onScroll(): void {
    this.dataService
      .sendGetRequest(++this.page,this.pageSize)
      .subscribe((numbers: Number[]) => {
        this.numbers.push(...numbers);
      });
  }
}