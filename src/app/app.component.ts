import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'corona';

  countries = [
    'Canada', 
    'United States', 
    'Mexico'
  ];

  constructor(private httpClient: HttpClient) {
     
  }

  selectionChanged(event): void {
    console.log('In selectionChanged.');
    console.log('event passed is', event);
  }
}
