import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailsService } from '../../services/details.service';
import * as $ from 'jquery';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

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
  inWatchlist = false;
  closeResult = '';

  constructor(
    private _Activatedroute: ActivatedRoute,
    private detailsService: DetailsService,
    private modalService: NgbModal
  ) {}

  toggleStar() {
    if (this.inWatchlist) {
      localStorage.removeItem(this.ticker);
      $('#add_to_list').hide();
      this.inWatchlist = !this.inWatchlist;
      $('#remove_from_list').show();
      setTimeout(function () {
        $('#remove_from_list').hide();
      }, 5000);
    } else {
      localStorage.setItem(this.ticker, 'true');
      $('#remove_from_list').hide();
      this.inWatchlist = !this.inWatchlist;
      $('#add_to_list').show();
      setTimeout(function () {
        $('#add_to_list').hide();
      }, 5000);
    }
  }

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe((params) => {
      this.ticker = params.get('ticker');

      if (localStorage.getItem(this.ticker)) {
        this.inWatchlist = true;
      }

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

  // let watchlist = localStorage.getItem(this.ticker)
  // if( === 'true'){

  // }
}
