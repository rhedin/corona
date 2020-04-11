import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { debugOutputAstAsTypeScript } from '@angular/compiler';
import { mapToMapExpression } from '@angular/compiler/src/render3/util';
import '@vaadin/vaadin-combo-box';

// Documentation of the api being used. 
// https://documenter.getpostman.com/view/10808728/SzS8rjbc?version=latest 

interface CountriesResponse {
  Slug: string;
  Country: string;
  ISO2: string;
};

interface CountryResponse {
  "Country":     string;  // "Switzerland"
  "CountryCode": string;  // "CH"
  "Lat":         string;  // "46.82"
  "Lon":         string;  // "8.23"
  "Cases":       number,  // 0 
  "Status":      string;  // "confirmed"
  "Date":        string;  // "2020-01-22T00:00:00Z"
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'corona';

  countries = [
    // {ident: 'canada', name: 'Canada'}, 
    // {ident: 'unitedstates', name: 'United States'}, 
    // {ident:'mexico', name: 'Mexico'}
  ];

  days = [
    // {date:'02/16/2020', numberOfCases: 15},
    // {date: '02/15/2020', numberOfCases: 10}, 
    // {date: '02/14/2020', numberOfCases: 3}, 
  ];

  hasError = false;
  inFlight = false;
  errorType = '';
  errorMessage = '';
  firstRow = '';

  constructor(private httpClient: HttpClient) {
     
  }

  selectionChanged(event: any): void {
    console.log('In selectionChanged.');
    console.log('event passed is', event);
    console.log('event.value', event.value);
    console.log('event.target.value', event.target.value);
    this.hasError = false;
    this.inFlight = true;
    this.days = [];
    this.errorType = '';
    this.errorMessage = '';
    this.firstRow = '';
    this.httpClient
    .get<Array<CountryResponse> >(`https://api.covid19api.com/total/country/${event.target.value}/status/confirmed`)
    .subscribe(data => {
      // console.log('data begin', data, 'data end');
      this.days = data.map(function(elt) {return {date: elt.Date.substr(0, 10), numberOfCases: elt.Cases};});
      this.days.sort( (a,b) => a.date < b.date ? -1 : 1);
      // console.log('days begin', this.days, 'days end');
      this.hasError = false;
      this.inFlight = false;
      this.firstRow = JSON.stringify(data[0]);
    },
    error => {
      if (error.error instanceof ErrorEvent) {
        this.errorType = 'Network error.';
        this.errorMessage = error.error;
      } else {
        this.errorType = 'Bad response code.';
        this.errorMessage = error.status;
      }
      this.hasError = true;
      this.inFlight = false;
    });
  }

  ngOnInit() {
    this.httpClient
    .get<Array<CountriesResponse> >('https://api.covid19api.com/countries')
    .subscribe(data => {
      // console.log('data begin', data, 'data end');
      this.countries = data.map(function(elt) {return {ident: elt.Slug, name: elt.Country};});
      this.countries.sort( (a,b) => a.name < b.name ? -1 : 1);
      // console.log('countries begin', this.countries, 'countries end');
    });
  }
}
