import { spawn } from "child_process";
import { Observable } from "rxjs";
import { NewLineStream } from "../helpers/new-line-stream";
import { DeviceInfo } from "../models/device-info";
import { StarCashClient } from "../star-cash-client";


export function search(this: StarCashClient) {
  const theCommand = this.command;
  return new Observable<DeviceInfo>(function subscribe(subscriber) {
    const childProcess = spawn(theCommand, ['search']);

    const wsStdOut = new NewLineStream();
    const wsStrErr = new NewLineStream();

    childProcess.stdout.pipe(wsStdOut);
    childProcess.stderr.pipe(wsStrErr);

    wsStdOut.on('data', (buffer: Buffer) => {
      subscriber.next(DeviceInfo.parse(buffer));
    });

    wsStrErr.on('data', (buffer: Buffer) => {
      subscriber.error(new Error('STD Error: ' + buffer.toString()))
    });

    childProcess.on('close', () => {
      subscriber.complete();
    });

    return function unsubscribe() {
      childProcess.unref();
    };
  });
}