import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailsService } from '../../services/details.service';
import { Stock } from '../../model/Stock';
import { News } from '../../model/News';
import * as $ from 'jquery';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  ticker: string;
  stock: Stock;
  articles: News[];
  market: boolean = false;
  market_closed: string;
  loading: boolean = true;
  invalid_ticker: boolean = false;
  color: string;
  marketColor: string;

  constructor(
    private _Activatedroute: ActivatedRoute,
    private detailsService: DetailsService
  ) {}

  showBoughtBanner(ticker: string) {
    $('#bought').show();
    setTimeout(function () {
      $('#bought').hide();
    }, 5000);
  }

  ngOnInit(): void {
    var $navItems = $('.nav-item');
    $navItems.removeClass('active');

    this._Activatedroute.paramMap.subscribe((params) => {
      this.ticker = params.get('ticker');
      this.getFirstStockDetails(this.ticker);

      this.detailsService.getNews(this.ticker).subscribe((news) => {
        this.articles = news['articles'];
      });
    });
  }

  currentTime() {
    var current_date = new Date();
    var formatted =
      current_date.getFullYear() +
      '-' +
      ('0' + String(current_date.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + current_date.getDate()).slice(-2) +
      ' ' +
      ('0' + current_date.getHours()).slice(-2) +
      ':' +
      ('0' + current_date.getMinutes()).slice(-2) +
      ':' +
      ('0' + current_date.getSeconds()).slice(-2);
    return formatted;
  }

  setMarketColor(change) {
    if (change > 0) {
      this.color = 'g';
      this.marketColor = '#297f00';
    } else if (change < 0) {
      this.color = 'r';
      this.marketColor = '#f31100';
    } else {
      this.color = 'b';
      this.marketColor = 'black';
    }
  }

  getStockDetails(ticker) {
    this.detailsService.getStockDetails(ticker).subscribe((stockDetails) => {
      stockDetails.change = stockDetails.last - stockDetails.prevClose;
      this.setMarketColor(stockDetails.change);
      stockDetails.changePercent =
        (stockDetails.change * 100) / stockDetails.prevClose;
      stockDetails.currentDate = this.currentTime();
      this.stock = stockDetails;
      var timestamp = new Date(this.stock.timestamp).getTime();
      var current_time = new Date().getTime();
      if (Math.abs(current_time - timestamp) < 60000) {
        this.market = true;
      } else {
        this.market = false;
        this.market_closed =
          'Market Closed on ' + this.stock.timestamp.slice(0, 10) + ' 13:00:00';
      }
    });
  }

  getFirstStockDetails(ticker) {
    this.detailsService
      .getFirstStockDetails(ticker)
      .subscribe((stockDetails) => {
        if (String(stockDetails) === 'invalid_ticker') {
          this.invalid_ticker = true;
        } else {
          stockDetails.change = stockDetails.last - stockDetails.prevClose;
          this.setMarketColor(stockDetails.change);
          stockDetails.changePercent =
            (stockDetails.change * 100) / stockDetails.prevClose;
          stockDetails.currentDate = this.currentTime();
          this.stock = stockDetails;

          var timestamp = new Date(this.stock.timestamp).getTime();
          var current_time = new Date().getTime();
          if (Math.abs(current_time - timestamp) < 60000) {
            this.market = true;
            this.loading = false;
            this.getStockDetails(ticker);
          } else {
            this.market = false;
            this.market_closed =
              'Market Closed on ' +
              this.stock.timestamp.slice(0, 10) +
              ' 13:00:00';
            this.loading = false;
          }
        }
      });
  }
}
