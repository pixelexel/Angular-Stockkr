import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css'],
})
export class WatchlistComponent implements OnInit {
  watchlist = new Array();

  constructor() {}

  ngOnInit(): void {
    if (localStorage.getItem('watchlist') !== 'undefined') {
      this.watchlist = JSON.parse(localStorage.getItem('watchlist'));
      console.log(this.watchlist);
    }

    $('button').on('click', function () {
      $(this).closest('.card').fadeOut();
    });
  }
}
