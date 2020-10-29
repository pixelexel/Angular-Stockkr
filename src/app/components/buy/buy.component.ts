import { Component, OnInit, Input } from '@angular/core';
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
  @Input() lastPrice: number;
  total: number = 0.0;
  current_quantity: number;
  current_total: number;
  quantityControl = new FormControl();

  constructor(private modalService: NgbModal) {}

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
          }
          localStorage.setItem(
            this.ticker + '_quantity',
            String(this.current_quantity)
          );
          localStorage.setItem(
            this.ticker + '_total',
            String(this.current_total)
          );
          console.log(localStorage.getItem(this.ticker + '_quantity'));
          console.log(localStorage.getItem(this.ticker + '_total'));
          this.quantityControl.setValue(0);
        },
        (reason) => {}
      );
  }

  ngOnInit(): void {
    this.quantityControl.setValue(0);
    this.quantityControl.valueChanges.subscribe((value) => {
      if (value <= 0) {
        this.total = 0;
        $('#buy_form').prop('disabled', true);
      } else {
        this.total = value * this.lastPrice;
        $('#buy_form').removeClass('disabled');
        $('#buy_form').prop('disabled', false);
      }
    });
  }
}
