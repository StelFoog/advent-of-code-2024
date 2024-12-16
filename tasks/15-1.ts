import elf, { Coordinate2D } from "elf-help";
import { input } from "../src/inputManager";

const [m, d] = input.split("\n\n");
const moves = d.replace(/\s/g, "");
let [rx, ry] = [0, 0];
const boxes: Coordinate2D[] = [];
const map = m.split("\n").map((line, y) => {
	let res: boolean[] = [];
	for (let x = 0; x < line.length; x++) {
		const curr = line[x];
		if (curr === "@") [rx, ry] = [x, y];
		if (curr === "O") boxes.push({ x, y });
		res.push(curr === "#");
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
	if (!moveBoxes(nx, ny, move)) continue;
	rx = nx;
	ry = ny;
}

console.log(elf.sum(...boxes.map(({ x, y }) => x + y * 100)));

function moveBoxes(x: number, y: number, dir: "^" | "v" | "<" | ">"): boolean {
	const box = boxes.find((b) => b.x === x && b.y === y);
	if (!box) return true;
	let [nx, ny] = [box.x, box.y];
	if (dir === "^") ny--;
	else if (dir === "v") ny++;
	else if (dir === "<") nx--;
	else if (dir === ">") nx++;
	if (map[ny][nx]) return false;
	if (!moveBoxes(nx, ny, dir)) return false;
	box.x = nx;
	box.y = ny;
	return true;
}
