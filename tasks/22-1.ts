import { input } from "../src/inputManager";

let sum = 0n;
for (let secret of input.split("\n").map(BigInt)) {
	for (let i = 0; i < 2000; i++) {
		secret = next(secret);
	}
	sum += secret;
}
console.log(sum.toString());

function next(num: bigint) {
	// mul64 > mix > prune
	num ^= num << 6n;
	num %= 16777216n;
	// div32 > mix > prune
	num ^= num >> 5n;
	num %= 16777216n;
	// mul2048 > mix > prune
	num ^= num << 11n;
	num %= 16777216n;

	return num;
}
