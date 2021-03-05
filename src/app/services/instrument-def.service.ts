import { Injectable } from '@angular/core';
import { InstrumentDef } from './instrument-def.model';

@Injectable({
  providedIn: 'root'
})
export class InstrumentDefService {

  formData: InstrumentDef;
test: string;

  constructor() {

   }

   postInstrumentDef(formData: InstrumentDef){

     this.test = formData.Instrument;

   }
}
