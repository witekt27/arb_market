import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatListModule} from '@angular/material/list';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { FlexLayoutModule } from '@angular/flex-layout';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import {StatConnectionService} from './services/stat-connection.service';
import {InstrumentDefService} from './services/instrument-def.service';
import {ApiSymbolsService} from './services/api-symbols.service';
import { AlertComponent } from './_components/alert/alert.component';
import { LoginComponent } from './components/login/login.component';
import {AuthenticationService} from 'src/app/_services/authentication.service';
import { PortfolioDefComponent } from './components/portfolio-def/portfolio-def.component';
import { LevelsDefComponent } from './components/levels-def/levels-def.component';
import { LevelsInstrumentComponent } from './components/levels-instrument/levels-instrument.component';
import { LevelsValueComponent } from './components/levels-value/levels-value.component';
import { InstrumentsComponent } from './components/instruments/instruments.component';
import { LogOutComponent } from './components/log-out/log-out.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { AlertsComponent } from './components/alerts/alerts.component';
import { AddInstrumentComponent } from './components/add-instrument/add-instrument.component';
import { MarketListComponent } from './components/market-list/market-list.component';
import { MatektDetailsComponent } from './components/matekt-details/matekt-details.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';


@NgModule({
  declarations: [
    AppComponent,


    AlertComponent,
    LoginComponent,
    PortfolioDefComponent,
    LevelsDefComponent,
    LevelsInstrumentComponent,
    LevelsValueComponent,
    InstrumentsComponent,
    LogOutComponent,
    AlertsComponent,
    AddInstrumentComponent,
    MarketListComponent,
    MatektDetailsComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    FroalaEditorModule.forRoot(),
    NgxMaskModule.forRoot()
  ],
  providers: [StatConnectionService, InstrumentDefService, ApiSymbolsService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
