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

let q = elf.orderedQueue<{ x: number; y: number; dir: Direction; cost: number }>((v) => v.cost);
q.add({ ...start!, dir: "R", cost: 0 });
const prev = new Set<string>();
while (q.length) {
	const { x, y, dir, cost } = q.dequeue()!;
	if (end!.x === x && end!.y === y) {
		console.log(cost);
		break;
	}
	const key = `${x} ${y} ${dir}`;
	if (prev.has(key)) continue;
	prev.add(key);

	let [nx, ny] = [x, y];
	if (dir === "U") ny -= 1;
	if (dir === "D") ny += 1;
	if (dir === "L") nx -= 1;
	if (dir === "R") nx += 1;
	const mKey = `${nx} ${ny} ${dir}`;
	if (!prev.has(mKey) && map[ny][nx]) q.add({ x: nx, y: ny, dir, cost: cost + 1 });

	if ((dir === "U" || dir === "D") && map[y][x - 1] && !prev.has(`${x} ${y} L`))
		q.add({ x, y, dir: "L", cost: cost + 1000 });
	if ((dir === "U" || dir === "D") && map[y][x + 1] && !prev.has(`${x} ${y} R`))
		q.add({ x, y, dir: "R", cost: cost + 1000 });
	if ((dir === "L" || dir === "R") && map[y - 1][x] && !prev.has(`${x} ${y} U`))
		q.add({ x, y, dir: "U", cost: cost + 1000 });
	if ((dir === "L" || dir === "R") && map[y + 1][x] && !prev.has(`${x} ${y} D`))
		q.add({ x, y, dir: "D", cost: cost + 1000 });
}

// console.log(
// 	map
// 		.map((row, y) =>
// 			row
// 				.map((c, x) =>
// 					start.x === x && start.y === y ? "S" : end.x === x && end.y === y ? "E" : c ? "#" : "."
// 				)
// 				.join("")
// 		)
// 		.join("\n")
// );
