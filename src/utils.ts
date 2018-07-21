export function arrayWithRange(startInclusive: number, endNonInclusive: number) {
	const result = new Array(endNonInclusive - startInclusive);
	for (let i = startInclusive; i < endNonInclusive; i += 1) {
		result[i - startInclusive] = i;
	}
	return result;
}

