import {Component, ContentChildren, QueryList, ViewChildren} from '@angular/core';
import {PopupService} from '../popup.service';
import {PopupOptionComponent} from "../popup-option/popup-option.component";

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  title = 'Popup title';
  isVisible: boolean;
  @ContentChildren(PopupOptionComponent) options: QueryList<PopupOptionComponent>;

  constructor(popupService: PopupService) {
    popupService.setOnOptionChangeListener((optionName: string) => {
      for (const option of this.options.toArray()) {
        if (option.getName() === optionName) {
          option.show();
          this.title = option.getTitle();
        } else {
          option.hide();
        }
      }
      this.isVisible = true;
    });
    popupService.setOnVisibilityChangeListener((isVisible: boolean) => {
      this.isVisible = isVisible;
    });
  }

  onExit() {
    this.isVisible = false;
  }
}
