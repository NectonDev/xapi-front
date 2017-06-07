import { Component } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
    'November', 'December'];
  currentDate = new Date();
  selectedDate = new Date();
  isEnglishCalendar = true;
  isShowingPopup = false;
  isDraggingMouse = false;

  constructor() {
    document.addEventListener('mouseup', () => {
      this.isShowingPopup = this.isShowingPopup && this.isDraggingMouse;
    }, true);
  }

  getDayNames(): string[] {
    const days = [];
    let index = this.isEnglishCalendar ? 0 : 1;
    for (let i = 0; i < 7; i++) {
      days.push(this.DAYS[index]);
      index = !this.DAYS[index + 1] ? 0 : index + 1;
    }
    return days;
  }

  getDayOfMonth(): number {
    return this.currentDate.getDate();
  }

  setDayOfMonth(day: number) {
    this.currentDate.setDate(day);
  }

  getStartDay(): number {
    const date = new Date(this.currentDate);
    date.setDate(1);
    return date.getDay();
  }

  getStartingDays(): number[] {
    const days = [];
    const date = new Date(this.currentDate);
    date.setDate(0);
    const startDay = this.isEnglishCalendar ? this.getStartDay() - 1 : this.getStartDay() - 2;
    date.setDate(date.getDate() - startDay);
    for (let i = 0; i < startDay + 1; date.setDate(date.getDate() + 1), i++) {
      days.push(date.getDate());
    }
    return days;
  }

  getEndingDay(): number {
    const date = new Date(this.currentDate);
    date.setDate(1);
    date.setMonth(date.getMonth() + 1);
    date.setDate(0);
    return date.getDay();
  }

  getEndingDays(): number[] {
    const days = [];
    const date = new Date(this.currentDate);
    date.setDate(1);
    date.setMonth(date.getMonth() + 1);
    const lastDayOfWeek = this.isEnglishCalendar ? 6 : 7;
    for (let i = this.getEndingDay(); i < lastDayOfWeek; date.setDate(date.getDate() + 1), i++) {
      days.push(date.getDate());
    }
    return days;
  }

  getDaysOfMonth(): number[] {
    const days = [];
    const date = new Date(this.currentDate);
    date.setDate(1);
    days.push(1);
    date.setDate(2);
    for (let i = 2; date.getDate() !== 1; date.setDate(++i)) {
      days.push(i);
    }
    return days;
  }

  moveMonthRelative(displacement: number) {
    this.currentDate.setMonth(this.currentDate.getMonth() + displacement);
  }

  getMonthName(): string {
    return this.MONTHS[this.currentDate.getMonth()];
  }

  getYear(): number {
    return this.currentDate.getFullYear();
  }

  moveYearRelative(displacement: number) {
    this.currentDate.setFullYear(this.currentDate.getFullYear() + displacement);
  }

  onDayClick(day: number) {
    this.selectedDate = new Date(this.currentDate);
    this.selectedDate.setDate(day);
  }

  isDaySelected(day: number): boolean {
    return day === this.selectedDate.getDate() && this.currentDate.getMonth() === this.selectedDate.getMonth() &&
      this.currentDate.getFullYear() === this.selectedDate.getFullYear();
  }

  toggleIsShowingPopup() {
    this.isShowingPopup = !this.isShowingPopup;
  }
}
