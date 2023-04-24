import { ConnectEvent } from "./connect-event";
import { PrinterEventEnum } from "./printer-event.enum";

const PrinterEventName = 'Print';
export class PrinterEvent extends ConnectEvent {
  readonly name = PrinterEventName;
  static readonly eventName = PrinterEventName;

  data: PrinterEventEnum = PrinterEventEnum.Unknown;

  private constructor(data: PrinterEventEnum) {
    super(data.toString());
    this.data = data;
  }

  public static parse(deviceInfo: Buffer): PrinterEvent
  public static parse(deviceInfo: string): PrinterEvent
  public static parse(deviceInfo: string | Buffer): PrinterEvent
  public static parse(deviceInfo: string | Buffer): PrinterEvent {
    if (deviceInfo instanceof Buffer) {
      return PrinterEvent.fromBuffer(deviceInfo);
    } else if (typeof deviceInfo === 'string') {
      return PrinterEvent.fromString(deviceInfo);
    } else {
      throw new Error('Not supported')
    }
  }

  private static fromString(deviceInfoInString: string): PrinterEvent {
    if (typeof deviceInfoInString !== 'string') {
      deviceInfoInString = '';
    }
    deviceInfoInString = deviceInfoInString.trim();
    if (deviceInfoInString.startsWith('"') && deviceInfoInString.endsWith('"')) {
      deviceInfoInString = deviceInfoInString.substring(1, deviceInfoInString.length - 1);
    }
    const [, data] = deviceInfoInString.split(':');
    let parsedState = PrinterEventEnum.Unknown;
    switch (data) {
      case PrinterEventEnum.Impossible: {
        parsedState = PrinterEventEnum.Impossible;
        break;
      }
      case PrinterEventEnum.Offline: {
        parsedState = PrinterEventEnum.Offline;
        break;
      }
      case PrinterEventEnum.Online: {
        parsedState = PrinterEventEnum.Online;
        break;
      }
      default:
        break;
    }
    return new PrinterEvent(parsedState);
  }

  private static fromBuffer(deviceInfoInBuffer: Buffer): PrinterEvent {
    const deviceInfoInString = deviceInfoInBuffer.toString();
    return this.fromString(deviceInfoInString);
  }
}