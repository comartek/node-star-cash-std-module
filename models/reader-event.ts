import { ReaderEventEnum } from "./reader-event.enum";
import { ConnectEvent } from "./connect-event";

const ReaderEventName = 'Reader';
export class ReaderEvent extends ConnectEvent {
  readonly name = ReaderEventName;
  public static readonly eventName = ReaderEventName;

  data: ReaderEventEnum = ReaderEventEnum.Unknown;

  constructor(data: ReaderEventEnum) {
    super(data.toString());
    this.data = data;
  }

  public static parse(deviceInfo: Buffer): ReaderEvent
  public static parse(deviceInfo: string): ReaderEvent
  public static parse(deviceInfo: string | Buffer): ReaderEvent
  public static parse(deviceInfo: string | Buffer): ReaderEvent {
    if (deviceInfo instanceof Buffer) {
      return ReaderEvent.fromBuffer(deviceInfo);
    } else if (typeof deviceInfo === 'string') {
      return ReaderEvent.fromString(deviceInfo);
    } else {
      throw new Error('Not supported')
    }
  }

  private static fromString(deviceInfoInString: string): ReaderEvent {
    if (typeof deviceInfoInString !== 'string') {
      deviceInfoInString = '';
    }
    deviceInfoInString = deviceInfoInString.trim();
    if (deviceInfoInString.startsWith('"') && deviceInfoInString.endsWith('"')) {
      deviceInfoInString = deviceInfoInString.substring(1, deviceInfoInString.length - 1);
    }
    const [, data] = deviceInfoInString.split(':');

    let parsedState = ReaderEventEnum.Unknown;
    switch (data) {
      case ReaderEventEnum.Online: {
        parsedState = ReaderEventEnum.Online;
        break;
      }
      case ReaderEventEnum.Offline: {
        parsedState = ReaderEventEnum.Offline;
        break;
      }
      default:
        break;
    }
    return new ReaderEvent(parsedState);
  }

  private static fromBuffer(deviceInfoInBuffer: Buffer): ReaderEvent {
    const deviceInfoInString = deviceInfoInBuffer.toString();
    return this.fromString(deviceInfoInString);
  }
}