import { Component, OnInit } from '@angular/core';
import {interval, timer, Subscription} from 'rxjs';
import {Alerts} from 'src/app/model/alerts';
import {AuthenticationService} from 'src/app/_services/authentication.service';
import {ApiMyPortfolioService} from 'src/app/services/api-my-portfolio.service';
import {Symbol} from 'src/app/model/symbol';
import {ApiSymbolsService} from 'src/app/services/api-symbols.service';
import {Signal} from 'src/app/model/signal.model';
import { isProtractorLocator } from 'protractor/built/locators';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {

isMonitoring: boolean;
isPrcessing: boolean;
isError: boolean;
priorytyOnOff: boolean;
traderId: number;
// tslint:disable-next-line:ban-types
symbols: Array<Symbol>;
// tslint:disable-next-line:ban-types
selSymbol: Symbol;
selSymbolCode: string;
listAlerts: Array<Alerts>;
listCurrentSignal: Array<Signal>;
listSignal: Array<Signal>;
selSignal: Signal;

prevAlert: number;
currAlert: number;
lossAlert: number;

timer = interval(15000);

audioObj = new Audio();

private sub: Subscription;

  count = 0;
  constructor(
    private authenticationService: AuthenticationService,
    private svrSymbols: ApiSymbolsService,
    private svrMyPortfolio: ApiMyPortfolioService
  ) {
    this.traderId = this.authenticationService.currentUserValue.trader_id;
   }

  ngOnInit(): void {
    this.isMonitoring = false;
    this.isMonitoring = true;
    this.prevAlert = this.currAlert;
    this.lossAlert = 0;
    this.isError = false;
    this.priorytyOnOff = true;
    this.isPrcessing = true;
    this.svrSymbols.getSymbolsCode(0).subscribe((data: any) => {
      this.symbols = data;
      this.selSymbol = this.symbols[0];
      this.selSymbolCode = this.selSymbol.code;
      this.GetNoAlerts();
    } );


    this.sub = this.timer.subscribe((n) => {
      if (this.isMonitoring) {
      ++this.count;

      this.GetNoAlerts();
    }
    });
    this.svrMyPortfolio.getSignal(this.traderId).subscribe((datasighist: any) => {
      this.listSignal = datasighist;
      if (this.listSignal.length > 0 ){
        this.selSignal = this.listSignal[0];
      }
    });

  }
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy(){
    // unsubscribe here
    this.sub.unsubscribe();
  }

  GetNoAlerts(): void
  {
    // tslint:disable-next-line:max-line-length
    this.isPrcessing = true;
    this.svrMyPortfolio.getNoAlerts(this.traderId).subscribe((data: any) => {
      this.currAlert = Number(data);
      if (this.currAlert === this.prevAlert){
          ++this.lossAlert;
          if (this.lossAlert > 3){
            this.isError = true;
            this.listAlerts = null;
          }
      }
      else{
        this.isError = false;
        this.lossAlert = 0;
        this.prevAlert = this.currAlert;
        this.isPrcessing = false;
        this.GetAlertsForTrader();
      }

    });
  }

  GetAlertsForTrader(): void
  {

    // tslint:disable-next-line:max-line-length
    this.isPrcessing = true;
    this.svrMyPortfolio.getAlertsForTrader(this.traderId, this.priorytyOnOff, this.selSymbolCode).subscribe((data: any) => {
      this.listAlerts = data;
      this.isPrcessing = false;
      // Czy są sygnały?
      this.svrMyPortfolio.getCurrentSignal(this.traderId).subscribe((datasig: any) => {
        this.listCurrentSignal = datasig;
        if (this.listCurrentSignal.length > 0){  // Pojawiłay się nowe sygnały, trzeba historię pobrać
          this.audioObj.src = './assets/ding01.wav';
          this.audioObj.load();
          this.audioObj.play();

          this.svrMyPortfolio.getSignal(this.traderId).subscribe((datasighist: any) => {
            this.listSignal = datasighist;
          });
        }
      });

    });
  }

  OnChangeProduct(value){
    this.isError = false;
    this.GetAlertsForTrader();
  }

  clickSelSignal(xx){
    this.selSignal = xx;
    if (this.selSignal.newSignal){

      this.svrMyPortfolio.unSetNewSignal(this.traderId, this.selSignal.id).subscribe((d1: any) => {
        this.selSignal.newSignal = false;
      });
    }
  }

}
