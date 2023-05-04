import { Component } from '@angular/core';

@Component({
  selector: 'counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent {
    public count = 0;

    increase(): void {
        this.count += 1;
        console.log(this.count);
    }

    decrease(): void {
      if (this.count > 0) 
        this.count -= 1;
      console.log(this.count);
    }
}