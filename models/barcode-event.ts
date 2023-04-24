import { ConnectEvent } from "./connect-event";

const BarcodeEventName = 'Barcode';
export class BarcodeEvent extends ConnectEvent {
  readonly name = BarcodeEventName;
  static readonly eventName = BarcodeEventName;

  data: string = '';

  constructor(data: string) {
    super(data);
    this.data = data;
  }


  public static parse(deviceInfo: Buffer): BarcodeEvent
  public static parse(deviceInfo: string): BarcodeEvent
  public static parse(deviceInfo: string | Buffer): BarcodeEvent
  public static parse(deviceInfo: string | Buffer): BarcodeEvent {
    if (deviceInfo instanceof Buffer) {
      return BarcodeEvent.fromBuffer(deviceInfo);
    } else if (typeof deviceInfo === 'string') {
      return BarcodeEvent.fromString(deviceInfo);
    } else {
      throw new Error('Not supported')
    }
  }

  private static fromString(deviceInfoInString: string): BarcodeEvent {
    if (typeof deviceInfoInString !== 'string') {
      deviceInfoInString = '';
    }
    deviceInfoInString = deviceInfoInString.trim();
    if (deviceInfoInString.startsWith('"') && deviceInfoInString.endsWith('"')) {
      deviceInfoInString = deviceInfoInString.substring(1, deviceInfoInString.length - 1);
    }
    const [, data] = deviceInfoInString.split(':');
    return new BarcodeEvent(data);
  }

  private static fromBuffer(deviceInfoInBuffer: Buffer): BarcodeEvent {
    const deviceInfoInString = deviceInfoInBuffer.toString();
    return this.fromString(deviceInfoInString);
  }
}