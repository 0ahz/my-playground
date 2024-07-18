import * as Comlink from 'comlink';

const counterObj = {
  counter: 0,
  inc() {
    this.counter++;
  },
};

Comlink.expose(counterObj);
