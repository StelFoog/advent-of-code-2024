# Advent of Code 2024

Solutions to Advent of Code 2024 using TypeScript and Bun.

<sub><sup>Project was bootstaped using `create-aoc-tasks`.</sup></sub>

## Managing tasks

Tasks are stored in the format of `day-task.ts` within the tasks folder, e.g. for day 12 task 1 the file would be `tasks/12-1.ts`.

`bun make-day [day]` can be used to automatically create task and input files for the provided day. If an `AOC_SESSION` variable is provided into `.env` your input will also be fetched.

## Running

Install dependencies: `bun install`

Any task can be run using `bun task` which by default runs the last task (can also be done explicitly with `bun task latest`). Alternativly a day `bun task [day]` (which will try to run part 2 first and part 1 secondly), or a specific task (`bun task [day-part]`).

Tasks try to get input specific to that day (e.g for task `4-1`, it will get `inputs/4.txt`) or, if it doesn't exist, the default input (`inputs/default.txt`).

It's also possible to use example inputs by including `true` after the task to be run (e.g. `bun task latest true`), which work the same as regular inputs, but placed within the `example.txt` file in the inputs folder.

## Progress

- [x] Day 1
- [x] Day 2
- [x] Day 3
- [x] Day 4
- [x] Day 5
- [x] Day 6 ❄️
- [x] Day 7
- [x] Day 8
- [x] Day 9
- [x] Day 10
- [x] Day 11
- [x] Day 12
- [x] Day 13
- [x] Day 14
- [x] Day 15
- [x] Day 16
- [x] Day 17
- [ ] Day 18
- [ ] Day 19
- [ ] Day 20
- [ ] Day 21
- [ ] Day 22
- [ ] Day 23
- [ ] Day 24 🎄
- [ ] Day 25
