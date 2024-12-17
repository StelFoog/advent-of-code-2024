import elf from "elf-help";
import { input } from "../src/inputManager";

type Register = "A" | "B" | "C";

const [regDef, inpDef] = input.split("\n\n");
const [, B, C] = elf.parseNumbers(regDef);
const instructions = elf.parseNumbers(inpDef, { alsoSplitOn: "," });

function find(set: bigint[] = []) {
	if (set.length === instructions.length) {
		console.log(Number(set.reduce((prev, curr) => (prev << 3n) + curr, 0n)));
		process.exit();
	}

	const target = instructions[instructions.length - set.length - 1];
	let opts: number[] = [];
	for (let a = 0n; a < 8n; a++) {
		const reg: Record<Register, bigint> = {
			A: [...set, a].reduce((prev, curr) => (prev << 3n) + curr, 0n),
			B: BigInt(B),
			C: BigInt(C),
		};
		for (let i = 0; i < instructions.length; i += 2) {
			const [op, arg] = [instructions[i], instructions[i + 1]];
			if (op === 0) {
				// adv
				reg.A = reg.A >> getCombo(reg, arg);
			} else if (op === 1) {
				// bxl
				reg.B = reg.B ^ BigInt(arg);
			} else if (op === 2) {
				// bst
				reg.B = getCombo(reg, arg) % 8n;
			} else if (op === 3) {
				// jnz
				if (reg.A !== 0n) i = arg - 2;
			} else if (op === 4) {
				// bxc
				reg.B = reg.B ^ reg.C;
			} else if (op === 5) {
				// out
				opts.push(Number(getCombo(reg, arg)) % 8);
				break;
			} else if (op === 6) {
				// bdv
				reg.B = reg.A >> getCombo(reg, arg);
			} else if (op === 7) {
				// cdv
				reg.C = reg.A >> getCombo(reg, arg);
			}
		}
	}

	for (let { v, idx } of opts.map((v, idx) => ({ v, idx }))) {
		if (v !== target) continue;
		find([...set, BigInt(idx)]);
	}
}
find();

function getCombo(reg: Record<Register, bigint>, arg: number): bigint {
	if (arg === 4) return reg.A;
	if (arg === 5) return reg.B;
	if (arg === 6) return reg.C;
	if (arg < 0 || arg > 3) throw "Invalid combo operator" + arg;
	return BigInt(arg) as 0n | 1n | 2n | 3n;
}
