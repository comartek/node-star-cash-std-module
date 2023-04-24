import { CashDrawerEventEnum } from "./cash-drawer-event.enum";
import { ConnectEvent } from "./connect-event";

const CashDrawerEventName = 'CashDrawer'
export class CashDrawerEvent extends ConnectEvent {
  readonly name = CashDrawerEventName;
  public static readonly eventName = CashDrawerEventName;
  data: CashDrawerEventEnum = CashDrawerEventEnum.Unknown;

  constructor(data: CashDrawerEventEnum) {
    super(data.toString());
    this.data = data;
  }

  public static parse(deviceInfo: Buffer): CashDrawerEvent
  public static parse(deviceInfo: string): CashDrawerEvent
  public static parse(deviceInfo: string | Buffer): CashDrawerEvent
  public static parse(deviceInfo: string | Buffer): CashDrawerEvent {
    if (deviceInfo instanceof Buffer) {
      return CashDrawerEvent.fromBuffer(deviceInfo);
    } else if (typeof deviceInfo === 'string') {
      return CashDrawerEvent.fromString(deviceInfo);
    } else {
      throw new Error('Not supported')
    }
  }

  private static fromString(deviceInfoInString: string): CashDrawerEvent {
    if (typeof deviceInfoInString !== 'string') {
      deviceInfoInString = '';
    }
    deviceInfoInString = deviceInfoInString.trim();
    if (deviceInfoInString.startsWith('"') && deviceInfoInString.endsWith('"')) {
      deviceInfoInString = deviceInfoInString.substring(1, deviceInfoInString.length - 1);
    }
    const [, data] = deviceInfoInString.split(':');
    let parsedState = CashDrawerEventEnum.Unknown;
    switch (data) {
      case CashDrawerEventEnum.Close: {
        parsedState = CashDrawerEventEnum.Close;
        break;
      }
      case CashDrawerEventEnum.Open: {
        parsedState = CashDrawerEventEnum.Open;
        break;
      }
      default:
        break;
    }
    return new CashDrawerEvent(parsedState);
  }

  private static fromBuffer(deviceInfoInBuffer: Buffer): CashDrawerEvent {
    const deviceInfoInString = deviceInfoInBuffer.toString();
    return this.fromString(deviceInfoInString);
  }
}