export function sleep(ms: number): Promise<unknown> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function minDelay<T>(promise: Promise<T>, ms: number) : Promise<T> {
    const [p] = await Promise.all([promise, sleep(ms)])

    return p;
}