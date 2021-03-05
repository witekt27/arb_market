import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {ApiSymbolsService} from 'src/app/services/api-symbols.service';
import {Symbol} from 'src/app/model/symbol';
import {Instrument} from 'src/app/model/instrument';
import { ThrowStmt } from '@angular/compiler';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-instrument-list',
  templateUrl: './instrument-list.component.html',
  styleUrls: ['./instrument-list.component.css']
})
export class InstrumentListComponent implements OnChanges {

// tslint:disable-next-line:ban-types
symbols: Array<Symbol>;
instruments: Array<Instrument>;

// tslint:disable-next-line:ban-types
selSymbol: Symbol;

selSymbolCode: string;
selSpreed: string;
selMonth: string;
selYear: string;

private selGielda: string;

  constructor(
    private svrSymbols: ApiSymbolsService
  ) {
    this.selSpreed = '1';
    this.selMonth = 'F';
    this.selYear = '20';
   }
  ngOnChanges(changes) {
    this.selGielda = changes.selExchange.currentValue;
    this.selGielda = '0';
    this.svrSymbols.getSymbolsCode(this.selGielda).subscribe((data: any) => {
      this.symbols = data;
      this.selSymbol = this.symbols[0];
    } );

    }
    selectedChanged(selected)
    {
      this.selSymbolCode = this.selSymbol.code;
      // Po zmianie symbolu load lista spredów
    }

}
