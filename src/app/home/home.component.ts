import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service'
import {Number} from '../number/number'
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  numbers: Number[] = [];
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    this.dataService.sendGetRequest().pipe(takeUntil(this.destroy$)).subscribe((data: any)=>{
      // console.log(data);
      this.numbers = data;
    })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

}
