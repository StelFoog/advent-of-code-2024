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
function setInitialDist(x: number, y: number, steps: number) {
	dist[y][x] = steps;
	if (x === START.x && y === START.y) return;
	if (map[y][x - 1] && dist[y][x - 1] === null) setInitialDist(x - 1, y, steps + 1);
	if (map[y][x + 1] && dist[y][x + 1] === null) setInitialDist(x + 1, y, steps + 1);
	if (map[y - 1]?.[x] && dist[y - 1]?.[x] === null) setInitialDist(x, y - 1, steps + 1);
	if (map[y + 1]?.[x] && dist[y + 1]?.[x] === null) setInitialDist(x, y + 1, steps + 1);
}
setInitialDist(END!.x, END!.y, 0);

// console.log(dist[START!.y][START!.x]);
// console.log(map.map((line) => line.map((c) => (c ? "." : "#")).join("")).join("\n"));

const allSaved: Record<number, number> = {};
for (let y = 0; y < map.length; y++) {
	for (let x = 0; x < map[y].length; x++) {
		if (map[y][x]) continue;
		const neighbours = [dist[y][x - 1], dist[y][x + 1], dist[y - 1]?.[x], dist[y + 1]?.[x]].filter(
			(v) => typeof v === "number"
		);
		if (neighbours.length !== 2) continue;
		const min = Math.min(...neighbours);
		const max = Math.max(...neighbours);
		const saved = max - min - 2;
		if (!saved) continue;
		if (!allSaved[saved]) allSaved[saved] = 0;
		allSaved[saved]++;
	}
}
console.log(
	Object.entries(allSaved)
		.filter(([key]) => Number(key) >= 100)
		.reduce((prev, [, curr]) => prev + curr, 0)
);
