import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, tap, finalize, switchMap } from 'rxjs/operators';
import { DetailsService } from '../../services/details.service';
import { Stock } from '../../model/Stock';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.css'],
})
export class SearchboxComponent implements OnInit {
  myControl = new FormControl();
  filteredOptions: Stock[];
  isLoading = false;
  query: Stock;

  constructor(private detailsService: DetailsService, private router: Router) {}

  ngOnInit() {
    this.myControl.valueChanges
      .pipe(
        debounceTime(300),
        tap((value) => {
          if (value) {
            this.isLoading = true;
          }
          this.filteredOptions = [];
        }),
        switchMap((value) =>
          this.detailsService
            .getStocks(value)
            .pipe(finalize(() => (this.isLoading = false)))
        )
      )
      .subscribe((stocks) => (this.filteredOptions = stocks));
  }

  displayFn(stock: Stock) {
    if (stock) {
      return stock.ticker;
    }
  }

  loadDetails(ticker: String) {
    this.router.navigate(['/details', ticker]);
  }

  // private getOptions(value: string) {
  //   if(value){
  //     this.searchService.getStocks(value).subscribe(stocks => {
  //       this.filteredOptions = stocks;
  //       console.log(this.filteredOptions)
  //     });
  //   }
  //
}

// ngOnInit() {
//   this.myControl.valueChanges
//   .pipe(
//       debounceTime(300),
//       tap(()=> this.isLoading = true),
//       switchMap(value=> this.getOptions(value)
//                 .pipe(
//           finalize(()= > this.isLoading = false),
//       )
//       )
//   )
//   .subscribe(stocks=> this.filteredOptions = stocks)
// }

// private getOptions(value: string) {
//   // tap(()= > this.isLoading = true)
//   if(value){
//       // tap(()=> this.isLoading = true)
//       this.searchService.getStocks(value).subscribe(stocks= > {
//           // this.filteredOptions=stocks
//           // console.log(this.filteredOptions)
//           return stocks
//       })
//   }
//   return Stock[[]]
//   // this.isLoading = false
// }

// export class SearchboxComponent implements OnInit {

//   myControl = new FormControl()
//   filteredOptions: Stock[]
//   isLoading = false

//   constructor(private searchService: SearchService) {
//   }

//   ngOnInit() {
//       this.myControl.valueChanges
//       .pipe(
//           debounceTime(1000),
//       )
//       .subscribe(value= > this.getOptions(value))
//   }

//   private getOptions(value: string) {
//       tap(()= > this.isLoading = true)
//       if(value){
//           tap(()=> this.isLoading = true)
//           this.searchService.getStocks(value).subscribe(stocks=> {
//               this.filteredOptions=stocks
//               console.log(this.filteredOptions)
//           })
//       }
//       this.filteredOptions = []
//       this.isLoading = false
//   }

// }

// ngOnInit() {
//   this.myControl.valueChanges
//     .pipe(
//       debounceTime(500),
//       tap(() => {
//         this.isLoading = true;
//         console.log("Cjec kkk")
//       })
//       )
//     .subscribe(value => this.getOptions(value));
//   this.isLoading = false;
// }

// private getOptions(value: string) {
//   if(value){
//     this.searchService.getStocks(value).subscribe(stocks => {
//       this.filteredOptions = stocks;
//       console.log(this.filteredOptions)
//     });
//   }
//   this.filteredOptions = [];
//}
