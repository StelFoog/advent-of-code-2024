import elf from "elf-help";
import { input } from "../src/inputManager";

const [rules, update] = input.split("\n\n");

const requires: Record<number, number[]> = {};
rules.split("\n").forEach((l) => {
	const [pre, post] = elf.parseNumbers(l, { alsoSplitOn: "|" });
	if (!requires[post]) requires[post] = [];
	requires[post].push(pre);
});

let sum = 0;
for (const line of update.split("\n")) {
	const set = new Set<number>();
	const pages = elf.parseNumbers(line, { alsoSplitOn: "," });
	let i = 0;
	for (; i < pages.length; i++) {
		const curr = pages[i];
		const reqs = (requires[curr] ?? []).filter((v) => pages.includes(v));
		if (reqs.length && reqs.some((v) => !set.has(v))) break;
		set.add(curr);
	}
	if (i === pages.length) sum += pages[Math.floor(pages.length / 2)];
}
console.log(sum);
