import { Component, OnInit } from '@angular/core';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { NgForm } from '@angular/forms';
import {DefPortfolioService} from 'src/app/services/def-portfolio.service';
import {Portfolio} from 'src/app/services/portfolio';
import {Symbol} from 'src/app/model/symbol';
import {Instrument} from 'src/app/model/instrument';
import { ThrowStmt } from '@angular/compiler';
import {ApiSymbolsService} from 'src/app/services/api-symbols.service';
import {ApiInstrumentsService} from 'src/app/services/api-instruments.service';
import { IfActiveService } from '@clr/angular/utils/conditional/if-active.service';
import {AuthenticationService} from 'src/app/_services/authentication.service';
import {ApiMyPortfolioService} from 'src/app/services/api-my-portfolio.service';

//import {sound} from 'node_modules/sound-play';


@Component({
  selector: 'app-market-list',
  templateUrl: './market-list.component.html',
  styleUrls: ['./market-list.component.css']
})
export class MarketListComponent implements OnInit {
  // tslint:disable-next-line:ban-types
  symbols: Array<Symbol>;
  // tslint:disable-next-line:ban-types
  selSymbol: Symbol;
  selSymbolCode = 'ALL';
  traderId = 1;
  isAdmin = false;
  instruments: Array<Instrument>;
  selInstrument: Instrument;
  selInstrumentId: number;
  selPortfolioId: number;
  selPosition = 0;
  isModalVisibleRemove = false;
  isInAltert = true;

  //audioObj = new Audio();

  constructor(
    private authenticationService: AuthenticationService,
    private svrSymbols: ApiSymbolsService,
    private svrInstruments: ApiInstrumentsService,
    private svrPortfolio: DefPortfolioService,
    private svrMyPortfolio: ApiMyPortfolioService


  ) {


    this.selSymbolCode = 'ALL';
    if (this.authenticationService.currentUserValue) {
      this.isAdmin = this.authenticationService.currentUserValue.isAdmin;
      this.traderId = this.authenticationService.currentUserValue.trader_id;
    }
   }

   ngOnInit(): void {
     //this.audioObj.src = './assets/ding01.wav';
    //this.audioObj.load();
    //this.audioObj.play();

    this.svrSymbols.getSymbolsCode(0).subscribe((data: any) => {
      this.symbols = data;
      this.selSymbol = this.symbols[0];
      this.GetListInstrument();
    } );
  }
  GetListInstrument(): void
  {
    // tslint:disable-next-line:max-line-length
    this.svrMyPortfolio.getInstrument(this.traderId, this.selSymbolCode).subscribe((data: any) => {
      this.instruments = data;
      this.selInstrument = this.instruments[0];
      this.selInstrumentId = this.selInstrument.instrumentID;
      this.selPortfolioId = this.selInstrument.myPortfolioId;
    });
  }
  onChangeMainTab(akcja){
    // --- Zmiana instrumentu, co z niezapisanym

  }
  onDeleteProduct(){
    this.isModalVisibleRemove = true;
  }
  cancelRemoveLevels(){
    this.isModalVisibleRemove = false;
  }

  akceptRemoveLevels(){
    this.svrMyPortfolio.RemoveFromMyPorfolio(this.selInstrument.myPortfolioId).subscribe((data: any) => {
      this.isModalVisibleRemove = false;
      this.GetListInstrument();
    });
  }


  OnChangeProduct(selected){
    this.selSymbolCode = selected;
    this.selPosition = 0;
    this.GetListInstrument();
  }

  clickOnRow(insSelected){
    if (insSelected !== null) {
      this.selInstrument = insSelected;
    }
  }

  clickOnOffAlert() {
    this.svrMyPortfolio.UpdateMyPorfolioOnOff(this.selInstrument.myPortfolioId, this.selInstrument.active).subscribe((data: any) => {
    });

  }
}
