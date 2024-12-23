import elf, { Coordinate2D } from "elf-help";
import { input } from "../src/inputManager";

const keypad: Record<string, Coordinate2D> = {
	"7": elf.coord(0, -3),
	"8": elf.coord(1, -3),
	"9": elf.coord(2, -3),
	"4": elf.coord(0, -2),
	"5": elf.coord(1, -2),
	"6": elf.coord(2, -2),
	"1": elf.coord(0, -1),
	"2": elf.coord(1, -1),
	"3": elf.coord(2, -1),
	" ": elf.coord(0, 0),
	"0": elf.coord(1, 0),
	A: elf.coord(2, 0),
	"^": elf.coord(1, 0),
	"<": elf.coord(0, 1),
	v: elf.coord(1, 1),
	">": elf.coord(2, 1),
};

const moveLengthCache: Record<string, bigint> = {};

let sum = 0n;
for (const code of input.split("\n")) {
	let len = 0n;
	for (let i = 0; i < code.length; i++) {
		len += moveLength(code[i - 1] ?? "A", code[i], 26);
	}
	sum += len * BigInt(code.slice(0, -1));
}
console.log(sum.toString());

function moveLength(from: string, to: string, depth: number) {
	const cacheKey = `${from}${to}${depth}`; // from and to are always 1 char
	if (moveLengthCache[cacheKey]) return moveLengthCache[cacheKey];
	if (depth === 1) {
		moveLengthCache[cacheKey] = BigInt(getMoves(from, to)[0].length);
		return moveLengthCache[cacheKey];
	}

	let min = BigInt(Number.MAX_SAFE_INTEGER);
	for (const move of getMoves(from, to)) {
		let length = 0n;
		for (let i = 0; i < move.length; i++)
			length += moveLength(move[i - 1] ?? "A", move[i], depth - 1);
		if (length < min) min = length;
	}
	moveLengthCache[cacheKey] = min;

	return min;
}

function getMoves(from: string, to: string): string[] {
	const cPos = keypad[from];
	const tPos = keypad[to];
	const x = tPos.x - cPos.x;
	const y = tPos.y - cPos.y;
	if (!x && !y) return ["A"];
	if (x && !y) return [(x < 0 ? "<" : ">").repeat(Math.abs(x)) + "A"];
	if (!x && y) return [(y < 0 ? "^" : "v").repeat(Math.abs(y)) + "A"];

	let res: string[] = [];
	if (!isBlank(tPos.x, cPos.y))
		res.push(
			`${(x < 0 ? "<" : ">").repeat(Math.abs(x))}${(y < 0 ? "^" : "v").repeat(Math.abs(y))}A`
		);
	if (!isBlank(cPos.x, tPos.y))
		res.push(
			`${(y < 0 ? "^" : "v").repeat(Math.abs(y))}${(x < 0 ? "<" : ">").repeat(Math.abs(x))}A`
		);
	return res;
}

function isBlank(x: number, y: number) {
	const blank = keypad[" "];
	return x === blank.x && y === blank.y;
}