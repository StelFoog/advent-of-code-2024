import { input } from "../src/inputManager";

const HEAD = "A";
const TAIL = ["SM", "MS"];

const chars = input.split("\n");
let sum = 0;
for (let i = 0; i < chars.length; i++) {
	for (let j = 0; j < chars[i].length; j++) {
		if (
			chars[i][j] === HEAD &&
			TAIL.includes(chars[i - 1]?.[j - 1] + chars[i + 1]?.[j + 1]) &&
			TAIL.includes(chars[i - 1]?.[j + 1] + chars[i + 1]?.[j - 1])
		)
			sum++;
	}
}
console.log(sum);
