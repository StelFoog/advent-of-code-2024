import { write } from "bun";
import { input } from "../src/inputManager";

const vars: Record<string, boolean> = {};

const [def, ins] = input.split("\n\n");
for (const line of def.split("\n")) {
	const [key, val] = line.split(": ");
	vars[key] = val === "1";
}

const zOut = new Set<string>();
const instructions = ins.split("\n").map((line) => {
	const [a, op, b, , out] = line.split(" ");
	if (out.startsWith("z")) zOut.add(out);
	return { a, b, op: op as "AND" | "OR" | "XOR", out };
});

let dotContent = "";
const ops = { AND: 0, OR: 0, XOR: 0 };
for (const inst of instructions) {
	const op = inst.op;
	dotContent += `  ${inst.a} -> ${op}${ops[op]};\n`;
	dotContent += `  ${inst.b} -> ${op}${ops[op]};\n`;
	dotContent += `  ${op}${ops[op]} -> ${inst.out};\n`;
	ops[op]++;
}

dotContent += "\n";
for (const z of Array.from(zOut).toSorted()) {
	dotContent += `  ${z} -> zout;\n`;
}

let dotHead = "  node [shape=circle]";
for (const initial in vars) {
	dotHead += `  ${initial} [shape=box];\n`;
}
for (const z of zOut) {
	dotHead += `  ${z} [shape=diamond];\n`;
}
dotHead += "  zout [shape=octagon];\n";

dotHead += "\n";
for (let i = 0; i < ops.AND; i++) dotHead += `  AND${i}[label="AND"]`;
for (let i = 0; i < ops.OR; i++) dotHead += `  OR${i}[label="OR"]`;
for (let i = 0; i < ops.XOR; i++) dotHead += `  XOR${i}[label="XOR"]`;

write("./tmp.dot", `digraph G {\n${dotHead}\n${dotContent}\n}`);
console.log(
	"Use:\n\ndot < ./tmp.dot -Tsvg > ./output.svg\n\nTo generate a graph in svg format and open in browser to manually find the incorrect pairs"
);
