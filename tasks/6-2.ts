import { input } from "../src/inputManager";

let xg = 0;
let yg = 0;
let dg: "U" | "D" | "L" | "R" = "U";
const map = input.split("\n").map((line, yp) =>
	line.split("").map((char, xp) => {
		if (char === "^") {
			xg = xp;
			yg = yp;
		}
		return char === "#";
	})
);

const positions = new Set<string>();
let [x, y, d] = [xg, yg, dg as "U" | "D" | "L" | "R"];
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

let sum = 0;
for (let yo = 0; yo < map.length; yo++) {
	for (let xo = 0; xo < map[yo].length; xo++)
		if (positions.has(`${xo}|${yo}`) && wouldLoop(xo, yo)) sum++;
}
console.log(sum);

function wouldLoop(xo: number, yo: number) {
	if (xo === xg && yo === yg) return false;
	if (map[yo][xo]) return false;

	const positions = new Set<string>();
	let x = xg;
	let y = yg;
	let d = dg;
	while (y >= 0 && y < map.length && x >= 0 && x < map[y].length) {
		if (positions.has(`${x}|${y}|${d}`)) return true;
		positions.add(`${x}|${y}|${d}`);
		let nextX = x;
		let nextY = y;
		if (d === "U") nextY--;
		if (d === "D") nextY++;
		if (d === "L") nextX--;
		if (d === "R") nextX++;

		if (!map[nextY]?.[nextX] && (nextX !== xo || nextY !== yo)) {
			x = nextX;
			y = nextY;
			continue;
		}

		if (d === "U") d = "R";
		else if (d === "R") d = "D";
		else if (d === "D") d = "L";
		else if (d === "L") d = "U";
	}

	return false;
}
