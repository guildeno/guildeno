# Guildeno

<img align="right" src="https://img.guildedcdn.com/MediaChannelUpload/ec413bb62f7b33b511cee8dd36e504fb-Full.png?w=1024&h=1024" height="150px" style="border-radius= 50%">

Guilded API Wrapper for Node.js.

Guildeno follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html)

[![Guilded](https://img.shields.io/badge/Guilded%20Server-Click%20To%20Join!-yellow)](https://www.guilded.gg/guildeno)

# WIP

This module is still version 0 so heavy in development. Expect breaking changes without a major bump.
In addition to that, Guilded's API is also in development as of now. This means that bots could stop working unexpectedly.

Right now Guildeno isn't my top priority so version 1 may come late.

## Contributing

Before contributing, please read our [Contributing Guidelines](https://github.com/guildeno/guildeno/blob/main/.github/CONTRIBUTING.md).

## Discordeno

Guildeno is heavily inspired by [Discordeno](https://github.com/discordeno/discordeno) so check it out!

## Name

Initially I wanted this library to run on over the `Deno` runtime and use `dnt` (hence the name Guildeno) to convert it to a `Node.js` compatible package.
But due to Guilded's decision to make gateway authentication over a header this is currently impossible to implement.
