import { input } from "../src/inputManager";

const vars: Record<string, boolean> = {};

const [def, ins] = input.split("\n\n");
for (const line of def.split("\n")) {
	const [key, val] = line.split(": ");
	vars[key] = val === "1";
}

const needs = new Set<string>();
const instructions = ins.split("\n").map((line) => {
	const [a, op, b, , out] = line.split(" ");
	if (out.startsWith("z")) needs.add(out);
	return { a, b, op: op as "AND" | "OR" | "XOR", out };
});

const queue = [...instructions];
while (queue.length && needs.size) {
	const { a, b, op, out } = queue.shift()!;
	const [av, bv] = [vars[a], vars[b]];
	if (av === undefined || bv === undefined) {
		queue.push({ a, b, op, out });
		continue;
	}
	const res = op === "AND" ? av && bv : op === "OR" ? av || bv : av !== bv;
	if (out.startsWith("z")) needs.delete(out);
	vars[out] = res;
}

const zs = Object.entries(vars)
	.map(([key, val]) =>
		key.startsWith("z") ? ([Number(key.slice(1)), val ? "1" : "0"] as [number, "1" | "0"]) : null
	)
	.filter(Boolean)
	.toSorted((a, b) => b![0] - a![0]);
console.log(Number(zs.reduce((prev, curr) => prev + curr![1], "0b")));
