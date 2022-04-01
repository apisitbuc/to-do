/* eslint-disable @typescript-eslint/no-explicit-any */
import { onShutdown } from 'node-graceful-shutdown';

export type ShutdownCallback = (err?: any) => any;
export type ShutdownFn = (cb: ShutdownCallback) => any;
export type depsOrFn = string[] | ShutdownFn;

export function gracefulShutdown(
  name: string,
  dependencies: string[],
  shutdownFn: ShutdownFn,
): void;

export function gracefulShutdown(name: string, shutdownFn: ShutdownFn): void;

export function gracefulShutdown(
  name: string,
  dependenciesOrShutdownFunction: depsOrFn,
  shutdownFn?: ShutdownFn,
) {
  let _shutdownFn = shutdownFn;
  let _deps;

  if (typeof dependenciesOrShutdownFunction === 'function') {
    _shutdownFn = dependenciesOrShutdownFunction;
  } else {
    _deps = dependenciesOrShutdownFunction;
  }

  onShutdown(name, _deps, async () => {
    await new Promise((resolve, reject) => {
      doShutdown(_shutdownFn!, resolve, reject);
    }).catch((err) => {
      throw err;
    });
  });
}

function doShutdown(
  _shutdownFn: ShutdownFn,
  resolve: (value?: any) => any,
  reject: (value?: any) => any,
) {
  try {
    const result = _shutdownFn!((err) => {
      if (err) return reject(err);
      resolve();
    });

    if (result && 'then' in result) {
      resolve(result);
    }
  } catch (err) {
    reject(err);
  }
}
