import elf from "elf-help";
import { input } from "../src/inputManager";

type Register = "A" | "B" | "C";

const [regDef, inpDef] = input.split("\n\n");
const [A, B, C] = elf.parseNumbers(regDef);
const reg: Record<Register, number> = { A, B, C };
const inp = elf.parseNumbers(inpDef, { alsoSplitOn: "," });

const output: number[] = [];
for (let i = 0; i >= 0 && i < inp.length; i += 2) {
	const [op, arg] = [inp[i], inp[i + 1]];
	if (op === 0) {
		// adv
		reg.A = Math.floor(reg.A / Math.pow(2, getCombo(arg)));
	} else if (op === 1) {
		// bxl
		reg.B = reg.B ^ arg;
	} else if (op === 2) {
		// bst
		reg.B = getCombo(arg) % 8;
	} else if (op === 3) {
		// jnz
		if (reg.A !== 0) i = arg - 2;
	} else if (op === 4) {
		// bxc
		reg.B = reg.B ^ reg.C;
	} else if (op === 5) {
		// out
		output.push(getCombo(arg) % 8);
	} else if (op === 6) {
		// bdv
		reg.B = Math.floor(reg.A / Math.pow(2, getCombo(arg)));
	} else if (op === 7) {
		// cdv
		reg.C = Math.floor(reg.A / Math.pow(2, getCombo(arg)));
	}
}
console.log(output.join());

function getCombo(arg: number): number {
	if (arg === 4) return reg.A;
	if (arg === 5) return reg.B;
	if (arg === 6) return reg.C;
	if (arg < 0 || arg > 3) throw "Invalid combo operator" + arg;
	return arg as 0 | 1 | 2 | 3;
}
