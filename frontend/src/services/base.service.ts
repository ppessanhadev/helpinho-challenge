import { Signal, computed, signal } from '@angular/core';

export class BaseStoreService<T> {
  protected state = signal({} as T);

  public select<K extends keyof T>(key: K): Signal<T[K]> {
    return computed(() => this.state()[key]);
  }

  public set<K extends keyof T>(key: K, data: T[K]) {
    this.state.update((currentValue) => ({ ...currentValue, [key]: data }));
  }

  public setState(partialState: Partial<T>): void {
    this.state.update((currentValue) => ({ ...currentValue, ...partialState }));
  }

  public increment<K extends keyof T>(key: K) {
    this.state.update((currentValue) => ({
      ...currentValue,
      [key]: (currentValue[key] as number) + 1,
    }));
  }

  public decrement<K extends keyof T>(key: K) {
    this.state.update((currentValue) => ({
      ...currentValue,
      [key]: (currentValue[key] as number) - 1,
    }));
  }
}
