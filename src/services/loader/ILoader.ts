export interface ILoader {
  isShow: boolean;
  isBackground: boolean;

  show(): void;
  hide(): void;
  hideFromOutside(): void;
  update(isShow: boolean, isBackground: boolean): void;
}
