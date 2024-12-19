import { input } from "../src/inputManager";

const [t, c] = input.split("\n\n");
const towels = t.split(", ");
const combos = c.split("\n");

const prev: Record<string, number> = {};

let sum = 0;
for (const combo of combos) {
	sum += hasCombination(combo);
}
console.log(sum);

function hasCombination(target: string): number {
	if (target === "") return 1;
	if (prev[target] !== undefined) return prev[target];

	let sum = 0;
	for (const towel of towels) {
		if (target.startsWith(towel)) sum += hasCombination(target.slice(towel.length));
	}
	prev[target] = sum;
	return sum;
}
