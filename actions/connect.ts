import { spawn } from "child_process";
import { Observable } from "rxjs";
import { connectEventParser } from "../helpers/connect-event-parser";
import { NewLineStream } from "../helpers/new-line-stream";
import { BarcodeEvent } from "../models/barcode-event";
import { CashDrawerEvent } from "../models/cash-drawer-event";
import { PrinterEvent } from "../models/printer-event";
import { ReaderEvent } from "../models/reader-event";
import { StarCashClient } from "../star-cash-client";


export function connect(this: StarCashClient, portName: string) {
  const theCommand = this.command;
  return new Observable<BarcodeEvent | CashDrawerEvent | PrinterEvent | ReaderEvent>(function subscribe(subscriber) {
    const args = ['connect', '--port', portName];
    const childProcess = spawn(theCommand, args);

    const wsStdOut = new NewLineStream();
    const wsStrErr = new NewLineStream();

    childProcess.stdout.pipe(wsStdOut);
    childProcess.stderr.pipe(wsStrErr);

    wsStdOut.on('data', (buffer: Buffer) => {
      subscriber.next(connectEventParser(buffer));
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