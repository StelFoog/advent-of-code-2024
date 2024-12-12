import { Coordinate2D } from "elf-help";
import { input } from "../src/inputManager";

type Area = { type: string; nodes: Coordinate2D[] };

const grouped = new Set<string>();
const areas: Area[] = [];

const map = input.split("\n");
for (let y = 0; y < map.length; y++) {
	for (let x = 0; x < map[y].length; x++) {
		if (grouped.has(`${x},${y}`)) continue;

		const curr = map[y][x];
		const area: Area = { type: curr, nodes: [] };
		const queue = [{ x, y }];
		while (queue.length) {
			const { x, y } = queue.shift()!;
			const idStr = `${x},${y}`;
			if (grouped.has(idStr)) continue;
			if (map[y]?.[x] !== curr) continue;

			grouped.add(idStr);
			area.nodes.push({ x, y });
			queue.push({ x: x, y: y - 1 }, { x: x, y: y + 1 }, { x: x - 1, y: y }, { x: x + 1, y: y });
		}
		areas.push(area);
	}
}

let sum = 0;
for (const area of areas) {
	let sides: Record<string, Coordinate2D[]> = {};
	for (const node of area.nodes) {
		if (!area.nodes.some(({ x, y }) => x === node.x - 1 && y === node.y)) {
			const key = "x" + node.x;
			if (!sides[key]) sides[key] = [];
			sides[key].push(node);
		}
		if (!area.nodes.some(({ x, y }) => x === node.x + 1 && y === node.y)) {
			const key = "x" + (node.x + 1);
			if (!sides[key]) sides[key] = [];
			sides[key].push(node);
		}
		if (!area.nodes.some(({ x, y }) => x === node.x && y === node.y - 1)) {
			const key = "y" + node.y;
			if (!sides[key]) sides[key] = [];
			sides[key].push(node);
		}
		if (!area.nodes.some(({ x, y }) => x === node.x && y === node.y + 1)) {
			const key = "y" + (node.y + 1);
			if (!sides[key]) sides[key] = [];
			sides[key].push(node);
		}
	}
	let uniqueSides = 0;
	for (const [key, side] of Object.entries(sides)) {
		const grouped = new Set<string>();
		for (const { x, y } of side.sort((a, b) => (key.startsWith("x") ? a.y - b.y : a.x - b.x))) {
			grouped.add(`${x},${y}`);
			if (grouped.has(`${x},${y + 1}`)) continue;
			if (grouped.has(`${x},${y - 1}`)) continue;
			if (grouped.has(`${x + 1},${y}`)) continue;
			if (grouped.has(`${x - 1},${y}`)) continue;
			uniqueSides++;
		}
	}
	sum += uniqueSides * area.nodes.length;
}
console.log(sum);
