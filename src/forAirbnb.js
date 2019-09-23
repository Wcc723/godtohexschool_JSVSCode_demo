

//這個範例中有哪些錯誤
var family = {
// property: value,
// property2: value
	name: '小明家',
	deposit: 1000,
	members: {
		mom:'老媽',
		ming: "小明"
	},

	callFamily: function() {
		console.log('聯絡小明家');
	},
};


const deposit = family.deposit;

console.log(deposit);


(function() {
  console.log('aa' + deposit);
})();
