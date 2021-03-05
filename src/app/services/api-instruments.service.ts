import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ConfigService} from 'src/app/services/config-service.service';
import {Instrument} from 'src/app/model/instrument';

@Injectable({
  providedIn: 'root'
})
export class ApiInstrumentsService {
urlParam: string;
content: string;
instrument: Instrument;
body: any;

  constructor(private http: HttpClient) { }

  getInstrument(portfolio, symbol, active, traderId) {
    // tslint:disable-next-line:ban-types
    this.urlParam = ConfigService.get('api') + 'Instrument?portfolio=' + portfolio + '&symbol=' + symbol + '&active=' + active + '&traderId=' + traderId;

    return this.http.get<Array<Instrument>>(this.urlParam);
    }

    updateInstruments(ins){
          this.content = JSON.stringify(ins);
          this.urlParam = ConfigService.get('api') + 'Instrument?content=' + this.content;
          return this.http.put(this.urlParam, this.body);
      }

      insertNewInstrument(ins){
        this.content = JSON.stringify(ins);
        this.urlParam = ConfigService.get('api') + 'Instrument?content=' + this.content;
        return this.http.post(this.urlParam, this.body);
    }

    insertNewSpread(symbol, spread, month, year, portfolio){

      this.urlParam = ConfigService.get('api') + 'Instrument?symbol=' + symbol + '&spread=' + spread + '&month=' + month + '&year=' + year + '&portfolio=' + portfolio;
      return this.http.post(this.urlParam, this.body);

    }
}
