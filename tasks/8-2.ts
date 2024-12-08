import { Coordinate2D } from "elf-help";
import { input } from "../src/inputManager";

const lines = input.split("\n");
let mapWidth = lines[0].length;
let mapHeight = lines.length;
const antennas: Record<string, Coordinate2D[]> = {};
const antinodes = new Set<string>();

lines.forEach((line, y) => {
	line.split("").forEach((char, x) => {
		if (char === ".") return;
		if (!antennas[char]) antennas[char] = [];
		antennas[char].push({ x, y });
	});
});

for (const key in antennas) {
	for (const a of antennas[key]) {
		for (const b of antennas[key]) {
			if (a.x === b.x && a.y === b.y) continue;
			const xd = a.x - b.x;
			const yd = a.y - b.y;
			for (let i = 0; true; i++) {
				const x = a.x + xd * i;
				const y = a.y + yd * i;
				if (x < 0 || x >= mapWidth || y < 0 || y >= mapHeight) break;
				antinodes.add(`${x}|${y}`);
			}
		}
	}
}
console.log(antinodes.size);
