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
  // Bifurcations
  r = [];
  c = [];

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

  generateChart() {
    this.chartOptions = {
      chart: {
        type: 'line'
      },
      title: {
        text: 'Logistic Model'
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
        text: 'Logistics Model'
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
  
  generateBiFurcations(){
    var i = 0;
    this.r = []; this.c = [];
    for(i = 0; i <= this.rate; i = i + 0.01){
      this.getMeans(this.initial, 100, i);
    }
  }

  getMeans(initial, time, rate){
    var c = []; var t = 0; var i = 0;
    var res = [];
    c[0] =  initial;
    for(t=0; t <= time; t++){
      c[t] = rate * c[t-1] * ( 1 - c[t-1]);
    }
    for(t=0; t <= time; t++){
      for(i=t+1; i <= time; i++){
        if((c[t].toFixed(3)) == c[i].toFixed(3) && (res.indexOf(c[t].toFixed(3)) == -1)) {
          res.push((c[i]).toFixed(3));
          // console.log(res);
        }
      }
    }

  }

  // Callers
  onRateChange(event: MatSliderChange) {
    this.generateCurve();
    // this.generateChart();
    // Generate Bifurcations
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
