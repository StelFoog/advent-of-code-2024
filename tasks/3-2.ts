import elf from "elf-help";
import { input } from "../src/inputManager";

const mulRegex = /^mul\((\d+,\d+)\)/g;
let exec = true;
let sum = 0;
for (let i = 0; i < input.length; i++) {
	let part = input.slice(i);
	if (part.startsWith("do()")) exec = true;
	else if (part.startsWith("don't()")) exec = false;
	else {
		let match = mulRegex.exec(part);
		if (match) {
			if (!exec) continue;
			sum += elf.product(...elf.parseNumbers(match[1], { alsoSplitOn: "," }));
		} else {
			let execIdx = part.search(/(do\(\)|don't\(\)|mul\(\d+,\d+\))/);
			if (execIdx !== -1) break;
			i += execIdx - 1;
		}
	}
}
console.log(sum);
