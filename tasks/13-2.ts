import elf from "elf-help";
import { input } from "../src/inputManager";

const ADD = 10_000_000_000_000;

let tokens = 0;
for (const p of input.split("\n\n")) {
	let [ax, ay, bx, by, px, py] = elf.parseNumbers(p, { alsoSplitOn: ["+", "=", ","] });
	px += ADD;
	py += ADD;

	const bi = (py * ax - ay * px) / (ax * by - ay * bx);
	if (!Number.isInteger(bi)) continue;
	const ai = (px - bx * bi) / ax;
	if (!Number.isInteger(ai)) continue;
	tokens += ai * 3 + bi;
}
console.log(tokens);
