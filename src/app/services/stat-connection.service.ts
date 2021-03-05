import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StatConnectionService {
  public txtStatus: string;

  constructor(private http: HttpClient) {
  }

  getStatusConnection() {
    return this.http.get<string>('http://api.toptrader2000.com/api/StatusCQG');
    }
}
