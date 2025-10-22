import { AbortError } from '../utils/AbortError';

export async function retryWithBackoff<T>(
    fn: () => Promise<T>,
    retries= 3,
    delay= 500,
    signal?: AbortSignal
): Promise<T> {
    try {
        return await fn();
    } catch (err) {
        if (signal?.aborted) {
            throw new AbortError();
        }

        if (retries <= 0) {
            throw err;
          }

          await new Promise((res) => setTimeout(res, delay));

          return retryWithBackoff(fn, retries - 1, delay * 2, signal);
    }
}