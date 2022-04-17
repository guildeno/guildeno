# Introduction

First off, thank you for considering contributing to Guildeno. It's people like you that make Guildeno great!

### Why read these guidelines

Following these guidelines helps to communicate your changes to the maintainers and back. Reviewing changes take a bit of time and when you follow the
guidelines its even less. Also then you don't have to make changes later to fit these guidelines.

### Contributions we are looking for

Keep an open mind! Improving documentation, bug hunting, or writing tutorials are all examples of helpful contributions.

### Contributions we are NOT looking for

Please do not open issues for support questions. If you have any questions join our guilded server(https://guilded.gg/guildeno) or use GitHubs discussion feature.

# Ground Rules

### How should a contribution look like

-   Ensure cross-platform compatibility for every change that's accepted. Windows, Mac and Linux.
-   Create issues for any changes and enhancements that you wish to make. Discuss things transparently and get community feedback.
-   Don't add any classes to the codebase unless absolutely needed since this is a functional lib.
-   Keep feature additions as small as possible, preferably one feature per PR.
-   Be welcoming to newcomers and encourage diverse new contributors from all backgrounds.

# Your First Contribution

Unsure where to begin contributing to Guildeno? You can start by looking through these beginner and help-wanted issues:
Beginner issues - issues which should only require a few lines of code, and a test or two.
Help wanted issues - issues which should be a bit more involved than beginner issues.

# How to open an issue

### Security vulnerabilities

If you find a security vulnerability, do NOT open an issue. Direct Message me ITOH on guilded instead (https://guilded.gg/itoh).

In order to determine whether you are dealing with a security issue, ask yourself these two questions:

> Can I access something that's not mine, or something I shouldn't have access to?

If the answer to this question is "yes", then you're probably dealing with a security issue. Note that even if you answer "no" to both questions, you may still be dealing with a security issue, so if you're unsure, just DM me ITOH on guilded (https://guilded.gg/itoh).

### Open the issue

Please use the appropriate issue template.

# Pull Requests

### How to submit a PR

-   Before submiting a PR open an issue so we all can discuss how the best approach could be.
-   Every contribution must be made under the Apache-2.0 License. We don't accept any sub licensing or simmilar.
-   For every new feature added you have to add at least one test case for it.
-   Do NOT use code from others unless they give you explicit permission.
-   Changelogs are important so always add a note to `CHANGELOG.md`.

### Small PRs

Small contributions such as fixing spelling errors, adding comments etc. can be submitted without opening an issue first.

> As a rule of thumb, changes are obvious fixes if they do not introduce any new functionality or creative thinking. As long as the change does not affect functionality, some likely examples include the following:
>
> -   Spelling / grammar fixes
> -   Typo correction, white space and formatting changes
> -   Comment clean up
> -   Bug fixes that change default return values or error codes stored in constants

### Code review process

The core team reviews Pull Requests on a regular basis. We may change the PRs title to a more verbose one.

After feedback has been given we expect responses within one week. After one week we may close the pull request if it isn't showing any activity.

### Style Guide

-   Use Prettier to format your changes
-   Use underscores as a separator in filenames.
-   Comply with these guidelines for inclusive code.
-   Functions should not have more than 4 arguments. If so additional arguments should be placed into an object.
-   Top-level functions should not use fat arrow syntax.
