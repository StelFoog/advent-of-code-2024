import elf, { Coordinate2D } from "elf-help";
import { input } from "../src/inputManager";

const [m, d] = input.split("\n\n");
const moves = d.replace(/\s/g, "");
let [rx, ry] = [0, 0];
const boxes: (Coordinate2D & { id: number })[] = [];
const map = m.split("\n").map((line, y) => {
	let res: boolean[] = [];
	for (let x = 0; x < line.length; x++) {
		const curr = line[x];
		if (curr === "@") [rx, ry] = [x * 2, y];
		if (curr === "O") boxes.push({ x: x * 2, y, id: boxes.length });
		res.push(curr === "#", curr === "#");
	}
	return res;
});

for (const move of moves) {
	let [nx, ny] = [rx, ry];
	if (move === "^") ny--;
	else if (move === "v") ny++;
	else if (move === "<") nx--;
	else if (move === ">") nx++;
	else throw "Invalid move: " + move;
	if (map[ny][nx]) continue;
	if (!moveBoxes([{ x: nx, y: ny }], move)) continue;
	rx = nx;
	ry = ny;
}

console.log(elf.sum(...boxes.map(({ x, y }) => x + y * 100)));

function moveBoxes(
	positions: Coordinate2D[],
	dir: "^" | "v" | "<" | ">",
	moving: number[] = [],
	isBox = false
): boolean {
	const filtered = boxes.filter(
		(b) =>
			!moving.includes(b.id) &&
			positions[0].y === b.y &&
			positions.some((p) => [b.x, b.x + 1, isBox && b.x - 1].includes(p.x))
	);
	if (!filtered.length) return true;

	const nm = [...moving, ...filtered.map((b) => b.id)];
	const nexts = filtered.map((box) => {
		let [x, y] = [box.x, box.y];
		if (dir === "^") y--;
		else if (dir === "v") y++;
		else if (dir === "<") x--;
		else if (dir === ">") x++;
		return { x, y };
	});
	if (nexts.some((b) => map[b.y][b.x] || map[b.y][b.x + 1])) return false;
	if (!moveBoxes(nexts, dir, nm, true)) return false;
	for (let i = 0; i < nexts.length; i++) {
		filtered[i].x = nexts[i].x;
		filtered[i].y = nexts[i].y;
	}
	return true;
}
