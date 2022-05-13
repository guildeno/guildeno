import { humanizeMilliseconds } from "./humanizeMilliseconds";
import { log } from "./logger";

async function executeTask(task: Task) {
    const now = Date.now();
    log.info(`[TASKS] Started task ${task.name}`);

    try {
        await task.execute();
    } catch (error) {
        log.error(`[TASKS] Error executing task ${task.name}`, "\n", error);
    }

    log.info(`[TASKS] Finished task ${task.name} in ${humanizeMilliseconds(Date.now() - now)}`);
}

export function registerTask(task: Task) {
    const firstExecuteDelay = task.interval - (Date.now() % task.interval);

    log.info(`[TASKS] Registering Task "${task.name}". First execute in ${humanizeMilliseconds(firstExecuteDelay)}.`);

    /*
     * For the first execution we calculate the remaining time,
     * so we can go sure the task runs at the correct time.
     */
    setTimeout(async () => {
        /*
         * Now first set an interval,
         * so we can go sure future executions are at the correct interval.
         */
        setInterval(async () => {
            await executeTask(task);
        }, task.interval);

        // Finally execute the task for the first time.
        await executeTask(task);
    }, firstExecuteDelay);
}

export type Task = {
    /** Name of the task. */
    name: string;
    /** Interval in milliseconds in which the task should run. */
    interval: number;
    /** Function which gets called when the task got to it's execution time. */
    execute: () => unknown;
};
