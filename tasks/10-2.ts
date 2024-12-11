import { input } from "../src/inputManager";

const map = input.split("\n").map((line) => line.split("").map(Number));

let sum = 0;
for (let y = 0; y < map.length; y++) {
	for (let x = 0; x < map[y].length; x++) if (map[y][x] === 0) sum += findTrails(x, y);
}
console.log(sum);

function findTrails(x: number, y: number) {
	let sum = 0;
	let queue = [{ x, y }];
	while (queue.length) {
		const { x, y } = queue.shift()!;
		const height = map[y][x];
		if (height === 9) sum++;
		if (map[y - 1]?.[x] === height + 1) queue.push({ x, y: y - 1 });
		if (map[y + 1]?.[x] === height + 1) queue.push({ x, y: y + 1 });
		if (map[y][x - 1] === height + 1) queue.push({ x: x - 1, y });
		if (map[y][x + 1] === height + 1) queue.push({ x: x + 1, y });
	}
	return sum;
}
