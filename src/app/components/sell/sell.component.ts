import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';
import * as $ from 'jquery';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css'],
})
export class SellComponent implements OnInit {
  @Input() ticker: string;
  @Input() lastPrice: number;
  total: number;
  current_quantity: number;
  current_total: number;
  quantityControl = new FormControl();
  portfolio_list = new Array();

  constructor(private modalService: NgbModal) {}

  removeFromPortfolioList() {
    //get portfolio if exists
    if (
      localStorage.getItem('portfolio_list') !== 'undefined' &&
      localStorage.getItem('portfolio_list') !== null
    ) {
      this.portfolio_list = JSON.parse(localStorage.getItem('portfolio_list'));
    }
    //remove from list
    this.portfolio_list = this.portfolio_list.filter(
      (stockTicker) => stockTicker !== this.ticker
    );
    //save list
    localStorage.setItem('portfolio_list', JSON.stringify(this.portfolio_list));
  }

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        () => {
          if (localStorage.getItem(this.ticker + '_quantity')) {
            this.current_quantity = Number(
              localStorage.getItem(this.ticker + '_quantity')
            );
            this.current_quantity -= this.quantityControl.value;

            this.current_total = Number(
              localStorage.getItem(this.ticker + '_total')
            );
            this.current_total -= this.total;
          }
          //remove from LS, portfolio_list if quantity = 0
          if (this.current_quantity === 0) {
            localStorage.removeItem(this.ticker + '_quantity');
            localStorage.removeItem(this.ticker + '_total');
            this.removeFromPortfolioList();
          } else {
            localStorage.setItem(
              this.ticker + '_quantity',
              String(this.current_quantity)
            );
            localStorage.setItem(
              this.ticker + '_total',
              String(this.current_total)
            );
          }
          this.quantityControl.setValue(this.current_quantity);
        },
        (reason) => {}
      );
  }

  ngOnInit(): void {
    if (localStorage.getItem(this.ticker + '_quantity')) {
      this.current_quantity = Number(
        localStorage.getItem(this.ticker + '_quantity')
      );
      this.quantityControl.setValue(this.current_quantity);
    }
    this.quantityControl.valueChanges.subscribe((value) => {
      if (value <= 0 || value > this.current_quantity) {
        if (value <= 0) {
          this.total = 0;
        } else {
          this.total = value * this.lastPrice;
        }
        $('#sell_form').prop('disabled', true);
      } else {
        this.total = value * this.lastPrice;
        $('#sell_form').removeClass('disabled');
        $('#sell_form').prop('disabled', false);
      }
    });
  }
}
