import { spawn } from "child_process";
import { Observable } from "rxjs";
import { NewLineStream } from "../helpers/new-line-stream";
import { StarCashClient } from "../star-cash-client";


export function openCash(this: StarCashClient, portName: string) {
  const theCommand = this.command;
  return new Observable(function subscribe(subscriber) {
    const childProcess = spawn(theCommand, ['opencash -p ' + portName]);

    const wsStdOut = new NewLineStream();
    const wsStrErr = new NewLineStream();

    childProcess.stdout.pipe(wsStdOut);
    childProcess.stderr.pipe(wsStrErr);

    wsStdOut.on('data', (buffer: Buffer) => {
      subscriber.next({ name: 'OpenCash', data: buffer.toString() });
    });

    wsStrErr.on('data', (buffer: Buffer) => {
      subscriber.error(new Error('STD Error: ' + buffer.toString()))
    });

    childProcess.on('close', () => {
      subscriber.complete();
    });

    return function unsubscribe() {
      childProcess.unref();
      wsStdOut.destroy();
      wsStrErr.destroy();
    };
  })

}