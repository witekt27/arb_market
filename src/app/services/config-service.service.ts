export class ConfigService {
  private _api: string;
  private _isLogin: string;

  static set(property, value) {
    this['_' + property] = value;
  }

  static get(property) {
    return this['_' + property];
  }

  }
