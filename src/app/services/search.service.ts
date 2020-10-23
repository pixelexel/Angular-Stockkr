import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Stock } from '../model/Stock'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  autocompleteUrl:string = 'http://localhost:5000/api/autocomplete?search=';

  constructor(private http:HttpClient) { }
  
  getStocks(query):Observable<Stock[]> {
    return this.http.get<Stock[]>(`${this.autocompleteUrl}${query}`);   
  }
}
