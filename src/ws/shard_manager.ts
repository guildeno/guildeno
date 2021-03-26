import { createShard } from "./shard.ts";

// deno-lint-ignore require-await
export async function spawnShards(hmac: string) {
  createShard(hmac);
}
