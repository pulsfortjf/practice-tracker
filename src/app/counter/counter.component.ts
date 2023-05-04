import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent {
  @Input()  count!: number;
  @Output() countChange = new EventEmitter<number>();

  increase(): void {
    if (this.count < 24)
      this.count += 1;
    console.log(this.count);
    this.countChange.emit(this.count);
  }

  decrease(): void {
    if (this.count > 0) 
      this.count -= 1;
    console.log(this.count);
    this.countChange.emit(this.count);
  }
}