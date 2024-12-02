import elf from "elf-help";
import { input } from "../src/inputManager";

let safe = 0;
for (const line of input.split("\n")) {
	const report = elf.parseNumbers(line);
	let reportSafe = false;
	for (const local of elf.combinations(report, report.length - 1)) {
		let increase = local[0] < local[1];
		let i = 1;
		for (; i < local.length; i++) {
			if (increase && local[i - 1] >= local[i]) break;
			if (!increase && local[i - 1] <= local[i]) break;
			if (Math.abs(local[i - 1] - local[i]) > 3) break;
		}
		if (i >= local.length) {
			reportSafe = true;
			break;
		}
	}
	if (reportSafe) safe++;
}
console.log(safe);
