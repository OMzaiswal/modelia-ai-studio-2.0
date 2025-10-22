export class AbortError extends Error {
    constructor(message = "Request Aborted") {
      super(message);
      this.name = "AbortError";
    }
  }