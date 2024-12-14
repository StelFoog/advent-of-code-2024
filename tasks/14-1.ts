import elf from "elf-help";
import { input } from "../src/inputManager";

const [WIDTH, HEIGHT] = [101, 103];

const robots = input
	.split("\n")
	.map((l) => elf.parseNumbers(l, { alsoSplitOn: [",", "="] }) as [number, number, number, number]);

for (let i = 0; i < 100; i++) {
	for (const robot of robots) {
		const [x, y, dx, dy] = robot;
		robot[0] = (x + dx) % WIDTH;
		while (robot[0] < 0) robot[0] += WIDTH;
		robot[1] = (y + dy) % HEIGHT;
		while (robot[1] < 0) robot[1] += HEIGHT;
	}
}

let [q1, q2, q3, q4] = [0, 0, 0, 0];
const [midX, midY] = [Math.floor(WIDTH / 2), Math.floor(HEIGHT / 2)];
for (const [x, y] of robots) {
	if (x < midX && y < midY) q1++;
	if (x > midX && y < midY) q2++;
	if (x < midX && y > midY) q3++;
	if (x > midX && y > midY) q4++;
}

console.log(q1 * q2 * q3 * q4);
