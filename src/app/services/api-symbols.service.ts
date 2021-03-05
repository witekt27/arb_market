import { Injectable } from '@angular/core';
import {Symbol} from 'src/app/model/symbol';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {ConfigService} from 'src/app/services/config-service.service';


@Injectable({
  providedIn: 'root'
})
export class ApiSymbolsService {
  // tslint:disable-next-line:ban-types
  tabSymbols: Symbol;

  constructor(private http: HttpClient) { }

  getSymbolsCode(gielda) {
    // tslint:disable-next-line:ban-types
    return this.http.get<Array<Symbol>>(ConfigService.get('api') + 'Symbols?gielda=' + gielda);
    }

}
