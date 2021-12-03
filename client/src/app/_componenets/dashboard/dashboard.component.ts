import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { AppointmentsService } from 'src/app/_services/appointments.service';
import * as moment from 'moment';
import { Slots } from 'src/app/_models/slots';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {
  selected: Date | null = new Date;
  isLoading: boolean = false;
  mSlotData: Array<any> = [];
  eSlotData: Array<any> = [];
  datepipe = new DatePipe('en-US');
  constructor(private appointment: AppointmentsService) { }

  selectedChange(event: string): void {
    this.isLoading = true;
    let r_date = this.datepipe.transform(event, 'Y-M-d');
    this.appointment.getSlots(r_date!).subscribe(slots => {
      let data = slots.attributes;
      this.isLoading = true;
      this.mSlotData = this.slotTimeGeneration(data.m_time_from, data.m_time_to);
      this.eSlotData = this.slotTimeGeneration(data.e_time_from, data.e_time_to);
      setTimeout(() => {
        this.isLoading = false
      }, 500);
    });
  }

  slotTimeGeneration(fromTime: string, toTime: string): Array<any> {
    var startTime = moment(fromTime, 'HH:mm').format('HH:mm A');
    var endTime = moment(toTime, 'HH:mm').format('HH:mm A');
    var slotData = [];
    do {
      startTime = moment(startTime, 'hh:mm').add(30, 'minutes').format('HH:mm A');
      slotData.push(moment(startTime, 'hh:mm A').format('hh:mm A'));
    } while (startTime !== endTime)
    return slotData;
  }

  onClickSlot(event: string): void {
    console.log(event);
  }
}
