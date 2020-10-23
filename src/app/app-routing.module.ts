import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { SearchboxComponent } from './components/searchbox/searchbox.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';

const routes: Routes = [
  {path: '', component: SearchboxComponent},
  {path: 'watchlist', component: WatchlistComponent},
  {path: 'portfolio', component: PortfolioComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
