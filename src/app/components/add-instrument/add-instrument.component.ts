import { Component, OnInit, Input, OnChanges, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import {Symbol} from 'src/app/model/symbol';
import {Instrument} from 'src/app/model/instrument';
import {ApiInstrumentsService} from 'src/app/services/api-instruments.service';
import { inherits } from 'util';


@Component({
  selector: 'app-add-instrument',
  templateUrl: './add-instrument.component.html',
  styleUrls: ['./add-instrument.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddInstrumentComponent implements OnInit, OnChanges {

  @Input() symbols: Symbol;
  @Input() addSymbol: string;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onRefresh: EventEmitter<number> = new EventEmitter<number>();

  newPosition: number;
  addInstrument: Instrument;

  selType = 'S';

  addSpreed = '1';
  addSpreadTxt = 'S';
  addMonth = 'F';
  addYear = '20';

  isOutright = false;
  isSaved = false;
  txtMessage = '';
  isMessage = false;

  refresh(newPositio){
    this.onRefresh.emit(newPositio);
  }

  constructor(
    private svrInstruments: ApiInstrumentsService
  ) { }

  ngOnInit(): void {
    this.addInstrument = new  Instrument();
    this.addInstrument.strExpiration = '01/01/21';
    this.addInstrument.strFirstNotice = '01/01/21';
  }

  ngOnChanges(changes){
  }

  onTypeChange(value){
    if (this.selType === 'S'){
      this.addSpreadTxt = 'S';
      this.isOutright = false;
    }
    if (this.selType === 'O'){
        this.addSpreadTxt = '';
        this.isOutright = true;
    }
    if (this.selType === 'L'){
      this.addSpreadTxt = 'L';
      this.isOutright = false;
    }

  }

  onChangeFirsNotice(){

  }

  AddSymbolfilterChanged(value){

  }

  AddNewInstrument(){
    this.isSaved = true;
    this.addInstrument.type = this.selType;
    if (this.isOutright){
      this.addInstrument.instrument = this.addSymbol  + this.addMonth + this.addYear;
    }
    else {
      this.addInstrument.instrument = this.addSymbol + this.addSpreadTxt + this.addSpreed + this.addMonth + this.addYear;
    }
    this.addInstrument.symbol = this.addSymbol;
    this.addInstrument.spreed = Number(this.addSpreed);
    this.addInstrument.month = this.addMonth;
    this.addInstrument.year = this.addYear;

    this.svrInstruments.insertNewInstrument(this.addInstrument).subscribe( (data: number) => {
      this.newPosition  = Number(data);
      this.isSaved = false;
      if (this.newPosition > 0) {
        this.txtMessage = 'Instrument added sucessful';
        this.isMessage = true;
        this.refresh(this.newPosition);
      }
      else{
        this.txtMessage = 'Error: This instrument exist in porfolio';
        this.isMessage = true;
        this.newPosition = this.newPosition * (-1);
        this.refresh(this.newPosition);
      }
} );


  }

  AddNewSpread(){
    this.isSaved = true;
    this.addInstrument.type = this.selType;
    if (this.isOutright){
      this.addInstrument.instrument = this.addSymbol  + this.addMonth + this.addYear;
    }
    else {
      this.addInstrument.instrument = this.addSymbol + this.addSpreadTxt + this.addSpreed + this.addMonth + this.addYear;
    }
    this.addInstrument.symbol = this.addSymbol;
    this.addInstrument.spreed = Number(this.addSpreed);
    this.addInstrument.month = this.addMonth;
    this.addInstrument.year = this.addYear;


    // tslint:disable-next-line:max-line-length
    this.svrInstruments.insertNewInstrument(this.addInstrument).subscribe( (data: number) => {
          this.newPosition  = Number(data);
            this.isSaved = false;
            if (this.newPosition === 0){
              this.isMessage = false;
              this.txtMessage = '';
            }
            else{
              this.isMessage = true;
              if (this.newPosition > 0) {
                this.txtMessage = 'Instrument added sucessful';
              }
              else
              {
                  if (this.newPosition < -10000) {
                  this.txtMessage = 'Error: This instrument exist in porfolio as inactive';
                  this.newPosition = this.newPosition * (-1) - 10000;
                }
                else {
                  this.newPosition = this.newPosition * (-1);
                  this.txtMessage = 'Error: This instrument exist in porfolio';

                }
            }
          }
      
  } );

  }

}
