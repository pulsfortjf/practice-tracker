import { Component, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})

export class ToolbarComponent {

  cardTitle = 'Home'

  onButtonClick(buttonName: string): string {
    if(buttonName == 'Home') {
      this.cardTitle = 'Home';
      console.log('Button clicked' + this.cardTitle);
      return 'Home';
    }
    else {
      this.cardTitle = buttonName;
      console.log('Button clicked' + this.cardTitle);
      return buttonName;
    }
  }

}
