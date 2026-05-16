// ১. পুরো অবজেক্ট একসাথে ইমপোর্ট করলে:
const a = 40
module.exports = {a}
const x = require("./file1");
console.log(x); // আউটপুট: { a: 100, b: 200 }

// ২. ডিস্ট্রাকচার করে আলাদা আলাদা বের করলে:
const { a : a1, b } = require("./file1");
console.log(a1); // আউটপুট: 100
console.log(b); // আউটপুট: 200
