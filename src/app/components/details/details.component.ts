import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailsService } from '../../services/details.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  ticker: string;
  tickerTitle: string;
  name: string;
  exchangeCode: string;
  description: string;
  startDate: string;
  highPrice: number;
  lowPrice: number;
  lastPrice: number;
  openPrice: number;
  midPrice: string;
  askPrice: number;
  askSize: number;
  bidPrice: number;
  bidSize: number;
  prevClose: number;
  volume: number;
  change: number;
  changePercent: number;
  timeStamp: string;
  articles: [];

  constructor(
    private _Activatedroute: ActivatedRoute,
    private detailsService: DetailsService
  ) {}

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe((params) => {
      this.ticker = params.get('ticker');

      this.detailsService
        .getDescription(this.ticker)
        .subscribe((description) => {
          this.tickerTitle = description['ticker'];
          this.name = description['name'];
          this.exchangeCode = description['exchangeCode'];
          this.description = description['description'];
          this.startDate = description['startDate'];
        });

      this.detailsService.getLastPrice(this.ticker).subscribe((data) => {
        let prices = data[0];
        this.highPrice = prices['high'];
        this.lowPrice = prices['low'];
        this.openPrice = prices['open'];
        this.prevClose = prices['prevClose'];
        this.midPrice = prices['mid'] ? prices['mid'] : '-';
        this.askPrice = prices['askPrice'];
        this.askSize = prices['askSize'];
        this.bidPrice = prices['bidPrice'];
        this.bidSize = prices['bidSize'];
        this.volume = prices['volume'];
        this.timeStamp = prices['timestamp'];
        this.lastPrice = prices['last'];
        this.change = this.lastPrice - this.prevClose;
        this.changePercent = (this.change * 100) / this.prevClose;
      });

      this.detailsService.getNews(this.ticker).subscribe((news) => {
        this.articles = news['articles'];
        //console.log(this.articles);
      });
    });
  }
}
