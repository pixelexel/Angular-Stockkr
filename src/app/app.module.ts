import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { HighchartsChartModule } from 'highcharts-angular';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavComponent } from './components/nav/nav.component';
import { SearchboxComponent } from './components/searchbox/searchbox.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetailsComponent } from './components/details/details.component';
import { NewsComponent } from './components/news/news.component';
import { DetailschartComponent } from './components/detailschart/detailschart.component';
import { ChartComponent } from './components/chart/chart.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SearchboxComponent,
    WatchlistComponent,
    PortfolioComponent,
    DetailsComponent,
    NewsComponent,
    DetailschartComponent,
    ChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatTabsModule,
    HighchartsChartModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
