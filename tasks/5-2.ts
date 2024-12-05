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
	const pages = elf.parseNumbers(line, { alsoSplitOn: "," });
	if (isCorrectOrder(pages)) continue;

	for (let i = 0; !isCorrectOrder(pages); i++) {
		const curr = pages[i];
		const reqs = (requires[curr] ?? []).filter((v) => pages.includes(v));
		if (reqs.length && reqs.some((v) => !pages.slice(0, i).includes(v))) {
			moveToBack(pages, i);
			i--;
		}
	}
	sum += pages[Math.floor(pages.length / 2)];
}
console.log(sum);

function moveToBack(arr: number[], idx: number) {
	let temp = arr[idx];
	for (let i = idx; i < arr.length - 1; i++) arr[i] = arr[i + 1];
	arr[arr.length - 1] = temp;
}

function isCorrectOrder(pages: number[]) {
	const set = new Set<number>();
	let i = 0;
	for (; i < pages.length; i++) {
		const curr = pages[i];
		const reqs = (requires[curr] ?? []).filter((v) => pages.includes(v));
		if (reqs.length && reqs.some((v) => !set.has(v))) break;
		set.add(curr);
	}
	return i === pages.length;
}
