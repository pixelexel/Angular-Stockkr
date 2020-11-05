import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    var $navItems = $('.nav-item').click(function () {
      $navItems.removeClass('active');
      $(this).addClass('active');
    });
  }
}
