import { Component, OnInit, Input } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css'],
})
export class StarComponent implements OnInit {
  @Input() ticker: string;
  constructor() {}
  inWatchlist = false;
  watchlist = new Array();

  toggleStar() {
    if (this.inWatchlist) {
      //remove from LS
      localStorage.removeItem(this.ticker);
      this.inWatchlist = !this.inWatchlist;
      //handle bars
      $('#add_to_list').hide();
      $('#remove_from_list').show();
      setTimeout(function () {
        $('#remove_from_list').hide();
      }, 5000);
      //remove from watchlist
      this.watchlist = this.watchlist.filter((item) => item !== this.ticker);
    } else {
      //add to LS
      localStorage.setItem(this.ticker, 'true');
      this.inWatchlist = !this.inWatchlist;
      //handle bars
      $('#remove_from_list').hide();
      $('#add_to_list').show();
      setTimeout(function () {
        $('#add_to_list').hide();
      }, 5000);
      //add to watchlist
      this.watchlist.push(this.ticker);
    }
    //store watchlist in LS
    localStorage.setItem('watchlist', JSON.stringify(this.watchlist));
  }

  ngOnInit(): void {
    if (localStorage.getItem(this.ticker)) {
      this.inWatchlist = true;
    }
    if (
      localStorage.getItem('watchlist') !== 'undefined' &&
      localStorage.getItem('watchlist') !== null
    ) {
      console.log(localStorage.getItem('watchlist'));
      this.watchlist = JSON.parse(localStorage.getItem('watchlist'));
      console.log(this.watchlist);
    }
  }
}
