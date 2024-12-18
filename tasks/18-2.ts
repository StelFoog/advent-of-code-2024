import elf, { Coordinate2D } from "elf-help";
import { input } from "../src/inputManager";

const SIZE = 71;
const BYTES = 1024;
const START = elf.coord(0, 0);
const END = elf.coord(SIZE - 1, SIZE - 1);

const bytes = input.split("\n").map<Coordinate2D>((v) => {
	const [x, y] = elf.parseNumbers(v, { alsoSplitOn: "," });
	return { x, y };
});

let i: number;
let prevPath: Coordinate2D[] = [];
const map = Array.from({ length: SIZE }, () => Array.from({ length: SIZE }, () => true));
for (const { x, y } of bytes.slice(0, BYTES)) map[y][x] = false;
for (i = BYTES + 1; true; i++) {
	map[bytes[i - 1].y][bytes[i - 1].x] = false;
	if (prevPath.length && !prevPath.some(({ x, y }) => bytes[i - 1].x === x && bytes[i - 1].y === y))
		continue;
	const q = elf.orderedQueue<{ x: number; y: number; path: Coordinate2D[] }>(
		({ x, y, path }) => path.length + Math.floor(x * x + y * y)
	);
	q.add({ ...START, path: [] });
	const prev: Record<string, number> = {};
	while (q.length) {
		const { x, y, path } = q.dequeue()!;
		const key = `${x} ${y}`;
		if (typeof prev[key] === "number" && prev[key] <= path.length) continue;
		prev[key] = path.length;
		if (END.x === x && END.y === y) {
			prevPath = path;
			break;
		}

		if (map[y]?.[x - 1] && (prev[`${x - 1} ${y}`] ?? Number.MAX_SAFE_INTEGER) > path.length + 1)
			q.add({ x: x - 1, y: y, path: [...path, { x, y }] });
		if (map[y]?.[x + 1] && (prev[`${x + 1} ${y}`] ?? Number.MAX_SAFE_INTEGER) > path.length + 1)
			q.add({ x: x + 1, y: y, path: [...path, { x, y }] });
		if (map[y - 1]?.[x] && (prev[`${x} ${y - 1}`] ?? Number.MAX_SAFE_INTEGER) > path.length + 1)
			q.add({ x: x, y: y - 1, path: [...path, { x, y }] });
		if (map[y + 1]?.[x] && (prev[`${x} ${y + 1}`] ?? Number.MAX_SAFE_INTEGER) > path.length + 1)
			q.add({ x: x, y: y + 1, path: [...path, { x, y }] });
	}

	if (!prev[`${END.x} ${END.y}`]) break;
}
console.log(`${bytes[i - 1].x},${bytes[i - 1].y}`);
