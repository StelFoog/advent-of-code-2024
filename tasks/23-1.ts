import { input } from "../src/inputManager";

const computers: Record<string, string[]> = {};
for (const line of input.split("\n")) {
	const [a, b] = line.split("-");
	if (!computers[a]) computers[a] = [];
	computers[a].push(b);
	if (!computers[b]) computers[b] = [];
	computers[b].push(a);
}

let triangles = new Set<string>();
for (const key in computers) {
	if (!key.startsWith("t")) continue;
	const connected = computers[key];
	for (let i = 0; i < connected.length; i++) {
		for (const found of computers[connected[i]].filter((c) => connected.slice(i).includes(c)))
			triangles.add([key, connected[i], found].toSorted().join("-"));
	}
}

console.log(triangles.size);
