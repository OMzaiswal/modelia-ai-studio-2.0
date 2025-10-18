import { AbortError } from "../errors/abortError";


const sleep = (ms: number) => new Promise((resolve) => {
    setTimeout(resolve, ms);
})

export const generateAIResponse = async (signal?: AbortSignal) => {
    await sleep(1000 + Math.random() * 1000);

    if(signal?.aborted) {
        throw new AbortError();
    }

    if(Math.random() < 0.2) {
        return "Failure"
    } else {
        return "Success"
    }

}

