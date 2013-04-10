//utils : to get random date, string and real numbers.
module.exports = {
	//function to get random dte. for simplicity, chooses a random index from an array
	randomDate: function() {
		var strings = ['2013-01-01', '2013-02-02', '2012-12-01', '2011-11-22'];
		var randomI = Math.floor(Math.random() * 10) % strings.length;
		console.log(randomI);
		return strings[randomI];
   },

	//function to get random string. for simplicity, chooses a random index from an array twice and returns concatenated string
	randomString: function() {
		//taking human readable strings
		var strings = ['abcdefghij', 'bcdefghija', 'cdefghijab', 'defghijabc', 'efghijabcd', 'fghijabcde', 'ghijabcdef', 'hijabcdefg', 'ijabcdefgh', 'jabcdefghi'];
		var randomI1 = Math.floor(Math.random() * 10);
		var randomI2 = Math.floor(Math.random() * 10);
		return strings[randomI1] + strings[randomI2];
	},

	//function to get a random real numnber
	randomReal: function() {
		return Math.random() * 1000;
	}
}