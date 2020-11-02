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
  market: boolean = false;
  market_closed: string;

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
    this._Activatedroute.paramMap.subscribe((params) => {
      this.ticker = params.get('ticker');
      this.getStockDetails(this.ticker);

      this.detailsService.getNews(this.ticker).subscribe((news) => {
        this.articles = news['articles'];
        //console.log(this.articles);
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

  getStockDetails(ticker) {
    this.detailsService.getStockDetails(ticker).subscribe((stockDetails) => {
      stockDetails.change = stockDetails.last - stockDetails.prevClose;
      stockDetails.changePercent =
        (stockDetails.change * 100) / stockDetails.prevClose;
      stockDetails.currentDate = this.currentTime();
      this.stock = stockDetails;
      var timestamp = new Date(this.stock.timestamp).getTime();
      var current_time = new Date().getTime();
      if (Math.abs(current_time - timestamp) < 60000) {
        this.market = true;
      } else {
        this.market_closed =
          'Market Closed on ' + this.stock.timestamp.slice(0, 10) + ' 13:00:00';
      }
    });
  }
}

// var time = this.stock.timestamp.slice(11, 16);
// var hours = parseInt(time.slice(0, 2));
// var minutes = parseInt(time.slice(3, 5));
// console.log(hours, minutes);
// if (hours > 9 && hours < 16) {
//   this.market = true;
// }
// if (hours === 9 && minutes >= 30) {
//   this.market = true;
// }
