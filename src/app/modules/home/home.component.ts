import { Component, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

// x(n+1) = rx(n)[1 - x(n)]
export class HomeComponent implements OnInit {

  rate = 1;
  initial = 0.5;
  time = 30;

  // Slider
  maxR = 5;
  minR = 0;
  stepR = 0.01;
  thumbLabel = true;
  maxT = 100;
  minT = 5;
  stepT = 5;


  constructor() { }

  ngOnInit(): void {
  }

  onRateChange(event: MatSliderChange) {
    console.log(event.value);
  }

  onPeriodChange(event: MatSliderChange) {
    console.log(event.value);
  }

}
