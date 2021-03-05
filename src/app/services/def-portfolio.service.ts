import { Injectable } from '@angular/core';
import {Portfolio} from '../services/portfolio';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {ConfigService} from 'src/app/services/config-service.service';

@Injectable({
  providedIn: 'root'
})

export class DefPortfolioService {

portolios: Array<Portfolio>;
content: string;
body: any;

  constructor(private http: HttpClient) {
  }
   getList() {
    return this.http.get<Array<Portfolio>>(ConfigService.get('api') + 'portfolio');
    }

  updatePortfolio( portfolio: Portfolio)
  {
    this.content = JSON.stringify(portfolio);
    return this.http.post(ConfigService.get('api') + 'portfolio?content=' + this.content, this.body);

  }

}
