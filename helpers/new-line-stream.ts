import { Transform } from "stream";

export class NewLineStream extends Transform {
  constructor() {
    super({
      encoding: 'utf-8',
      transform(chunk: Buffer, _, callback) {
        let chunkInString = chunk.toString();
        const chunks = chunkInString.split('\r\n').filter(({ length }) => length).map(Buffer.from);
        for (const iterator of chunks) {
          this.push(iterator)
        }
        callback(null)
      },
    })
  }
}