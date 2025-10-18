export class AbortError extends Error {
    constructor() {
        super('Request Aborted');
        this.name = 'AbortError';
    }
}