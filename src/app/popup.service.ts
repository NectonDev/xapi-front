import { Injectable } from '@angular/core';

@Injectable()
export class PopupService {
  onOptionChange: (optionName: string) => any;
  onVisibilityChange: (isVisible: boolean) => any;

  public setOnOptionChangeListener(showListener: (msg: string) => any) {
    this.onOptionChange = showListener;
  }

  public changeOption(optionName: string) {
    if (!!this.onOptionChange) {
      this.onOptionChange(optionName);
    }
  }

  public setOnVisibilityChangeListener(visibilityListener: (isVisible: boolean) => any) {
    this.onVisibilityChange = visibilityListener;
  }

  public changeVisibility(isVisible: boolean) {
    if (!!this.onVisibilityChange) {
      this.onVisibilityChange(isVisible);
    }
  }
}
