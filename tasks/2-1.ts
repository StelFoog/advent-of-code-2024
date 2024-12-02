import elf from "elf-help";
import { input } from "../src/inputManager";

let safe = 0;
for (const line of input.split("\n")) {
	const report = elf.parseNumbers(line);
	let increase = report[0] < report[1];
	let i = 1;
	for (; i < report.length; i++) {
		if (increase && report[i - 1] >= report[i]) break;
		if (!increase && report[i - 1] <= report[i]) break;
		if (Math.abs(report[i - 1] - report[i]) > 3) break;
	}
	if (i >= report.length) safe++;
}
console.log(safe);
