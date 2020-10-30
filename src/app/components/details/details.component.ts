import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailsService } from '../../services/details.service';
import { Stock } from '../../model/Stock';
import * as $ from 'jquery';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  ticker: string;
  stock: Stock;
  articles: [];

  constructor(
    private _Activatedroute: ActivatedRoute,
    private detailsService: DetailsService
  ) {}

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe((params) => {
      this.ticker = params.get('ticker');

      this.detailsService.getLastPrice(this.ticker).subscribe((data) => {
        this.stock = data[0];
        this.stock.change = this.stock.last - this.stock.prevClose;
        this.stock.changePercent =
          (this.stock.change * 100) / this.stock.prevClose;
        this.getDescription();
        //console.log(this.stock);
      });

      this.detailsService.getNews(this.ticker).subscribe((news) => {
        this.articles = news['articles'];
        console.log(this.articles);
      });
    });
  }

  showBoughtBanner(ticker: string) {
    $('#bought').show();
    setTimeout(function () {
      $('#bought').hide();
    }, 5000);
  }

  getDescription() {
    this.detailsService.getDescription(this.ticker).subscribe((description) => {
      if (description) {
        this.stock.name = description['name'];
        this.stock.exchangeCode = description['exchangeCode'];
        this.stock.description = description['description'];
        this.stock.startDate = description['startDate'];
      }
    });
  }
}
