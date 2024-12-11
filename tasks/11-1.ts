import elf from "elf-help";
import { input } from "../src/inputManager";

let sum = 0;
for (const stone of elf.parseNumbers(input)) {
	let stones = [stone];
	for (let i = 0; i < 25; i++) {
		let next: typeof stones = [];
		for (const stone of stones) {
			let str = String(stone);
			if (stone === 0) {
				next.push(1);
			} else if (str.length % 2 === 0) {
				next.push(Number(str.slice(0, str.length / 2)), Number(str.slice(str.length / 2)));
			} else {
				next.push(stone * 2024);
			}
		}
		stones = next;
	}
	sum += stones.length;
}
console.log(sum);
