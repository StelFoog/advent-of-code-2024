import { input } from "../src/inputManager";

const [t, c] = input.split("\n\n");
const towels = t.split(", ");
const combos = c.split("\n");

const prev: Record<string, boolean> = {};

let sum = 0;
for (const combo of combos) {
	if (hasCombination(combo)) sum++;
}
console.log(sum);

function hasCombination(target: string): boolean {
	if (prev[target] !== undefined) return prev[target];

	for (const towel of towels) {
		if (
			target === towel ||
			(target.startsWith(towel) && hasCombination(target.slice(towel.length)))
		) {
			prev[target] = true;
			return true;
		}
	}
	prev[target] = false;
	return false;
}
