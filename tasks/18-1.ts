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

const map = Array.from({ length: SIZE }, () => Array.from({ length: SIZE }, () => true));
for (const { x, y } of bytes.slice(0, BYTES)) map[y][x] = false;

const q = elf.orderedQueue<{ x: number; y: number; steps: number }>(
	({ x, y, steps }) => steps + Math.floor(x * x + y * y)
);
q.add({ ...START, steps: 0 });
const prev: Record<string, number> = {};
while (q.length) {
	const { x, y, steps } = q.dequeue()!;
	if (END.x === x && END.y === y) {
		console.log(steps);
		process.exit();
	}

	const key = `${x} ${y}`;
	if (typeof prev[key] === "number" && prev[key] <= steps) continue;
	prev[key] = steps;

	if (map[y]?.[x - 1] && (prev[`${x - 1} ${y}`] ?? Number.MAX_SAFE_INTEGER) > steps + 1)
		q.add({ x: x - 1, y: y, steps: steps + 1 });
	if (map[y]?.[x + 1] && (prev[`${x + 1} ${y}`] ?? Number.MAX_SAFE_INTEGER) > steps + 1)
		q.add({ x: x + 1, y: y, steps: steps + 1 });
	if (map[y - 1]?.[x] && (prev[`${x} ${y - 1}`] ?? Number.MAX_SAFE_INTEGER) > steps + 1)
		q.add({ x: x, y: y - 1, steps: steps + 1 });
	if (map[y + 1]?.[x] && (prev[`${x} ${y + 1}`] ?? Number.MAX_SAFE_INTEGER) > steps + 1)
		q.add({ x: x, y: y + 1, steps: steps + 1 });
}
