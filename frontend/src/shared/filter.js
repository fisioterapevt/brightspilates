export const filter = (arr, key, filterType) => {
	return arr.filter((it) => it[key] === filterType);
};
