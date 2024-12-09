import { input } from "../src/inputManager";

let s: number[] = [];
for (let i = 0; i < input.length; i++) {
	let file = i % 2 === 0;
	let size = Number(input[i]);
	s.push(...Array.from({ length: size }, () => (file ? i / 2 : -1)));
}

let marker = s.length - 1;
for (let i = 0; i < marker; i++) {
	if (s[i] !== -1) continue;
	while (s[marker] === -1) marker--;
	s[i] = s[marker];
	s[marker] = -1;
	marker--;
}

let sum = 0;
for (let i = 0; s[i] !== -1; i++) sum += i * s[i];
console.log(sum);
