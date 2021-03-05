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
import {Levels} from 'src/app/model/levels';
import { treeFeaturesFactory } from '@clr/angular/data/tree-view/tree-features.service';

@Component({
  selector: 'app-levels-def',
  templateUrl: './levels-def.component.html',
  styleUrls: ['./levels-def.component.css']
})
export class LevelsDefComponent implements OnInit {
  symbols: Array<Symbol>;
  instruments: Array<Instrument>;
  portfolios: Array<Portfolio>;
  selInstrument: Instrument;
  selInstrumentId: number;
  selPortfolioId: number;
  saveDescription: string;
  levels: Levels;

    // tslint:disable-next-line: ban-types
    selSymbol: Symbol;
    selSymbolCode: string;
    isChenged: boolean;
    errorCode: string;
    selPosition: number;
    traderId = 1;
    isAdmin: boolean;

    txtSaved = 'disabled';
    isModalVisible = false;
    isModalVisibleRemove = false;
    isEmtyInstruments = false;

  constructor(
    private authenticationService: AuthenticationService,
    private svrSymbols: ApiSymbolsService,
    private svrInstruments: ApiInstrumentsService,
    private svrPortfolio: DefPortfolioService,
    private svrMyPortfolio: ApiMyPortfolioService

    ) {
      this.selSymbolCode = 'ALL';
      this.levels = new Levels();

      if (this.authenticationService.currentUserValue) {
        this.isAdmin = this.authenticationService.currentUserValue.isAdmin;
        this.traderId = this.authenticationService.currentUserValue.trader_id;
      }

     }

  ngOnInit(): void {
    this.svrSymbols.getSymbolsCode(0).subscribe((data: any) => {
      this.symbols = data;
      this.selSymbol = this.symbols[0];
      this.GetListInstrument();
    } );

    }

    GetListInstrument(): void
    {
      this.isChenged = false;
      // tslint:disable-next-line:max-line-length
      this.svrMyPortfolio.getInstrument(this.traderId, this.selSymbolCode).subscribe((data: any) => {
        this.instruments = data;
        this.selInstrument = this.instruments[0];
        this.selInstrumentId = this.selInstrument.instrumentID;
        this.selPortfolioId = this.selInstrument.myPortfolioId;
        this.saveDescription = this.selInstrument.myDescription;
        this.getLevels();

      });
    }

    OnChangeProduct(selected){
      this.selSymbolCode = selected;
      this.selPosition = 0;
      this.GetListInstrument();
    }
    onChangeMainTab(akcja){
      // --- Zmiana instrumentu, co z niezapisanym

      if (this.txtSaved === ''){

        this.isModalVisible = true;

      }
      this.txtSaved = 'disabled';
      this.getLevels();

    }

    getLevels()
    {
      this.svrMyPortfolio.getLevelInstrument(this.traderId, this.selInstrument.instrumentID).subscribe((data: any) => {
        this.levels = data;
        this.isEmtyInstruments = false;
      });
    }

    dataChange()
    {
      this.ValidateValue();

      this.txtSaved = '';
      this.saveDescription = this.selInstrument.myDescription;
      this.selInstrumentId = this.selInstrument.instrumentID;
      this.selPortfolioId = this.selInstrument.myPortfolioId;
      this.saveDescription = this.selInstrument.myDescription;
    }

    RemoveFromMyPortfolio(akcja, instrument){

      this.selInstrument = instrument;
      this.isModalVisibleRemove = true;
    }

    akceptRemoveLevels(){
      this.svrMyPortfolio.RemoveFromMyPorfolio(this.selInstrument.myPortfolioId).subscribe((data: any) => {
        this.isModalVisibleRemove = false;
        this.GetListInstrument();
      });



    }

    cancelRemoveLevels(){
      this.isModalVisibleRemove = false;
  }


  saveLevels(){
    this.isModalVisible = false;
    this.svrMyPortfolio.UpdateMyPorfolio(this.selPortfolioId, this.saveDescription).subscribe((data: any) => {
      this.txtSaved = 'disabled';

      this.svrMyPortfolio.updateLevelInstrument(this.selPortfolioId, this.levels).subscribe((datar: any) => {
        this.txtSaved = 'disabled';
        this.getLevels();
        });

    });
  }

  cancelSaveLevels(){
    this.isModalVisible = false;
  }

  ValidateValue() {

    if (this.levels.valueLevel_1 !== null){
      if (this.levels.valueLevel_1.toString() === '')
        {this.levels.valueLevel_1 = null; }
      else
      { this.levels.valueLevel_1 = Number(this.levels.valueLevel_1.toString().replace(',', '.')); }
    }
    if (isNaN(this.levels.valueLevel_1)) {this.levels.valueLevel_1 = null; }

    if (this.levels.valueLevel_2 !== null){
      if (this.levels.valueLevel_2.toString() === '')
        {this.levels.valueLevel_2 = null; }
      else
      { this.levels.valueLevel_2 = Number(this.levels.valueLevel_2.toString().replace(',', '.')); }
    }
    if (isNaN(this.levels.valueLevel_2)) {this.levels.valueLevel_2 = null; }

    if (this.levels.valueLevel_3 !== null){
      if (this.levels.valueLevel_3.toString() === '')
        {this.levels.valueLevel_3 = null; }
      else
      { this.levels.valueLevel_3 = Number(this.levels.valueLevel_3.toString().replace(',', '.')); }
    }
    if (isNaN(this.levels.valueLevel_3)) {this.levels.valueLevel_3 = null; }


    if (this.levels.valueLevel_4 !== null){
      if (this.levels.valueLevel_4.toString() === '')
        {this.levels.valueLevel_4 = null; }
      else
      { this.levels.valueLevel_4 = Number(this.levels.valueLevel_4.toString().replace(',', '.')); }
    }
    if (isNaN(this.levels.valueLevel_4)) {this.levels.valueLevel_4 = null; }

    if (this.levels.valueLevel_5 !== null){
      if (this.levels.valueLevel_5.toString() === '')
        {this.levels.valueLevel_5 = null; }
      else
      { this.levels.valueLevel_5 = Number(this.levels.valueLevel_5.toString().replace(',', '.')); }
    }
    if (isNaN(this.levels.valueLevel_5)) {this.levels.valueLevel_5 = null; }

    if (this.levels.valueLevel_6 !== null){
      if (this.levels.valueLevel_6.toString() === '')
        {this.levels.valueLevel_6 = null; }
      else
      { this.levels.valueLevel_6 = Number(this.levels.valueLevel_6.toString().replace(',', '.')); }
    }
    if (isNaN(this.levels.valueLevel_6)) {this.levels.valueLevel_6 = null; }

    if (this.levels.valueLevel_7 !== null){
      if (this.levels.valueLevel_7.toString() === '')
        {this.levels.valueLevel_7 = null; }
      else
      { this.levels.valueLevel_7 = Number(this.levels.valueLevel_7.toString().replace(',', '.')); }
    }
    if (isNaN(this.levels.valueLevel_7)) {this.levels.valueLevel_7 = null; }

    if (this.levels.valueLevel_8 !== null){
      if (this.levels.valueLevel_8.toString() === '')
        {this.levels.valueLevel_8 = null; }
      else
      { this.levels.valueLevel_8 = Number(this.levels.valueLevel_8.toString().replace(',', '.')); }
    }
    if (isNaN(this.levels.valueLevel_8)) {this.levels.valueLevel_8 = null; }

    if (this.levels.valueLevel_9 !== null){
      if (this.levels.valueLevel_9.toString() === '')
        {this.levels.valueLevel_9 = null; }
      else
      { this.levels.valueLevel_9 = Number(this.levels.valueLevel_9.toString().replace(',', '.')); }
    }
    if (isNaN(this.levels.valueLevel_9)) {this.levels.valueLevel_9 = null; }

    if (this.levels.valueLevel_10 !== null){
      if (this.levels.valueLevel_10.toString() === '')
        {this.levels.valueLevel_10 = null; }
      else
      { this.levels.valueLevel_10 = Number(this.levels.valueLevel_10.toString().replace(',', '.')); }
    }
    if (isNaN(this.levels.valueLevel_10)) {this.levels.valueLevel_10 = null; }


    if (this.levels.valueLevel_11 !== null){
      if (this.levels.valueLevel_11.toString() === '')
        {this.levels.valueLevel_11 = null; }
      else
      { this.levels.valueLevel_11 = Number(this.levels.valueLevel_11.toString().replace(',', '.')); }
    }
    if (isNaN(this.levels.valueLevel_11)) {this.levels.valueLevel_11 = null; }

    if (this.levels.valueLevel_12 !== null){
      if (this.levels.valueLevel_12.toString() === '')
        {this.levels.valueLevel_12 = null; }
      else
      { this.levels.valueLevel_12 = Number(this.levels.valueLevel_12.toString().replace(',', '.')); }
    }
    if (isNaN(this.levels.valueLevel_12)) {this.levels.valueLevel_12 = null; }

    if (this.levels.valueLevel_13 !== null){
      if (this.levels.valueLevel_13.toString() === '')
        {this.levels.valueLevel_13 = null; }
      else
      { this.levels.valueLevel_13 = Number(this.levels.valueLevel_13.toString().replace(',', '.')); }
    }
    if (isNaN(this.levels.valueLevel_13)) {this.levels.valueLevel_13 = null; }


    if (this.levels.valueLevel_14 !== null){
      if (this.levels.valueLevel_14.toString() === '')
        {this.levels.valueLevel_14 = null; }
      else
      { this.levels.valueLevel_14 = Number(this.levels.valueLevel_14.toString().replace(',', '.')); }
    }
    if (isNaN(this.levels.valueLevel_14)) {this.levels.valueLevel_14 = null; }


    if (this.levels.valueLevel_15 !== null){
      if (this.levels.valueLevel_15.toString() === '')
        {this.levels.valueLevel_15 = null; }
      else
      { this.levels.valueLevel_15 = Number(this.levels.valueLevel_15.toString().replace(',', '.')); }
    }
    if (isNaN(this.levels.valueLevel_15)) {this.levels.valueLevel_15 = null; }

  }
}
