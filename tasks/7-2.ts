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
		let concat = Number(String(res) + String(head));
		if ([sum, prod, concat].includes(target) && !tail.length) {
			count += target;
			break;
		}
		if (!tail.length) continue;
		if (sum <= target) queue.push([sum, tail]);
		if (prod <= target) queue.push([prod, tail]);
		if (concat <= target) queue.push([concat, tail]);
	}
}
console.log(count);
