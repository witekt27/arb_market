import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ConfigService} from 'src/app/services/config-service.service';
import {Instrument} from 'src/app/model/instrument';
import {Levels} from 'src/app/model/levels';
import {Alerts} from 'src/app/model/alerts';
import {Signal} from 'src/app/model/signal.model';


@Injectable({
  providedIn: 'root'
})
export class ApiMyPortfolioService {
urlParam: string;
content: string;
instrument: Instrument;
body: any;


  constructor(private http: HttpClient) { }


  getNoAlerts(traderId)
  {
    // tslint:disable-next-line:ban-types
    this.urlParam = ConfigService.get('api') + 'LoginAuth?_traderId=' + traderId;

    return this.http.get<string>(this.urlParam);
  }

  getAlertsForTrader(traderId, active, selSymbol)
  {
    // tslint:disable-next-line:ban-types
    this.urlParam = ConfigService.get('api') + 'Levels?traderId=' + traderId + '&active=' + active + '&selSymbol=' + selSymbol;

    return this.http.get<Array<Alerts>>(this.urlParam);

  }

  getInstrument(traderId, symbol) {
    // tslint:disable-next-line:ban-types
    this.urlParam = ConfigService.get('api') + 'MyPortfolio?traderId=' + traderId + '&symbol=' + symbol;

    return this.http.get<Array<Instrument>>(this.urlParam);
    }

  getLevelInstrument(traderId, instrumentId) {
    this.urlParam = ConfigService.get('api') + 'Levels?traderId=' + traderId + '&instrumentId=' + instrumentId;

    return this.http.get<Array<Levels>>(this.urlParam);
    }

  updateLevelInstrument(portfolioId: number, levels: Levels) {
    if (levels.description_1 === '') {levels.description_1 = null; }
    if (levels.description_2 === '') {levels.description_2 = null; }
    if (levels.description_3 === '') {levels.description_3 = null; }
    if (levels.description_4 === '') {levels.description_4 = null; }
    if (levels.description_5 === '') {levels.description_5 = null; }
    if (levels.description_6 === '') {levels.description_6 = null; }
    if (levels.description_7 === '') {levels.description_7 = null; }
    if (levels.description_8 === '') {levels.description_8 = null; }
    if (levels.description_9 === '') {levels.description_9 = null; }
    if (levels.description_10 === '') {levels.description_10 = null; }
    if (levels.description_11 === '') {levels.description_11 = null; }
    if (levels.description_12 === '') {levels.description_12 = null; }
    if (levels.description_13 === '') {levels.description_13 = null; }
    if (levels.description_14 === '') {levels.description_14 = null; }
    if (levels.description_15 === '') {levels.description_15 = null; }

    this.content = JSON.stringify(levels);
    this.urlParam = ConfigService.get('api') + 'Levels?portfolioId=' + portfolioId + '&content=' + this.content;
    return this.http.put(this.urlParam, this.body);
    }

  AddInsMyPorfolio(traderId, instrumentId){

    this.urlParam = ConfigService.get('api') + 'MyPortfolio?traderId=' + traderId + '&instrumentId=' + instrumentId ;
    return this.http.post(this.urlParam, this.body);
  }

  UpdateMyPorfolio(portfolioId, description){

    this.urlParam = ConfigService.get('api') + 'MyPortfolio?portfolioId=' + portfolioId + '&description=' + description ;
    return this.http.put(this.urlParam, this.body);
  }


  RemoveFromMyPorfolio(portfolioId){

    this.urlParam = ConfigService.get('api') + 'MyPortfolio?portfolioId=' + portfolioId;
    return this.http.delete(this.urlParam, this.body);
  }

  UpdateMyPorfolioOnOff(portfolioId, active){

    // tslint:disable-next-line:max-line-length
    this.urlParam = ConfigService.get('api') + 'MyPortfolio?portfolioId=' + portfolioId + '&description=NULL'  + '&active=' + active ;
    return this.http.put(this.urlParam, this.body);
  }

  getCurrentSignal(traderId) {
    this.urlParam = ConfigService.get('api') + 'CurrentSignal?_traderId=' + traderId;

    return this.http.get<Array<Signal>>(this.urlParam);
    }

  getSignal(traderId) {
      this.urlParam = ConfigService.get('api') + 'Signal?_traderId=' + traderId;
      return this.http.get<Array<Signal>>(this.urlParam);
      }
  unSetNewSignal(traderId, _id) {
        this.urlParam = ConfigService.get('api') + 'Signal?_traderId=' + traderId + '&_id=' + _id;
        return this.http.get<Array<Signal>>(this.urlParam);
        }
  
}
