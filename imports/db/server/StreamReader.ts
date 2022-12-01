export default class StreamReader {
  private buffer: Buffer;

  private offset = 0;

  constructor(buffer: Buffer) {
    this.buffer = buffer;
  }

  public get atEnd() {
    return this.offset >= this.buffer.length;
  }

  public next() {
    this.offset += 4;
    const size = this.buffer.readInt32BE(this.offset);
    this.offset += 4 + size;
    const s = this.buffer.toString('utf-8', this.offset - size, this.offset);
    const timestamp = new Date(s.substring(0, 35).trim());
    const text = s.substring(36).trim();
    return { timestamp: timestamp.valueOf(), text };
  }
}
