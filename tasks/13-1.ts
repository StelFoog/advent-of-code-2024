import elf from "elf-help";
import { input } from "../src/inputManager";

let tokens = 0;
for (const p of input.split("\n\n")) {
	const [ax, ay, bx, by, px, py] = elf.parseNumbers(p, { alsoSplitOn: ["+", "=", ","] });
	for (let i = 0; ax * i <= px && i <= 100; i++) {
		const bxi = (px - ax * i) / bx;
		const byi = (py - ay * i) / by;
		if (bxi !== byi || !Number.isInteger(bxi)) continue;
		tokens += i * 3 + bxi;
		break;
	}
}
console.log(tokens);
