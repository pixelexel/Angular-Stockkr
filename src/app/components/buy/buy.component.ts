import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';
import * as $ from 'jquery';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css'],
})
export class BuyComponent implements OnInit {
  @Input() ticker: string;
  @Input() last: number;
  @Input() primary: boolean = false;
  @Input() market: boolean;
  @Output() notify: EventEmitter<string> = new EventEmitter<string>();
  total: number = 0.0;
  current_quantity: number;
  current_total: number;
  quantityControl = new FormControl();
  portfolio_list = new Array();

  constructor(private modalService: NgbModal) {}

  addToPortfolioList() {
    //get portfolio list if exists
    if (
      localStorage.getItem('portfolio_list') !== 'undefined' &&
      localStorage.getItem('portfolio_list') !== null
    ) {
      this.portfolio_list = JSON.parse(localStorage.getItem('portfolio_list'));
    }
    //adding new stock to portfolio
    this.portfolio_list.push(this.ticker);
    //store portfolio_list in LS
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
            this.current_quantity += this.quantityControl.value;

            this.current_total = Number(
              localStorage.getItem(this.ticker + '_total')
            );
            this.current_total += this.total;
          } else {
            this.current_quantity = this.quantityControl.value;
            this.current_total = this.total;
            //adding new stock to portfolio
            this.addToPortfolioList();
          }
          localStorage.setItem(
            this.ticker + '_quantity',
            String(this.current_quantity)
          );
          localStorage.setItem(
            this.ticker + '_total',
            String(this.current_total)
          );

          this.notify.emit(null);
          this.quantityControl.setValue(0);
        },
        (reason) => {
          this.quantityControl.setValue(0);
        }
      );
  }

  ngOnInit(): void {
    this.quantityControl.setValue(0);
    this.quantityControl.valueChanges.subscribe((value) => {
      if (localStorage.getItem(this.ticker + '_quantity')) {
        this.current_quantity = Number(
          localStorage.getItem(this.ticker + '_quantity')
        );
      }
      if (value <= 0) {
        this.total = 0;
        $('#buy_form').prop('disabled', true);
      } else {
        this.total = value * this.last;
        $('#buy_form').removeClass('disabled');
        $('#buy_form').prop('disabled', false);
      }
    });
  }
}
