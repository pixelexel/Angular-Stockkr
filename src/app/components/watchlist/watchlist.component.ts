import { Component, OnInit } from '@angular/core';
import { DetailsService } from '../../services/details.service';
import * as $ from 'jquery';
import { Stock } from '../../model/Stock';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css'],
})
export class WatchlistComponent implements OnInit {
  watchlist = new Array();
  stockList: Array<Stock> = [];

  constructor(private detailsService: DetailsService) {}

  ngOnInit(): void {
    if (
      localStorage.getItem('watchlist') !== 'undefined' &&
      localStorage.getItem('watchlist') !== null
    ) {
      this.watchlist = JSON.parse(localStorage.getItem('watchlist'));
      this.watchlist.forEach((stockTicker) => this.createCardData(stockTicker));
      console.log(this.stockList);
    }
  }

  closeCard(ticker) {
    console.log('yes');
    this.stockList.filter((stock) => stock.ticker !== ticker);
    this.watchlist.filter((stockTicker) => stockTicker !== ticker);
    localStorage.setItem('watchlist', JSON.stringify(this.watchlist));
  }

  getName(stock_info, stockTicker) {
    this.detailsService.getWatchlistName(stockTicker).subscribe((stock) => {
      stock_info.name = stock.name;
      this.stockList.push(stock_info);
    });
  }

  createCardData(stockTicker) {
    let stock_info: Stock;
    this.detailsService.getWatchlist(stockTicker).subscribe((stock) => {
      stock_info = stock[0];
      this.getName(stock_info, stockTicker);
    });
  }
}
