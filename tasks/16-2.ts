import elf, { Coordinate2D } from "elf-help";
import { input } from "../src/inputManager";

type Direction = "U" | "D" | "L" | "R";

let start: Coordinate2D;
let end: Coordinate2D;
const map = input.split("\n").map((line, y) =>
	line.split("").map((curr, x) => {
		if (curr === "S") start = { x, y };
		if (curr === "E") end = { x, y };
		return curr !== "#";
	})
);

let tiles = new Set<string>();
let q = elf.orderedQueue<{
	x: number;
	y: number;
	dir: Direction;
	cost: number;
	prev: Set<string>;
	turn?: true;
}>((v) => v.cost);
let max = Number.MAX_SAFE_INTEGER;
q.add({ ...start!, dir: "R", cost: 0, prev: new Set<string>() });
const globalPrev: Record<string, number> = {};
while (q.length) {
	const { x, y, dir, cost, prev, turn } = q.dequeue()!;
	if (cost > max) break;
	if (end!.x === x && end!.y === y) {
		max = cost;
		for (const v of prev) tiles.add(v);
		continue;
	}
	const key = `${x} ${y}`;
	if (!turn && prev.has(key)) continue;
	prev.add(key);
	const globalkey = `${x} ${y} ${dir}`;
	if (globalPrev[globalkey] && globalPrev[globalkey] < cost) continue;
	globalPrev[globalkey] = cost;

	let [nx, ny] = [x, y];
	if (dir === "U") ny -= 1;
	if (dir === "D") ny += 1;
	if (dir === "L") nx -= 1;
	if (dir === "R") nx += 1;
	if (!prev.has(`${nx} ${ny}`) && map[ny][nx])
		q.add({ x: nx, y: ny, dir, cost: cost + 1, prev: new Set(prev) });

	if (turn) continue;
	if ((dir === "U" || dir === "D") && map[y][x - 1])
		q.add({ x, y, dir: "L", cost: cost + 1000, prev: new Set(prev), turn: true });
	if ((dir === "U" || dir === "D") && map[y][x + 1])
		q.add({ x, y, dir: "R", cost: cost + 1000, prev: new Set(prev), turn: true });
	if ((dir === "L" || dir === "R") && map[y - 1][x])
		q.add({ x, y, dir: "U", cost: cost + 1000, prev: new Set(prev), turn: true });
	if ((dir === "L" || dir === "R") && map[y + 1][x])
		q.add({ x, y, dir: "D", cost: cost + 1000, prev: new Set(prev), turn: true });
}
console.log(tiles.size + 1); // + 1 to account for end tile
