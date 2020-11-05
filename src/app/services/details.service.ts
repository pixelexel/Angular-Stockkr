import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stock } from '../model/Stock';
import { Observable, timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DetailsService {
  rootUrl: string = 'http://localhost:8080/api';
  // http://6th78tqqlpa.us-east-1.elasticbeanstalk.com
  // http://localhost:8080

  autocompleteUrl: string = this.rootUrl + '/autocomplete?search=';
  detailsUrl: string = this.rootUrl + '/details?ticker=';
  newsUrl: string = this.rootUrl + '/news?ticker=';
  charts1Url: string = this.rootUrl + '/charts1?ticker=';
  charts2Url: string = this.rootUrl + '/charts2?ticker=';
  stockListUrl: string = this.rootUrl + '/stocklist';

  constructor(private http: HttpClient) {}

  getStocks(query): Observable<Stock[]> {
    return this.http.get<Stock[]>(`${this.autocompleteUrl}${query}`);
  }

  getFirstStockDetails(query): Observable<Stock> {
    return this.http.get<Stock>(`${this.detailsUrl}${query}`);
  }

  getStockDetails(query): Observable<Stock> {
    return timer(0, 15000000000).pipe(
      mergeMap(() => {
        return this.http.get<Stock>(`${this.detailsUrl}${query}`);
      })
    );
  }

  getCharts1(ticker, date) {
    return timer(0, 1500000000).pipe(
      mergeMap(() => {
        return this.http.get(`${this.charts1Url}${ticker}&date=${date}`);
      })
    );
  }

  getNews(query) {
    return this.http.get(`${this.newsUrl}${query}`);
  }

  getCharts2(ticker, date) {
    return this.http.get(`${this.charts2Url}${ticker}&date=${date}`);
  }

  getStockList(stockList): Observable<Stock[]> {
    const headers = { 'content-type': 'application/json' };
    return this.http.post<Stock[]>(this.stockListUrl, stockList, {
      headers: headers,
    });
  }
}
