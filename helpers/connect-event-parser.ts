import { BarcodeEvent } from "../models/barcode-event";
import { CashDrawerEvent } from "../models/cash-drawer-event";
import { PrinterEvent } from "../models/printer-event";
import { ReaderEvent } from "../models/reader-event";

export function connectEventParser(eventData: string | Buffer): BarcodeEvent | CashDrawerEvent | PrinterEvent | ReaderEvent {
  let eventInString = '';
  if (typeof eventData === 'string') {
    eventInString = eventData;
  }
  if (eventData instanceof Buffer) {
    eventInString = eventData.toString();
  }

  eventInString = eventInString.trim();

  if (eventInString.startsWith('"') && eventInString.endsWith('"')) {
    eventInString = eventInString.substring(1, eventInString.length - 1);
  }

  if (eventInString.startsWith("'") && eventInString.endsWith("'")) {
    eventInString = eventInString.substring(1, eventInString.length - 1);
  }

  const [name] = eventInString.split(':');

  switch (name) {
    case BarcodeEvent.eventName: {
      return BarcodeEvent.parse(eventData);
    }

    case CashDrawerEvent.eventName: {
      return CashDrawerEvent.parse(eventData);
    }

    case PrinterEvent.eventName: {
      return PrinterEvent.parse(eventData);
    }

    case ReaderEvent.eventName: {
      return ReaderEvent.parse(eventData);
    }

    default:
      throw new Error('Not supported');
  }
}