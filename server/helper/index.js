const countArray = function(arr) {
	let len = 0;

	if(arr.length > 0) {
		for (let index = 0; index < arr.length; index++) {
			if (arr[index] !== undefined) {
				len++;
			}
		}
	}

	return len;
}

module.exports = {
	countArray
}