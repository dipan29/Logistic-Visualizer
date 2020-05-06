import { Component, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
HC_exporting(Highcharts);

@Component({
  selector: 'app-bifurcations',
  templateUrl: './bifurcations.component.html',
  styleUrls: ['./bifurcations.component.scss']
})
export class BifurcationsComponent implements OnInit {

  // Main Variables
  rate = 1;
  initial = 0.5;
  time = 25;

  x = [];
  y = [];
  // Bifurcations
  r = [];
  c = []; // eq. concentration
  dataChart2 = [];

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
  chartOptions2: {};
  Highcharts2 = Highcharts;

  constructor() { }

  ngOnInit(): void {
    this.generateCurve();
    this.generateChart();
    this.generateBifurcations();
    this.generateBifurcationChart();

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

  // For EqConc v Rate Chart
  generateBifurcationChart() {
    this.chartOptions2 = {
      chart: {
        type: 'scatter',
        zoomType: 'xy'
      },
      title: {
        text: 'Bifurcations Chart'
      },
      subtitle: {
        text: 'Please change the Rate to see the difference'
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
          text: 'Rate'
        }
      },
      yAxis: {
        title: {
          text: 'Equilibrium Concentration'
        }
      },
      legend: {
        enabled: false
      },
      plotOptions: {
          scatter: {
              marker: {
                  radius: 1,
                  states: {
                      hover: {
                          enabled: true,
                          lineColor: 'rgb(100,100,100)'
                      }
                  }
              },
              states: {
                  hover: {
                      marker: {
                          enabled: false
                      }
                  }
              },
              tooltip: {
                  enabled: false,
              }
          }
      },
      series: [{
        name: 'Bifurcations',
        data: this.dataChart2
      }]
    };
  }

  updateBifurcationChart() {
    this.chartOptions2 = {
      chart: {
        type: 'scatter',
        zoomType: 'xy'
      },
      title: {
        text: 'Bifurcations Chart'
      },
      subtitle: {
        text: 'Rate vs Equilibrium Concentration'
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
          text: 'Rate'
        }
      },
      yAxis: {
        title: {
          text: 'Equilibrium Concentration'
        }
      },
      legend: {
        enabled: false
      },
      plotOptions: {
          scatter: {
              marker: {
                  radius: 1,
                  states: {
                      hover: {
                          enabled: true,
                          lineColor: 'rgb(100,100,100)'
                      }
                  }
              },
              states: {
                  hover: {
                      marker: {
                          enabled: false
                      }
                  }
              },
              tooltip: {
                headerFormat: '{point.x}',
                pointFormat: '{point.y}',
                valueDecimals: 5
              }
          }
      },
      series: [{
        name: 'Bifurcations',
        color: 'rgba(223, 83, 83, .5)',
        data: this.dataChart2
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

  generateBifurcations() {
    this.r = []; this.c = [];
    this.dataChart2 = []; // Reset Values
    var start = 0.00; var increment = 0.001;
    if (this.rate > 4) 
      start = 2.90
    else if (this.rate > 3)
      start = 2.80;
    else if (this.rate > 2)
      start = 0.60;
    else
      start = 0.00;
    for(var rate = start; rate <= this.rate; rate = rate + increment){
      this.r.push(rate.toFixed(5));
      var time = 100;
      if (rate < 2)
        time = 100;
      else if (rate < 3)
        time = 1000;
      else if (rate < 4)
        time = 10000;
      else
        time = 0;
      var concentration = this.getFinalConc(this.initial, rate, time);
      if(concentration > 0) {
        this.c.push(concentration.toFixed(7));
        this.dataChart2.push([rate,concentration]);
      } else {
        this.c.push(concentration);
        this.dataChart2.push([rate,concentration]);
      }
    }
    console.log(this.dataChart2);
    // Draw Chart Function
    this.updateBifurcationChart();
  }
  
  // Callers
  onRateChange(event: MatSliderChange) {
    this.generateCurve();
    // this.generateChart();
    // Generate Bifurcations
    this.generateBifurcations();
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