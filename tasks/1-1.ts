import elf from "elf-help";
import { input } from "../src/inputManager";

const left: number[] = [];
const right: number[] = [];

input.split("\n").forEach((line) => {
	const [l, r] = elf.parseNumbers(line);
	left.push(l);
	right.push(r);
});

left.sort((a, b) => a - b);
right.sort((a, b) => a - b);

let res = 0;
for (let i = 0; i < left.length; i++) {
	res += Math.abs(left[i] - right[i]);
}

console.log(res);
