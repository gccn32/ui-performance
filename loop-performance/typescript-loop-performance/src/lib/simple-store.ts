interface StoreListener<S, T> {
  selector: (state: S) => T;
  listener: (data: T) => any;
  prevResult: T;
}
interface ReducerRecord<T extends Record<string, any>> {
  key: keyof T;
  reducer: <N extends keyof T>(state: T[N], action: unknown) => T[N];
}

export function createAction<T>(name: string) {
  function builder(payload?: T): { name: string; payload: T | undefined } {
    return { name, payload: payload };
  }
  builder.match = (action: unknown): action is { name: string; payload: T } => {
    return (action as any).name === name;
  };
  return builder;
}

export class SimpleStore<S extends Record<string, any>> {
  private state: S;
  private reducers: ReducerRecord<S>[] = [];
  private listeners: StoreListener<S, any>[] = [];

  constructor(initialState: S) {
    this.state = initialState;
  }

  registerReducer<K extends keyof S>(propName: K, reducer: (state: S[K], action: unknown) => S[K]) {
    const record = { key: propName, reducer } as ReducerRecord<S>;
    this.reducers.push(record);
  }

  subscribe<T>(selector: (state: S) => T, listener: (data: T) => any) {
    const res = selector(this.state);
    this.listeners.push({ selector, listener, prevResult: res });
    listener(res);
  }

  dispatch(action: unknown) {
    let stateChanged = false;
    const newState = { ...this.state };
    for (const { key, reducer } of this.reducers) {
      newState[key] = reducer(this.state[key], action);
      stateChanged = stateChanged || newState[key] != this.state[key];
    }
    if (!stateChanged) return;

    this.state = newState;

    this.listeners.forEach((descriptor) => {
      const res = descriptor.selector(this.state);
      if (descriptor.prevResult !== res) {
        descriptor.prevResult = res;
        descriptor.listener(res);
      }
    });
  }
}
