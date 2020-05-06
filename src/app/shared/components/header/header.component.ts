import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  about(){
    this.router.navigateByUrl('/about');
  }

  home(){
    this.router.navigateByUrl('/');
  }

  bifurcations(){
    this.router.navigateByUrl('/bifurcations');
  }

  github(){
    window.open('https://github.com/dipan29/Logistic-Visualizer/', "_blank");
    // this.router.navigateByUrl('https://github.com/dipan29/Logistic-Visualizer/');
  }

}
