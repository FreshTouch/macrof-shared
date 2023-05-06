import {observable} from 'mobx';

export class Token {
  @observable
  private _token: string | null = null;

  @observable
  private _expired = false;

  get token(): string | null {
    return this._token;
  }

  set token(token: string | null) {
    this._token = token;
  }

  get expired(): boolean {
    return this._expired;
  }

  set expired(expire: boolean) {
    this._expired = expire;
  }
}
