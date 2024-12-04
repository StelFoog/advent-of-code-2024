import { input } from "../src/inputManager";

const HEAD = "XMAS"[0];
const TAIL = "XMAS".slice(1);

const chars = input.split("\n");
let sum = 0;
for (let i = 0; i < chars.length; i++) {
	for (let j = 0; j < chars[i].length; j++) {
		if (chars[i][j] !== HEAD) continue;
		if (chars[i]?.[j + 1] + chars[i]?.[j + 2] + chars[i]?.[j + 3] === TAIL) sum++;
		if (chars[i]?.[j - 1] + chars[i]?.[j - 2] + chars[i]?.[j - 3] === TAIL) sum++;
		if (chars[i + 1]?.[j] + chars[i + 2]?.[j] + chars[i + 3]?.[j] === TAIL) sum++;
		if (chars[i - 1]?.[j] + chars[i - 2]?.[j] + chars[i - 3]?.[j] === TAIL) sum++;
		if (chars[i + 1]?.[j + 1] + chars[i + 2]?.[j + 2] + chars[i + 3]?.[j + 3] === TAIL) sum++;
		if (chars[i + 1]?.[j - 1] + chars[i + 2]?.[j - 2] + chars[i + 3]?.[j - 3] === TAIL) sum++;
		if (chars[i - 1]?.[j - 1] + chars[i - 2]?.[j - 2] + chars[i - 3]?.[j - 3] === TAIL) sum++;
		if (chars[i - 1]?.[j + 1] + chars[i - 2]?.[j + 2] + chars[i - 3]?.[j + 3] === TAIL) sum++;
	}
}
console.log(sum);
