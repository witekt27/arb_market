import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {LogOutComponent} from 'src/app/components/log-out/log-out.component';
import {PortfolioDefComponent} from './components/portfolio-def/portfolio-def.component';
import {LevelsDefComponent} from './components/levels-def/levels-def.component';
import {InstrumentListComponent} from 'src/app/components/instrument-list/instrument-list.component';
import {InstrumentsComponent} from 'src/app/components/instruments/instruments.component';
import {AlertsComponent} from 'src/app/components/alerts/alerts.component';

import {MarketListComponent} from 'src/app/components/market-list/market-list.component';



const routes: Routes = [
  {path: 'portfolio', component: PortfolioDefComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogOutComponent},
  {path: 'instruments', component: InstrumentsComponent},
  {path: 'alert', component: AlertsComponent},
  {path: 'market', component: MarketListComponent},
  {path: 'levels', component: LevelsDefComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
