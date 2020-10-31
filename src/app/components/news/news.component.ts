import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent implements OnInit {
  @Input() article;

  constructor(private modalService: NgbModal) {}

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        () => {},
        (reason) => {}
      );
  }

  ngOnInit(): void {
    this.article['twitter_link'] =
      'https://twitter.com/intent/tweet?text=' +
      this.article.title +
      ' ' +
      this.article.url;

    this.article['fb_link'] =
      'https://www.facebook.com/sharer/sharer.php?u=' +
      this.article.url +
      '&amp;src=sdkpreparse';
  }
}
