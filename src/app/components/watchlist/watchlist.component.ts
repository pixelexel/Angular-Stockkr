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
  loading: boolean = true;

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
      } else {
        this.getStockData(this.watchlist);
      }
    }
  }

  closeCard(ticker) {
    this.stockList = this.stockList.filter((stock) => stock.ticker !== ticker);
    this.watchlist = this.watchlist.filter(
      (stockTicker) => stockTicker !== ticker
    );
    if (this.stockList.length === 0) {
      this.emptyStockList = true;
    } else {
      this.getStockData(this.watchlist);
    }

    //LS
    localStorage.setItem('watchlist', JSON.stringify(this.watchlist));
    localStorage.removeItem(ticker);
  }

  getStockData(watchlist) {
    this.detailsService.getStockList(watchlist).subscribe((stocks) => {
      this.stockList = stocks;
      this.loading = false;
    });
  }
}
