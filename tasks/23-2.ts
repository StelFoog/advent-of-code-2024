import { input } from "../src/inputManager";

const computers: Record<string, string[]> = {};
for (const line of input.split("\n")) {
	const [a, b] = line.split("-");
	if (!computers[a]) computers[a] = [];
	computers[a].push(b);
	if (!computers[b]) computers[b] = [];
	computers[b].push(a);
}

let max = 0;
let password = "";
const combinations: Record<string, number> = {};
function setCombination(...prev: string[]) {
	const key = prev.toSorted().join();
	if (combinations[key]) return;
	combinations[key] = prev.length;
	if (prev.length > max) {
		max = prev.length;
		password = key;
	}

	for (const connect of computers[prev[0]].filter((c) => !prev.includes(c)))
		if (prev.every((p) => computers[p].includes(connect))) setCombination(...prev, connect);
}
for (const key in computers) setCombination(key);

console.log(password);
