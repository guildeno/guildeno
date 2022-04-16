export enum OpCode {
    /**
     * Possible op codes (still investigating)
     * 0
     * 1
     * 2
     * 8
     * 9
     */
    /** Send by Guilded to notify the Shard about events. */
    Dispatch = 0,
    /** Send by Guilded after a connection has been successfully established. */
    Welcome = 1,
    /**
     * Send by Guilded when a resume was successful.
     * AKA all missed events (opcode 0) have been send to the Shard.
     */
    Resumed = 2,
}
