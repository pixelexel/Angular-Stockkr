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
  loading = true;

  constructor(private detailsService: DetailsService) {}

  ngOnInit(): void {
    if (
      localStorage.getItem('portfolio_list') !== 'undefined' &&
      localStorage.getItem('portfolio_list') !== null
    ) {
      this.portfolio_list = JSON.parse(localStorage.getItem('portfolio_list'));
      if (this.portfolio_list.length === 0) {
        this.loading = false;
        this.emptyStockList = true;
      } else {
        this.getStockData(this.portfolio_list);
      }
    }
  }

  updatePortfolio() {
    this.portfolio_list = JSON.parse(localStorage.getItem('portfolio_list'));
    if (this.portfolio_list.length === 0) {
      this.emptyStockList = true;
      this.stockList = [];
    } else {
      this.getStockData(this.portfolio_list);
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

  getStockData(portfolio) {
    this.detailsService.getStockList(portfolio).subscribe((stocks) => {
      //Add remaining details for the card
      stocks.forEach((stock) => {
        if (localStorage.getItem(stock.ticker + '_quantity')) {
          stock.my_quantity = Number(
            localStorage.getItem(stock.ticker + '_quantity')
          );

          stock.my_total = Number(
            localStorage.getItem(stock.ticker + '_total')
          );
          stock.my_average = stock.my_total / stock.my_quantity;
          stock.my_change = stock.my_average - stock.last;
        }
      });
      this.stockList = stocks;
      this.loading = false;
    });
  }
}
