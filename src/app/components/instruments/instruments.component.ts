import { Component, OnInit, OnDestroy } from '@angular/core';
import {ApiSymbolsService} from 'src/app/services/api-symbols.service';
import {Portfolio} from 'src/app/services/portfolio';
import {Symbol} from 'src/app/model/symbol';
import {Instrument} from 'src/app/model/instrument';
import { ThrowStmt } from '@angular/compiler';
import { NgForm } from '@angular/forms';
import {ApiInstrumentsService} from 'src/app/services/api-instruments.service';
import {DefPortfolioService} from 'src/app/services/def-portfolio.service';
import { IfActiveService } from '@clr/angular/utils/conditional/if-active.service';
import {AuthenticationService} from 'src/app/_services/authentication.service';
import {ApiMyPortfolioService} from 'src/app/services/api-my-portfolio.service';


@Component({
  selector: 'app-instruments',
  templateUrl: './instruments.component.html',
  styleUrls: ['./instruments.component.css']
})
export class InstrumentsComponent implements OnInit {
  // tslint:disable-next-line:ban-types
  symbols: Array<Symbol>;
  instruments: Array<Instrument>;
  portfolios: Array<Portfolio>;
  selInstrument: Instrument;

  // tslint:disable-next-line: ban-types
  selSymbol: Symbol;
  selPortfolio: Portfolio;
  isChenged: boolean;
  errorCode: string;

selPortfolioNo = 0;
selActivityOnly = true;
selSymbolCode: 'ALL';

selSpreed = '1';
selMonth = 'F';
selYear = '20';
selPosition = 0;

isSaved = false;
isAdmin = false;
traderId = 0;

txtMessage = '';
isMessage = false;

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
    this.isChenged = false;
    this.svrPortfolio.getList().subscribe( (data: Array<Portfolio>) => {
      this.portfolios = data;
      this.selPortfolio = this.portfolios.find(elem => elem.active === true);
      this.selPortfolioNo = this.selPortfolio.id;
      this.selPosition = 0;
      this.GetListInstrument();
    } );

    this.svrSymbols.getSymbolsCode(0).subscribe((data: any) => {
      this.symbols = data;
      this.selSymbol = this.symbols[0];
    } );
  }

  GetListInstrument(): void
  {
    this.isChenged = false;
    // tslint:disable-next-line:max-line-length
    this.svrInstruments.getInstrument(this.selPortfolioNo, this.selSymbolCode, this.selActivityOnly, this.traderId).subscribe((data: any) => {
      this.instruments = data;
      if (this.selPosition === 0){
        this.isMessage = false;
        this.txtMessage = '';
        this.selInstrument = this.instruments[0];
      }
      else{
        if (this.selPosition > 0) {
          this.selInstrument = this.instruments.find(ins => ins.instrumentID === this.selPosition);
        }

    }

    } );
  }


  onDetailOpen(akcja){
    if (akcja != null) {
      this.selInstrument.changed = true;
      if (this.isAdmin) {
        this.isChenged = true;
      }
    }
  }

  OnChangePortfolio(selected){
    this.selPortfolioNo = selected;
    this.selPosition = 0;
    this.GetListInstrument();
  }
  OnChangeProduct(selected){
    this.selSymbolCode = selected;
    this.selPosition = 0;
    this.GetListInstrument();
  }
  OnChangeActiviteOnly(selected){
    this.selPosition = 0;
    this.GetListInstrument();

  }


  AddSymbolfilterChanged(selected){
    this.selSymbol = this.symbols.find(sym => sym.code === selected);
  }

  onChangeFirsNotice(){
    this.selInstrument.changed = true;
    this.selInstrument.firstNotice = new Date(this.selInstrument.strFirstNotice);
    this.selInstrument.expiration = new Date(this.selInstrument.strExpiration);

  }
  OnMainSave(){
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.instruments.length; i++ ) {

      if (this.instruments[i].changed){

        this.svrInstruments.updateInstruments(this.instruments[i]).subscribe((id: string) => {
          const _id = parseInt(id);
          this.selInstrument = this.instruments.find(ins => ins.instrumentID === _id);
          this.selInstrument.changed = false;
          this.isSaved = false;
          this.isChenged = false;
        });
    }
  }


  }

  AddMyPortfolio(akcja,insId)
  {
    const xx = insId.instrumentID;
    this.selInstrument = this.instruments.find(ins => ins.instrumentID === xx);

    this.svrMyPortfolio.AddInsMyPorfolio(this.traderId, this.selInstrument.instrumentID).subscribe( (id: string) => {
      const nweid = parseInt(id);
      this.selInstrument.myPortfolioId = nweid;
      });


  }
  newPositionEvent(nrPosition)
  {
    this.selPosition = Number(nrPosition);
    this.GetListInstrument();

  }


}
