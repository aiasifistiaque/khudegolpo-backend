//

const countWords = v => {
	var matches = v.match(/\S+/g);
	return matches ? matches.length : 0;
};

export default countWords;
