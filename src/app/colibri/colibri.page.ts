import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-colibri',
  templateUrl: './colibri.page.html',
  styleUrls: ['./colibri.page.scss'],
})
export class ColibriPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToGuest() {
    this.router.navigate(['/guest']);
  }

}
