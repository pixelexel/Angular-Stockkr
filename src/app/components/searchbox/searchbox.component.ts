import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {debounceTime, tap, finalize, switchMap} from 'rxjs/operators';
import { SearchService} from '../../services/search.service'
import { Stock } from '../../model/Stock';

@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.css']
})

export class SearchboxComponent implements OnInit {

  myControl = new FormControl();
  filteredOptions: Stock[];
  isLoading = false;

  constructor(private searchService: SearchService) {
  }

  ngOnInit() {
    this.myControl.valueChanges
      .pipe(
        debounceTime(1000),
        tap(() => this.isLoading = true)
        )
      .subscribe(value => this.getOptions(value))
  }
  

  private getOptions(value: string) {
    if(value){
      tap(() => this.isLoading = true);
      this.searchService.getStocks(value).subscribe(stocks => {
        this.filteredOptions = stocks;
        console.log(this.filteredOptions)
      });
    }
    this.filteredOptions = [];
    this.isLoading = false;
  }

  displayFn(stock: Stock) {
    if (stock) { return stock.ticker; }
  }

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
