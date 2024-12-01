import elf from "elf-help";
import { input } from "../src/inputManager";

const left: number[] = [];
const right: Record<number, number> = {};

input.split("\n").forEach((line) => {
	const [l, r] = elf.parseNumbers(line);
	left.push(l);
	right[r] = (right[r] ?? 0) + 1;
});

let res = 0;
for (const curr of left) {
	res += curr * (right[curr] ?? 0);
}

console.log(res);
