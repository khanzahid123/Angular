import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  goToContactUs(): void
  {
    this._router.navigate(['/ContactUs']);
  }

  
  goToHome(): void
  {
    this._router.navigate(['/Home']);
  }
  
}
