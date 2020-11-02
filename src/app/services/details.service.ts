import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Stock } from '../model/Stock';
import { Observable, timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DetailsService {
  detailsUrl: string = 'http://localhost:5000/api/details?ticker=';
  newsUrl: string = 'http://localhost:5000/api/news?ticker=';
  charts1Url: string = 'http://localhost:5000/api/charts1?ticker=';
  charts2Url: string = 'http://localhost:5000/api/charts2?ticker=';
  stockListUrl: string = 'http://localhost:5000/api/stocklist?';

  constructor(private http: HttpClient) {}

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
    // return this.http.post<Stock[]>(this.stockListUrl, stockList, {
    //   headers: headers,
    // });
    let params = new HttpParams();
    for (let ticker of stockList) {
      params = params.append('ticker', ticker);
    }
    // const params = new HttpParams().append('param', 'value');
    // params: {
    //   id: JSON.stringify(stockList); // ids is [1, 2, 3, 4]
    // }
    console.log(
      this.http.get<Stock[]>(`${this.stockListUrl}`, {
        headers: headers,
        params: params,
      })
    );
    return this.http.get<Stock[]>(`${this.stockListUrl}`, {
      headers: headers,
      params: params,
    });
  }
}
