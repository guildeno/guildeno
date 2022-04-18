# Guildeno Gateway

<img align="right" src="https://img.guildedcdn.com/MediaChannelUpload/ec413bb62f7b33b511cee8dd36e504fb-Full.png?w=1024&h=1024" height="150px" style="border-radius= 50%">

This package contains the code for Guildeno's Gateway.

Guildeno follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html)

[![Guilded](https://img.shields.io/badge/Guilded%20Server-Click%20To%20Join!-yellow)](https://www.guilded.gg/guildeno)

## Installation

Install with [NPM](https://npmjs.com):

```shell
$ npm install @guildeno/gateway @guildeno/types
```

`@guildeno/types` is necessary because it provides Gateway related enums such as `OpCode`, which are used internally.

## Usage

```typescript
import { createShard } from "@guildeno/gateway";

const shard = createShard({
    token: process.env.TOKEN,
    events: {
        message: (_shard, payload) => {
            console.log("[EVENT]", payload);
        },
    },
});

shard.connect();
```
