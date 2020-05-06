import { Component, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
HC_exporting(Highcharts);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

// x(n+1) = rx(n)[1 - x(n)]
export class HomeComponent implements OnInit {

  // Main Variables
  rate = 1;
  initial = 0.5;
  time = 25;

  x = [];
  y = [];

  // Slider
  maxR = 5;
  minR = 0;
  stepR = 0.01;
  thumbLabel = true;
  maxT = 100;
  minT = 5;
  stepT = 5;

  //Charts
  chartOptions: {};
  Highcharts = Highcharts;

  constructor() { }

  ngOnInit(): void {
    this.generateCurve();
    this.generateChart();

    HC_exporting(Highcharts);
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  // For Conc v Time Chart
  generateChart() {
    this.chartOptions = {
      chart: {
        type: 'line'
      },
      title: {
        text: 'Logistic Map'
      },
      subtitle: {
        text: 'Please change any value to see the difference'
      },
      tooltip: {
        split: true,
      },
      credits: {
        text: '(C) Dipan Roy | All Rights Reserved',
        href: 'https://www.DipanRoy.com'
      },
      exporting: {
        enabled: true,
      },
      xAxis: {
        title: {
          text: 'Time (in Years)'
        }
      },
      yAxis: {
        title: {
          text: 'Concentration (in Millions)'
        }
      },
      legend: {
        enabled: false
      },
      series: [{
        name: 'Concentration',
        data: this.y
      }]
    };
  }

  updateChart(y) {
    this.chartOptions = {
      chart: {
        type: 'line'
      },
      title: {
        text: 'Logistic Map'
      },
      subtitle: {
        text: 'Concentration vs Time'
      },
      tooltip: {
        split: true,
      },
      credits: {
        text: '(C) Dipan Roy | All Rights Reserved',
        href: 'https://www.DipanRoy.com'
      },
      exporting: {
        enabled: true,
      },
      xAxis: {
        title: {
          text: 'Time (in Years)'
        }
      },
      yAxis: {
        title: {
          text: 'Concentration (in Millions)'
        }
      },
      legend: {
        enabled: false
      },
      series: [{
        name: 'Concentration',
        data: y
      }]
    };
  }


  // Required Functions
  getFinalConc(initial, rate, time) {
    var concentration = initial;
    var fineTune = this.getRandomInt(10);
    for(var i = 1; i <= time + fineTune; i++){
      concentration = concentration * rate * (1 - concentration);
    }
    if(concentration < 0.00001 && initial < 2)
      return 0;
    else
      return concentration;
  }

  // Generate Curves
  generateCurve() {
    var i = 0;
    this.y = [];
    this.x = [];
    this.y[0] = this.initial;
    this.x[0] = 0;
    for(i = 1; i <= this.time; i++){
      var old = i - 1;
      this.x[i] = i;
      this.y[i] = this.rate * this.y[old] * (1 - this.y[old]);
    }
    // console.log(this.y);
  }

  
  // Callers
  onRateChange(event: MatSliderChange) {
    this.generateCurve();
    // this.generateChart();
    // Generate Bifurcations
    // this.generateBifurcations();
    this.updateChart(this.y);
  }

  onPeriodChange(event: MatSliderChange) {
    this.generateCurve();
    // this.generateChart();
    this.updateChart(this.y);
  }

  onInitialChange(event){
    this.generateCurve();
    // this.generateChart();
    this.updateChart(this.y);
  }

}
