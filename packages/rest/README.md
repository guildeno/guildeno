# Guildeno Rest

<img align="right" src="https://img.guildedcdn.com/MediaChannelUpload/ec413bb62f7b33b511cee8dd36e504fb-Full.png?w=1024&h=1024" height="150px" style="border-radius= 50%">

This package contains the code for Guildeno's Rest.

Guildeno follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html)

[![Guilded](https://img.shields.io/badge/Guilded%20Server-Click%20To%20Join!-yellow)](https://www.guilded.gg/guildeno)

## Installation

Install with [NPM](https://npmjs.com):

```shell
$ npm install @guildeno/rest
```

## Usage

```typescript
import { createRest } from "@guildeno/rest";

const rest = createRest({
    token: process.env.TOKEN,
});

(async () => {
    const message = await rest.helpers.createMessage("Channel UUID", { content: "Hello Guilded!" });

    console.log({ message });
})();
```
