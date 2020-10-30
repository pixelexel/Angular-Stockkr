import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Stock } from '../model/Stock';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DetailsService {
  detailsUrl: string = 'http://localhost:5000/api/desc?ticker=';
  lastPriceUrl: string = 'http://localhost:5000/api/lastPrice?ticker=';
  newsUrl: string = 'http://localhost:5000/api/news?ticker=';
  charts1Url: string = 'http://localhost:5000/api/charts1?ticker=';
  charts2Url: string = 'http://localhost:5000/api/charts2?ticker=';

  constructor(private http: HttpClient) {}

  getDescription(query): Observable<Stock> {
    return this.http.get<Stock>(`${this.detailsUrl}${query}`);
  }
  getLastPrice(query): Observable<Stock> {
    return this.http.get<Stock>(`${this.lastPriceUrl}${query}`);
  }
  getNews(query) {
    return this.http.get(`${this.newsUrl}${query}`);
  }
  getCharts1(ticker, date) {
    return this.http.get(`${this.charts1Url}${ticker}&date=${date}`);
  }
  getCharts2(ticker, date) {
    return this.http.get(`${this.charts2Url}${ticker}&date=${date}`);
  }
  getWatchlist(query): Observable<Stock> {
    return this.http.get<Stock>(`${this.lastPriceUrl}${query}`);
  }
  getWatchlistName(query): Observable<Stock> {
    return this.http.get<Stock>(`${this.detailsUrl}${query}`);
  }
}
