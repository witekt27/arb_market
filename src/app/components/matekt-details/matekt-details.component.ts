import { Component, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges} from '@angular/core';
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
import { treeFeaturesFactory } from '@clr/angular/data/tree-view/tree-features.service';

import {UploadService} from 'src/app/_services/upload.service';
import {Levels} from 'src/app/model/levels';


@Component({
  selector: 'app-matekt-details',
  templateUrl: './matekt-details.component.html',
  styleUrls: ['./matekt-details.component.css']

})
export class MatektDetailsComponent implements OnChanges {

  @Input() selInstrument: Instrument;

   shortLink = '';
   loading = false; // Flag variable
   file: File = null; // Variable to store file
   fileDestnation = '';
   levels: Levels;
   traderId = 0;
   isAdmin = false;
   isEmtyInstruments = false;

   isModalVisibleLevel = false;

   txtLevelDescription = '';
   txtLevelValue = '';
   txtTemp = '';
   txtSaved = 'disabled';
   numLevelEdit = 0;

  constructor(
    private authenticationService: AuthenticationService,
    private svrMyPortfolio: ApiMyPortfolioService,
    private fileUploadService: UploadService
    )
   {
    this.levels = new Levels();
    if (this.authenticationService.currentUserValue) {
      this.isAdmin = this.authenticationService.currentUserValue.isAdmin;
      this.traderId = this.authenticationService.currentUserValue.trader_id;
    }

    }
  ngOnChanges(changes: SimpleChanges): void {
    this.fileDestnation = this.selInstrument.instrument + '_' + this.authenticationService.currentUserValue.account + '.png';
    this.fileDestnation = this.selInstrument.imagePath;
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


 // On file Select
 onChange(event) {
  this.file = event.target.files[0];
}

dataChange(){
  this.txtSaved = '';
  this.ValidateValue();
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

clickLevelDescription(noLevel)
{
  this.numLevelEdit = noLevel;
  if (this.numLevelEdit === 1)
    { this.txtLevelDescription = this.levels.description_1; this.txtLevelValue = this.levels.valueLevel_1.toString();}
  if (this.numLevelEdit === 2)
     { this.txtLevelDescription = this.levels.description_2; this.txtLevelValue = this.levels.valueLevel_2.toString();}
  if (this.numLevelEdit === 3)
     { this.txtLevelDescription = this.levels.description_3; this.txtLevelValue = this.levels.valueLevel_3.toString();}
  if (this.numLevelEdit === 4)
     { this.txtLevelDescription = this.levels.description_4; this.txtLevelValue = this.levels.valueLevel_4.toString();}
  if (this.numLevelEdit === 5)
     { this.txtLevelDescription = this.levels.description_5; this.txtLevelValue = this.levels.valueLevel_5.toString();}
  if (this.numLevelEdit === 6)
     { this.txtLevelDescription = this.levels.description_6; this.txtLevelValue = this.levels.valueLevel_6.toString();}
  if (this.numLevelEdit === 7)
     { this.txtLevelDescription = this.levels.description_7; this.txtLevelValue = this.levels.valueLevel_7.toString();}
  if (this.numLevelEdit === 8)
     { this.txtLevelDescription = this.levels.description_8; this.txtLevelValue = this.levels.valueLevel_8.toString();}
  if (this.numLevelEdit === 9)
     { this.txtLevelDescription = this.levels.description_9; this.txtLevelValue = this.levels.valueLevel_9.toString();}
  if (this.numLevelEdit === 10)
     { this.txtLevelDescription = this.levels.description_10; this.txtLevelValue = this.levels.valueLevel_10.toString();}
  if (this.numLevelEdit === 11)
     { this.txtLevelDescription = this.levels.description_11; this.txtLevelValue = this.levels.valueLevel_11.toString();}
  if (this.numLevelEdit === 12)
     { this.txtLevelDescription = this.levels.description_12; this.txtLevelValue = this.levels.valueLevel_12.toString();}
  if (this.numLevelEdit === 13)
     { this.txtLevelDescription = this.levels.description_13; this.txtLevelValue = this.levels.valueLevel_13.toString();}
  if (this.numLevelEdit === 14)
     { this.txtLevelDescription = this.levels.description_14; this.txtLevelValue = this.levels.valueLevel_14.toString();}
  if (this.numLevelEdit === 15)
     { this.txtLevelDescription = this.levels.description_15; this.txtLevelValue = this.levels.valueLevel_15.toString();}

  this.isModalVisibleLevel = true;
}

cancelModalLevel()
{
  this.isModalVisibleLevel = false;
}
akceptModalLevel(){
  if (this.numLevelEdit === 1)
    { this.levels.description_1 = this.txtLevelDescription; }
  if (this.numLevelEdit === 2)
     { this.levels.description_2 = this.txtLevelDescription; }
  if (this.numLevelEdit === 3)
     { this.levels.description_3 = this.txtLevelDescription; }
  if (this.numLevelEdit === 4)
     { this.levels.description_4 = this.txtLevelDescription; }
  if (this.numLevelEdit === 5)
     { this.levels.description_5 = this.txtLevelDescription; }
  if (this.numLevelEdit === 6)
     { this.levels.description_6 = this.txtLevelDescription; }
  if (this.numLevelEdit === 7)
     { this.levels.description_7 = this.txtLevelDescription; }
  if (this.numLevelEdit === 8)
     { this.levels.description_8 = this.txtLevelDescription; }
  if (this.numLevelEdit === 9)
     { this.levels.description_9 = this.txtLevelDescription; }
  if (this.numLevelEdit === 10)
     { this.levels.description_10 = this.txtLevelDescription; }
  if (this.numLevelEdit === 11)
     { this.levels.description_11 = this.txtLevelDescription; }
  if (this.numLevelEdit === 12)
     { this.levels.description_12 = this.txtLevelDescription; }
  if (this.numLevelEdit === 13)
     { this.levels.description_13 = this.txtLevelDescription; }
  if (this.numLevelEdit === 14)
     { this.levels.description_14 = this.txtLevelDescription; }
  if (this.numLevelEdit === 15)
     { this.levels.description_15 = this.txtLevelDescription; }

  this.svrMyPortfolio.updateLevelInstrument(this.selInstrument.myPortfolioId, this.levels).subscribe((datar: any) => {
    this.isModalVisibleLevel = false;
      });
}


onUpload() {
  this.loading = !this.loading;
  this.txtLevelDescription = this.selInstrument.imagePath;
  this.selInstrument.imagePath = '';
  this.fileDestnation = this.selInstrument.instrument + '_' + this.authenticationService.currentUserValue.account + '.png';
  this.fileUploadService.setFileName(this.fileDestnation, this.selInstrument.myPortfolioId).subscribe(
      (stat: any) => {
          this.fileUploadService.upload(this.file).subscribe(
            (event: any) => {
                if (typeof (event) === 'object') {
                    this.shortLink = event.link;
                    this.loading = false; // Flag variable
                    this.selInstrument.imagePath = stat;
                    this.selInstrument.imageVersion = this.selInstrument.imageVersion + 1;
                }
            }
          );

      }
  );
}

onSaveMyInstrument()
{
   this.svrMyPortfolio.UpdateMyPorfolio(this.selInstrument.myPortfolioId, this.selInstrument.myDescription).subscribe((data: any) => {

  });

}
onSaveLevels()
{
  this.svrMyPortfolio.updateLevelInstrument(this.selInstrument.myPortfolioId, this.levels).subscribe((datar: any) => {
    this.getLevels();
    this.txtSaved = 'disabled';
    });

}

isEmptyDescription(no: number){
  if (no === 1) {return this.levels.valueLevel_1 === null; }
  if (no === 2) {return this.levels.valueLevel_2 === null; }
  if (no === 3) {return this.levels.valueLevel_3 === null; }
  if (no === 4) {return this.levels.valueLevel_4 === null; }
  if (no === 5) {return this.levels.valueLevel_5 === null; }
  if (no === 6) {return this.levels.valueLevel_6 === null; }
  if (no === 7) {return this.levels.valueLevel_7 === null; }
  if (no === 8) {return this.levels.valueLevel_8 === null; }
  if (no === 9) {return this.levels.valueLevel_9 === null; }
  if (no === 10) {return this.levels.valueLevel_10 === null; }
  if (no === 11) {return this.levels.valueLevel_11 === null; }
  if (no === 12) {return this.levels.valueLevel_12 === null; }
  if (no === 13) {return this.levels.valueLevel_13 === null; }
  if (no === 14) {return this.levels.valueLevel_14 === null; }
  if (no === 15) {return this.levels.valueLevel_15 === null; }

}

isEmptyDescription_0(no: number){
  if (no === 1) {if (this.levels.description_1 === null ) {return 'btn btn-icon btn-primary btn-sm'; } else {return 'btn btn-icon btn-success btn-sm'; } }
  if (no === 2) {if (this.levels.description_2 === null) {return 'btn btn-icon btn-primary btn-sm'; } else {return 'btn btn-icon btn-success btn-sm'; } }
  if (no === 3) {if (this.levels.description_3 === null) {return 'btn btn-icon btn-primary btn-sm'; } else {return 'btn btn-icon btn-success btn-sm'; } }
  if (no === 4) {if (this.levels.description_4 === null) {return 'btn btn-icon btn-primary btn-sm'; } else {return 'btn btn-icon btn-success btn-sm'; } }
  if (no === 5) {if (this.levels.description_5 === null) {return 'btn btn-icon btn-primary btn-sm'; } else {return 'btn btn-icon btn-success btn-sm'; } }
  if (no === 6) {if (this.levels.description_6 === null) {return 'btn btn-icon btn-primary btn-sm'; } else {return 'btn btn-icon btn-success btn-sm'; } }
  if (no === 7) {if (this.levels.description_7 === null) {return 'btn btn-icon btn-primary btn-sm'; } else {return 'btn btn-icon btn-success btn-sm'; } }
  if (no === 8) {if (this.levels.description_8 === null) {return 'btn btn-icon btn-primary btn-sm'; } else {return 'btn btn-icon btn-success btn-sm'; } }
  if (no === 9) {if (this.levels.description_9 === null) {return 'btn btn-icon btn-primary btn-sm'; } else {return 'btn btn-icon btn-success btn-sm'; } }
  if (no === 10) {if (this.levels.description_10 === null) {return 'btn btn-icon btn-primary btn-sm'; } else {return 'btn btn-icon btn-success btn-sm'; } }
  if (no === 11) {if (this.levels.description_11 === null) {return 'btn btn-icon btn-primary btn-sm'; } else {return 'btn btn-icon btn-success btn-sm'; } }
  if (no === 12) {if (this.levels.description_12 === null) {return 'btn btn-icon btn-primary btn-sm'; } else {return 'btn btn-icon btn-success btn-sm'; } }
  if (no === 13) {if (this.levels.description_13 === null) {return 'btn btn-icon btn-primary btn-sm'; } else {return 'btn btn-icon btn-success btn-sm'; } }
  if (no === 14) {if (this.levels.description_14 === null) {return 'btn btn-icon btn-primary btn-sm'; } else {return 'btn btn-icon btn-success btn-sm'; } }
  if (no === 15) {if (this.levels.description_15 === null) {return 'btn btn-icon btn-primary btn-sm'; } else {return 'btn btn-icon btn-success btn-sm'; } }
}


}
