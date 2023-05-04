import { Component } from '@angular/core';
import { LocalService } from '../local.service';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})

export class PlanningComponent {
  constructor(private localStore: LocalService) { }

  practicingDays = [false, false, false, false, false, false, false];

  hours = 0;
  globalHoursPerWeek = 0;

  boolFromString(s: string) {
    if (s == 'true') return true
    else return false
  }

  ngOnInit(): void {
    this.hours = +this.localStore.getData('hours');
    console.log("hours: " + this.hours);
    this.globalHoursPerWeek = +this.localStore.getData('globalHoursPerWeek');
    console.log("globalHoursPerWeek: " + this.globalHoursPerWeek);
    let tempPractice = this.localStore.getData('practicingDays').split(',');
    if (tempPractice.length == 7)
      this.practicingDays = tempPractice.map(this.boolFromString);
    console.log("practicingDays: " + this.practicingDays);
  }

  onDayToggle(index: number): void {
    let temp = this.practicingDays[index];
    if (temp)
      this.practicingDays[index] = false;
    else
      this.practicingDays[index] = true;
    
    this.updateHours();
    
    console.log(this.practicingDays);
  }

  updateHours() {
    let daysPerWeek = 0;
    this.practicingDays.forEach(function(value) {
      if (value)
        daysPerWeek += 1;
    });
    this.globalHoursPerWeek = Math.round(this.hours * daysPerWeek);
    console.log(this.globalHoursPerWeek);
  }

  /*
    We need to save multiple different elements to Local Storage

    1) use JSON.stringify to convert practicingDays to a string and then store it with key "practicingDays"
      a) because it is converted to a string, need to also find how to convert it back from a string to an array of digits
    2) convert hours to a string and then store strHours with key "hours"
    3) convert globalHoursPerWeek into a string and then store strGlobalHours with key "globalHoursPerWeek"
  */
  saveData() {
    let strHours = this.hours.toString();
    let strGlobalHours = this.globalHoursPerWeek.toString();
    let strPracticingDays = this.practicingDays.toString();

    this.localStore.saveData('hours', strHours);
    this.localStore.saveData('globalHoursPerWeek', strGlobalHours);
    this.localStore.saveData('practicingDays', strPracticingDays);

    console.log("hours: " + this.hours);
    console.log("globalHoursPerWeek: " + this.globalHoursPerWeek);
    console.log("practicingDays: " + this.practicingDays);
  }

  clearData() {
    this.localStore.clearData();
    this.hours = 0;
    this.globalHoursPerWeek = 0;
    this.practicingDays = [false, false, false, false, false, false, false,];
    console.log("hours: " + this.hours);
    console.log("globalHoursPerWeek: " + this.globalHoursPerWeek);
    console.log("practicingDays: " + this.practicingDays);
  }
}
