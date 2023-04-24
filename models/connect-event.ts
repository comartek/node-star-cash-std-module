export abstract class ConnectEvent {
  readonly name: string = '';
  data: string = '';
  constructor(data: string) {
    this.data = data;
  }
}