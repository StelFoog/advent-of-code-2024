import { input } from "../src/inputManager";

const paragraphs = input.split("\n\n");
const height = paragraphs[0].split("\n").length;
const width = paragraphs[0].split("\n")[0].length;

const locks: number[][] = [];
const keys: number[][] = [];

for (const p of paragraphs) {
	const lines = p.split("\n");
	let cols: number[] = [];
	for (const line of lines) {
		for (let j = 0; j < height; j++) if (line[j] === "#") cols[j] = (cols[j] ?? 0) + 1;
	}
	if (lines[0] === lines[0].replace(/\./g, "#")) locks.push(cols);
	else keys.push(cols.map((v) => v - 1));
}

let sum = 0;
for (const key of keys) {
	for (const lock of locks) {
		if (key.every((col, idx) => col + lock[idx] < height)) sum++;
	}
}
console.log(sum);
