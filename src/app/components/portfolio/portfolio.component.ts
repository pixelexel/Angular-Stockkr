import { Component, OnInit } from '@angular/core';
import { DetailsService } from '../../services/details.service';
import { Stock } from '../../model/Stock';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
})
export class PortfolioComponent implements OnInit {
  portfolio_list = new Array();
  stockList: Array<Stock> = [];
  emptyStockList = false;

  constructor(private detailsService: DetailsService) {}

  ngOnInit(): void {
    if (
      localStorage.getItem('portfolio_list') !== 'undefined' &&
      localStorage.getItem('portfolio_list') !== null
    ) {
      this.portfolio_list = JSON.parse(localStorage.getItem('portfolio_list'));
      if (this.portfolio_list.length === 0) {
        this.emptyStockList = true;
      }
      this.portfolio_list.forEach((stockTicker) =>
        this.createCardData(stockTicker)
      );
    }
  }

  // closeCard(ticker) {
  //   this.stockList = this.stockList.filter((stock) => stock.ticker !== ticker);
  //   if (this.stockList.length === 0) {
  //     this.emptyStockList = true;
  //   }
  //   this.portfolio_list = this.portfolio_list.filter(
  //     (stockTicker) => stockTicker !== ticker
  //   );
  //   //remove from list
  //   localStorage.setItem('portfolio_list', JSON.stringify(this.portfolio_list));
  //   //remove specific ticker LS
  //   localStorage.removeItem(ticker);
  // }

  addDetails(stock_info, stockTicker) {
    this.detailsService.getWatchlistName(stockTicker).subscribe((stock) => {
      stock_info.name = stock.name;
      //Add remaining details for the card
      if (localStorage.getItem(stockTicker + '_quantity')) {
        stock_info.my_quantity = Number(
          localStorage.getItem(stockTicker + '_quantity')
        );

        stock_info.my_total = Number(
          localStorage.getItem(stockTicker + '_total')
        );
        stock_info.my_average = stock_info.my_total / stock_info.my_quantity;
        stock_info.my_change = stock_info.my_average - stock_info.last;
      }
      //console.log(stock_info);
      this.stockList.push(stock_info);
    });
  }

  createCardData(stockTicker) {
    let stock_info: Stock;
    this.detailsService.getWatchlist(stockTicker).subscribe((stock) => {
      stock_info = stock[0];
      this.addDetails(stock_info, stockTicker);
    });
  }
}
