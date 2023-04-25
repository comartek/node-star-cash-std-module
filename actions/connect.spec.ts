import { ConnectEvent } from "../models/connect-event";
import { StarCashClient } from "../star-cash-client";

describe('Star Cash Client > Connect', () => {
  it('should able to connect', (done) => {
    const client = new StarCashClient('example-connect.bat');
    let counter = 0;
    client.connect('USBPRN:Star POP10').subscribe({
      next(value: ConnectEvent) {
        counter++;
      },
      error(error) {
        done(error);
      },
      complete() {
        if (counter == 8) {
          done();
        } else {
          done(new Error('Incorrect event counts'))
        }
      }
    })
  });
});