import elf from "elf-help";
import { input } from "../src/inputManager";

const [WIDTH, HEIGHT] = [101, 103];

const robots = input
	.split("\n")
	.map((l) => elf.parseNumbers(l, { alsoSplitOn: [",", "="] }) as [number, number, number, number]);

for (let i = 0; true; i++) {
	for (const robot of robots) {
		const [x, y, dx, dy] = robot;
		robot[0] = (x + dx) % WIDTH;
		while (robot[0] < 0) robot[0] += WIDTH;
		robot[1] = (y + dy) % HEIGHT;
		while (robot[1] < 0) robot[1] += HEIGHT;
	}

	console.log(i + 1, "seconds");
	printMap();
}

function printMap() {
	let res: string[] = [];
	for (let i = 0; i < HEIGHT; i++) {
		res.push("");
		for (let j = 0; j < WIDTH; j++)
			res[i] += robots.filter((r) => r[0] === j && r[1] === i).length ? "#" : ".";
	}
	let neighbors = 0;
	for (let i = 0; i < HEIGHT; i++) {
		for (let j = 0; j < WIDTH; j++) {
			if (res[i][j] !== "#") continue;
			if (
				res[i - 1]?.[j] === "#" &&
				res[i + 1]?.[j] === "#" &&
				res[i][j - 1] === "#" &&
				res[i][j + 1] === "#"
			)
				neighbors++;
		}
	}

	if (neighbors > 30) console.log(res.join("\n") + "\n");
}
