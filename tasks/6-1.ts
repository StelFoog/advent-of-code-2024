import { input } from "../src/inputManager";

let x = 0;
let y = 0;
let d: "U" | "D" | "L" | "R" = "U";
const map = input.split("\n").map((line, yp) =>
	line.split("").map((char, xp) => {
		if (char === "^") {
			x = xp;
			y = yp;
		}
		return char === "#";
	})
);

const positions = new Set<string>();
while (y >= 0 && y < map.length && x >= 0 && x < map[y].length) {
	positions.add(`${x}|${y}`);
	let nextX = x;
	let nextY = y;
	if (d === "U") nextY--;
	if (d === "D") nextY++;
	if (d === "L") nextX--;
	if (d === "R") nextX++;

	if (!map[nextY]?.[nextX]) {
		x = nextX;
		y = nextY;
		continue;
	}

	if (d === "U") d = "R";
	else if (d === "R") d = "D";
	else if (d === "D") d = "L";
	else if (d === "L") d = "U";
}

console.log(positions.size);
