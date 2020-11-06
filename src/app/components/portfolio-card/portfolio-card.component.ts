import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Stock } from 'src/app/model/Stock';

@Component({
  selector: 'app-portfolio-card',
  templateUrl: './portfolio-card.component.html',
  styleUrls: ['./portfolio-card.component.css'],
})
export class PortfolioCardComponent implements OnInit {
  @Input() stock: Stock;
  @Input() market: boolean;
  @Output() notify: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  updatePortfolio() {
    this.notify.emit();
  }
}
