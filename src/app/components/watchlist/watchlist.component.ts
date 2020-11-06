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
        this.loading = false;
        this.emptyStockList = true;
      } else {
        this.getStockData(this.watchlist);
      }
    }
  }

  setMarketColor(stock) {
    if (stock.change > 0) {
      stock.color = 'g';
      stock.marketColor = '#297f00';
    } else if (stock.change < 0) {
      stock.color = 'r';
      stock.marketColor = '#f31100';
    } else {
      stock.color = 'b';
      stock.marketColor = 'black';
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
      console.log('stocks');
      stocks.forEach((stock) => {
        stock.change = stock.last - stock.prevClose;
        this.setMarketColor(stock);
        stock.changePercent = (stock.change * 100) / stock.prevClose;
      });

      this.stockList = stocks;
      this.loading = false;
    });
  }
}
