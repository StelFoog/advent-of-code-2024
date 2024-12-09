import { input } from "../src/inputManager";

let sizes: Record<number, number> = {};
let s: number[] = [];
for (let i = 0; i < input.length; i++) {
	let file = i % 2 === 0;
	let size = Number(input[i]);
	s.push(...Array.from({ length: size }, () => (file ? i / 2 : -1)));
	if (file) sizes[i / 2] = size;
}

for (let marker = s.length - 1; marker > 0; marker--) {
	const curr = s[marker];
	if (curr === -1) continue;
	const size = sizes[curr];
	let startingAt = 0;
	for (let i = 0; i < marker; i++) {
		if (i - startingAt >= size) break;
		if (s[i] !== -1) {
			startingAt = i + 1;
			continue;
		}
	}
	if (startingAt + size < marker) {
		for (let i = 0; i < size; i++) {
			s[startingAt + i] = curr;
			s[marker - i] = -1;
		}
	}
}

let sum = 0;
for (let i = 0; i < s.length; i++) if (s[i] !== -1) sum += i * s[i];
console.log(sum);
