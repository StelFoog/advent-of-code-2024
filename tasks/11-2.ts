import elf from "elf-help";
import { input } from "../src/inputManager";

const STEPS = 75;
let cache: Record<number, Record<number, number>> = {};

let sum = 0;
for (const stone of elf.parseNumbers(input)) {
	sum += getStoneAmount(stone, 0);
}
console.log(sum);

function getStoneAmount(stone: number, step: number) {
	if (cache[stone]?.[step]) return cache[stone][step];
	if (step === STEPS) return 1;

	const str = String(stone);
	let res = 0;
	if (stone === 0) res += getStoneAmount(1, step + 1);
	else if (str.length % 2 === 0) {
		res += getStoneAmount(Number(str.slice(0, str.length / 2)), step + 1);
		res += getStoneAmount(Number(str.slice(str.length / 2)), step + 1);
	} else {
		res += getStoneAmount(stone * 2024, step + 1);
	}

	if (!cache[stone]) cache[stone] = {};
	cache[stone][step] = res;

	return res;
}
