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
        this.getStockList(this.watchlist);
      }
    } else {
      this.loading = false;
      this.emptyStockList = true;
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
      this.getStockList(this.watchlist);
    }

    //LS
    localStorage.setItem('watchlist', JSON.stringify(this.watchlist));
    localStorage.removeItem(ticker);
  }

  getStockList(watchlist) {
    this.detailsService.getStockList(watchlist).subscribe((json) => {
      this.stockList = json['stocks'];
      this.stockList.forEach((stock) => {
        stock.change = stock.last - stock.prevClose;
        this.setMarketColor(stock);
        stock.changePercent = (stock.change * 100) / stock.prevClose;
      });

      this.loading = false;
    });
  }
}
