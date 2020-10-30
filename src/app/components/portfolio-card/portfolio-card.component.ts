import { Component, Input, OnInit } from '@angular/core';
import { Stock } from 'src/app/model/Stock';

@Component({
  selector: 'app-portfolio-card',
  templateUrl: './portfolio-card.component.html',
  styleUrls: ['./portfolio-card.component.css'],
})
export class PortfolioCardComponent implements OnInit {
  @Input() stock: Stock;

  constructor() {}

  ngOnInit(): void {}

  updatePortfolio(ticker: string) {
    console.log(ticker);
    if (localStorage.getItem(ticker + '_quantity')) {
      this.stock.my_quantity = Number(
        localStorage.getItem(ticker + '_quantity')
      );
      this.stock.my_total = Number(localStorage.getItem(ticker + '_total'));
      this.stock.my_average = this.stock.my_total / this.stock.my_quantity;
      this.stock.my_change = this.stock.my_average - this.stock.last;
    }
  }
}
