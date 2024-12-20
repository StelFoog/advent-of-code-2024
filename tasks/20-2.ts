import elf, { Coordinate2D } from "elf-help";
import { input } from "../src/inputManager";

let START: Coordinate2D;
let END: Coordinate2D;
const map = input.split("\n").map((line, y) =>
	line.split("").map((curr, x) => {
		if (curr === "S") START = elf.coord(x, y);
		if (curr === "E") END = elf.coord(x, y);
		return curr !== "#";
	})
);

const dist = map.map((row) => row.map<number | null>(() => null));
const savedDists: Record<number, number> = {};
function setInitialDist(x: number, y: number, steps: number) {
	dist[y][x] = steps;
	for (const sc of nodesWithinDistance(x, y, 20)) {
		const pDist = dist[sc.y]?.[sc.x];
		if (typeof pDist !== "number" || pDist > steps) continue;
		const saved = steps - sc.dist - pDist;
		if (saved < 1) continue;
		if (!savedDists[saved]) savedDists[saved] = 0;
		savedDists[saved]++;
	}
	if (x === START.x && y === START.y) return;

	if (map[y][x - 1] && dist[y][x - 1] === null) setInitialDist(x - 1, y, steps + 1);
	if (map[y][x + 1] && dist[y][x + 1] === null) setInitialDist(x + 1, y, steps + 1);
	if (map[y - 1]?.[x] && dist[y - 1]?.[x] === null) setInitialDist(x, y - 1, steps + 1);
	if (map[y + 1]?.[x] && dist[y + 1]?.[x] === null) setInitialDist(x, y + 1, steps + 1);
}
setInitialDist(END!.x, END!.y, 0);

console.log(
	Object.entries(savedDists)
		.filter(([key]) => Number(key) >= 100)
		.reduce((prev, [, curr]) => prev + curr, 0)
);

function* nodesWithinDistance(
	x: number,
	y: number,
	dist: number
): Generator<Coordinate2D & { dist: number }> {
	for (let i = 1; i <= dist; i++) {
		for (let j = 0; j < i; j++) {
			yield { ...elf.coord(x - i + j, y - j), dist: i };
			yield { ...elf.coord(x + i - j, y + j), dist: i };
			yield { ...elf.coord(x + j, y - i + j), dist: i };
			yield { ...elf.coord(x - j, y + i - j), dist: i };
		}
	}
}
