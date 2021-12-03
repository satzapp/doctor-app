import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Slots } from '../_models/slots';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  constructor(private globalService: GlobalService) { }

  getSlots(r_date: string): Observable<Slots> {
    let params = new HttpParams({
      fromObject: {
        'date': r_date
      }
    });
    return this.globalService.get('/appointment/slots', params);
  }
}
