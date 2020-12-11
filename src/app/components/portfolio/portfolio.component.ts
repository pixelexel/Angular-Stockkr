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
  market: boolean;

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
        this.getStockList(this.portfolio_list);
      }
    } else {
      this.loading = false;
      this.emptyStockList = true;
    }
  }

  updatePortfolio() {
    this.portfolio_list = JSON.parse(localStorage.getItem('portfolio_list'));
    if (this.portfolio_list.length === 0) {
      this.emptyStockList = true;
      this.stockList = [];
    } else {
      this.getStockList(this.portfolio_list);
    }
  }

  setMarketColor(stock) {
    if (stock.my_change > 0) {
      if (stock.my_change > 0.0000001) {
        stock.color = 'g';
        stock.marketColor = '#297f00';
      } else {
        stock.color = 'b';
        stock.marketColor = 'black';
      }
    } else if (stock.my_change < 0) {
      if (stock.my_change < -0.0000001) {
        stock.color = 'r';
        stock.marketColor = '#f31100';
      } else {
        stock.color = 'b';
        stock.marketColor = 'black';
      }
    } else {
      stock.color = 'b';
      stock.marketColor = 'black';
    }
  }

  getStockList(portfolio) {
    this.detailsService.getStockList(portfolio).subscribe((json) => {
      //Add remaining details for the card
      this.stockList = json['stocks'];
      this.stockList.forEach((stock) => {
        if (localStorage.getItem(stock.ticker + '_quantity')) {
          stock.my_quantity = Number(
            localStorage.getItem(stock.ticker + '_quantity')
          );

          stock.my_total = Number(
            localStorage.getItem(stock.ticker + '_total')
          );
          stock.my_average = stock.my_total / stock.my_quantity;
          stock.my_change = stock.last - stock.my_average;
          stock.my_market_value = stock.last * stock.my_quantity;
          this.setMarketColor(stock);
        }
      });
      this.loading = false;
    });
  }
}
