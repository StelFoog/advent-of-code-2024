import elf from "elf-help";
import { input } from "../src/inputManager";

const mulRegex = /mul\((\d+,\d+)\)/g;
let match = mulRegex.exec(input);
let sum = 0;
while (match) {
	sum += elf.product(...elf.parseNumbers(match[1], { alsoSplitOn: "," }));
	match = mulRegex.exec(input);
}
console.log(sum);
