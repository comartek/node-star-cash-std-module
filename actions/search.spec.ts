import { ConnectEvent } from "../models/connect-event";
import { DeviceInfo } from "../models/device-info";
import { StarCashClient } from "../star-cash-client";

describe('Star Cash Client > Search', () => {
  it('should search for devices', (done) => {
    const client = new StarCashClient('example-search-devices.bat');
    let counter = 0;
    client.search().subscribe({
      next(device: DeviceInfo) {
        counter++;
      },
      error(error) {
        done(error);
      },
      complete() {
        if (counter == 4) {
          done();
        } else {
          done(new Error('Incorrect event counts'))
        }
      }
    })
  });
});