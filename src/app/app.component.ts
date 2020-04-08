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
    {ident: 'canada', name: 'Canada'}, 
    {ident: 'unitedstates', name: 'United States'}, 
    {ident:'mexico', name: 'Mexico'}
  ];

  days = [
    {date:'02/16/2020', numberOfCases: 15},
    {date: '02/15/2020', numberOfCases: 10}, 
    {date: '02/14/2020', numberOfCases: 3}, 
  ];

  constructor(private httpClient: HttpClient) {
     
  }

  selectionChanged(event: any): void {
    console.log('In selectionChanged.');
    console.log('event passed is', event);
    console.log('event.value', event.value);
    console.log('event.target.value', event.target.value);
  }
}
