import { injectable } from 'inversify';
import { action, computed, observable } from 'mobx';

import { ILoader } from './ILoader';

@injectable()
export class LoaderService implements ILoader {
  @observable
  private $showCount = 0;

  @observable
  private $show = false;

  @observable
  private $background = true;

  @computed
  public get isShow(): boolean {
    return this.$show;
  }

  @computed
  public get isBackground(): boolean {
    return this.$background;
  }

  public set isBackground(value: boolean) {
    this.$background = value;
  }

  @action.bound
  public show(): void {
    this.$show = true;
    this.$showCount += 1;
  }

  @action.bound
  public hide(): void {
    this.$showCount -= 1;

    if (this.$showCount === 0) {
      this.hideFromOutside();
    }
  }

  @action.bound
  public update(isShow: boolean, isBackground: boolean): void {
    this.$show = isShow;
    this.$background = isBackground;
  }

  @action.bound
  public hideFromOutside(): void {
    this.$show = false;
    this.isBackground = true;
  }
}
