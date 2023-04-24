export class DeviceInfo {
  public portName: string = '';
  public macAddress: string = '';
  public modelName: string = '';
  public usbSerialNumber: string = '';

  private constructor(data: DeviceInfo) {
    if (!data || typeof data !== 'object' || data instanceof Date || Array.isArray(data)) {
      return;
    }
    this.portName = Object.prototype.hasOwnProperty.call(data, 'portName') ? data.portName : '';
    this.macAddress = Object.prototype.hasOwnProperty.call(data, 'macAddress') ? data.macAddress : '';
    this.modelName = Object.prototype.hasOwnProperty.call(data, 'modelName') ? data.modelName : '';
    this.usbSerialNumber = Object.prototype.hasOwnProperty.call(data, 'usbSerialNumber') ? data.usbSerialNumber : '';
  }

  public static parse(deviceInfo: Buffer): DeviceInfo
  public static parse(deviceInfo: string): DeviceInfo
  public static parse(deviceInfo: string | Buffer): DeviceInfo {
    if (deviceInfo instanceof Buffer) {
      return DeviceInfo.fromBuffer(deviceInfo);
    } else if (typeof deviceInfo === 'string') {
      return DeviceInfo.fromString(deviceInfo);
    } else {
      throw new Error('Not supported')
    }
  }

  private static fromString(deviceInfoInString: string): DeviceInfo {
    if (typeof deviceInfoInString !== 'string') {
      deviceInfoInString = '';
    }
    deviceInfoInString = deviceInfoInString.trim();
    if (deviceInfoInString.startsWith('"') && deviceInfoInString.endsWith('"')) {
      deviceInfoInString = deviceInfoInString.substring(1, deviceInfoInString.length - 1);
    }
    if (deviceInfoInString.startsWith("'") && deviceInfoInString.endsWith("'")) {
      deviceInfoInString = deviceInfoInString.substring(1, deviceInfoInString.length - 1);
    }

    const [modelName, portName, macAddress, usbSerialNumber] = deviceInfoInString.split('|');

    return new DeviceInfo({ portName, macAddress, modelName, usbSerialNumber });
  }

  private static fromBuffer(deviceInfoInBuffer: Buffer) {
    const deviceInfoInString = deviceInfoInBuffer.toString();
    return this.fromString(deviceInfoInString);
  }

}