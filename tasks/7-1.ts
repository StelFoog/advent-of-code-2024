import elf from "elf-help";
import { input } from "../src/inputManager";

let count = 0;
for (const line of input.split("\n")) {
	const [target, ...values] = elf.parseNumbers(line, { alsoSplitOn: ":" });

	const queue: [number, number[]][] = [[values[0], values.slice(1)]];
	while (queue.length) {
		const [res, [head, ...tail]] = queue.shift()!;

		let sum = res + head;
		let prod = res * head;
		if ([sum, prod].includes(target) && !tail.length) {
			count += target;
			break;
		}
		if (!tail.length) continue;
		if (sum <= target) queue.push([sum, tail]);
		if (prod <= target) queue.push([prod, tail]);
	}
}
console.log(count);
