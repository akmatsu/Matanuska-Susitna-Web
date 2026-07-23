/**
 * Retries a given asynchronous function a specified number of times if it fails, with a delay between attempts.
 */
export async function retry<T = unknown>(
  fn: (signal: AbortSignal) => Promise<T>,
  signal: AbortSignal,
  maxRetries = 1,
  delayMs = 200,
): Promise<T | undefined> {
  let lastError: Error | null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn(signal);
    } catch (error) {
      // If the error is an instance of Error, use it directly; otherwise, create a new Error with the stringified error message
      lastError = error instanceof Error ? error : new Error(String(error));

      // Never retry on abort - The caller intentionally cancelled the request
      if (error instanceof Error && error.name === 'AbortError') throw error;

      if (attempt < maxRetries) {
        console.warn(
          `Request attempt ${attempt + 1} failed. Retrying...`,
          lastError.message,
        );

        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }

    throw (
      lastError ?? new Error('An unknown error occurred during retry attempts')
    );
  }
}
