import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stock } from '../model/Stock';
import { Observable, timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DetailsService {
  rootUrl: string = 'https://stockkr-server.akshayx.xyz/.netlify/functions/api';
  // rootUrl: string = ' http://localhost:8080/api';

  autocompleteUrl: string = this.rootUrl + '/autocomplete?search=';
  detailsUrl: string = this.rootUrl + '/details?ticker=';
  newsUrl: string = this.rootUrl + '/news?ticker=';
  charts1Url: string = this.rootUrl + '/charts_daily?ticker=';
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
    return timer(0, 60000).pipe(
      mergeMap(() => {
        return this.http.get<Stock>(`${this.detailsUrl}${query}`);
      })
    );
  }

  getCharts1(ticker, date) {
    return timer(0, 60000).pipe(
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

  getStockList(stockList) {
    var stockListQuery = '?';
    stockList.forEach((ticker) => {
      stockListQuery += 'ticker=' + ticker + '&';
    });
    stockListQuery = stockListQuery.slice(0, -1);
    console.log(this.stockListUrl + stockListQuery);
    return this.http.get(`${this.stockListUrl}${stockListQuery}`);
  }
}
