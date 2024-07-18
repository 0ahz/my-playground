import * as comlink from 'comlink';

export default class CounterService {
  counter = 0;

  inc() {
    this.counter++;
    while (this.counter < 10000000000) {
      this.counter++;
    }
  }
}

comlink.expose(CounterService);
