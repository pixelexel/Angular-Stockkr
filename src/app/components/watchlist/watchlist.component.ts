import { Component, OnInit } from '@angular/core';
import { DetailsService } from '../../services/details.service';
import { Stock } from '../../model/Stock';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css'],
})
export class WatchlistComponent implements OnInit {
  watchlist = new Array();
  stockList: Array<Stock> = [];
  emptyStockList = false;

  constructor(private detailsService: DetailsService) {}

  ngOnInit(): void {
    //localStorage.removeItem('watchlist');
    if (
      localStorage.getItem('watchlist') !== 'undefined' &&
      localStorage.getItem('watchlist') !== null
    ) {
      this.watchlist = JSON.parse(localStorage.getItem('watchlist'));
      if (this.watchlist.length === 0) {
        this.emptyStockList = true;
      }
      this.watchlist.forEach((stockTicker) => this.createCardData(stockTicker));
    }
  }

  closeCard(ticker) {
    this.stockList = this.stockList.filter((stock) => stock.ticker !== ticker);
    if (this.stockList.length === 0) {
      this.emptyStockList = true;
    }
    this.watchlist = this.watchlist.filter(
      (stockTicker) => stockTicker !== ticker
    );
    //remove from list
    localStorage.setItem('watchlist', JSON.stringify(this.watchlist));
    //remove specific ticker LS
    localStorage.removeItem(ticker);
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
