import { Injectable } from '@angular/core';
import * as moment from 'moment';

// Time to submit + Time to vote;
const HOURS_TOTAL = 48;

@Injectable({
  providedIn: 'root'
})
export class CountdownService {

  isVoting: boolean = false;
  isSubmission: boolean = true;

  set switchInSeconds(t: number) {
    const h = Math.floor((t / 60 / 60) % (HOURS_TOTAL / 2));
    const m = Math.floor((t / 60) % 60);
    const s = Math.floor(t % 60);

    this.hour = (h < 10 ? "0" : "") + h;
    this.minute = (m < 10 ? "0" : "") + m;
    this.second = (s < 10 ? "0" : "") + s;
  }

  hour: string = "00";
  minute: string = "00";
  second: string = "00";

  _start = moment.utc("2022-02-06 00:00:00").toDate()

  constructor() {
    console.log("Offset ", moment().utcOffset(), this.date);

    this._calc();
    setInterval(this._calc.bind(this), 1000);
  }

  _calc() {
    //@ts-ignore
    const ts = this.date - this._start;
    const time = (ts / 1000 / 60 / 60) % HOURS_TOTAL

    this.switchInSeconds = (86400 / 24) * (HOURS_TOTAL / 2) - (((ts / 1000 / 60 / 60) % (HOURS_TOTAL / 2)) * 60 * 60);

    const isSubmissionPeriod = time <= (HOURS_TOTAL / 2);
    this.isSubmission = isSubmissionPeriod;
    this.isVoting = !isSubmissionPeriod;
  }

  get date() {
    return moment.utc().toDate()
  }
}
