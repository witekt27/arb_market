import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import {ConfigService} from 'src/app/services/config-service.service';

ConfigService.set('api', 'http://mdm.wt-infor.pl/api/');

//ConfigService.set('api', 'http://api.toptrader2000.com/api/');

//ConfigService.set('api', 'https://localhost:44379/api/');

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
