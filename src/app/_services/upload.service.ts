import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ConfigService} from 'src/app/services/config-service.service';

@Injectable({
  providedIn: 'root'
})
@Injectable()


export class UploadService {
  constructor(private http: HttpClient) { }
  url =  ConfigService.get('api') + 'FileUpload';
  // Returns an observable

  upload(file): Observable<any> {
      const formData = new FormData();
      formData.append("file", file, file.name);
      return this.http.post(this.url, formData);
  }

  setFileName(fileName: string, MyPortfolioId: number) {
    return this.http.get(this.url + '?_chart=' + fileName + '&portfolioid=' + MyPortfolioId);
    }


}