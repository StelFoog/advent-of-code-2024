import { input } from "../src/inputManager";

const keys = new Set<string>();
const monkeys = input.split("\n").map((l) => {
	let secret = BigInt(l);
	const change: bigint[] = [];
	const seqs: Record<string, bigint> = {};
	for (let i = 0; i < 2000; i++) {
		const oldPrice = secret % 10n;
		secret = next(secret);
		const newPrice = secret % 10n;
		change.push(newPrice - oldPrice);

		if (change.length >= 4) {
			const key = change.slice(-4).join();
			keys.add(key);
			if (seqs[key] === undefined) seqs[key] = newPrice;
		}
	}
	return seqs;
});

let max = 0n;
for (const key of keys) {
	const val = monkeys.reduce((prev, curr) => prev + (curr[key] ?? 0n), 0n);
	if (val > max) max = val;
}
console.log(max.toString());

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
