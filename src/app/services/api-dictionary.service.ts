import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ConfigService} from 'src/app/services/config-service.service';

@Injectable({
  providedIn: 'root'
})
export class ApiDictionaryService {

  constructor(private http: HttpClient) { }
}
