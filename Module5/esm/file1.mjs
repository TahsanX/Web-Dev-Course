// file1.js

// পদ্ধতি ১: সরাসরি ডিক্লেয়ারেশনের সময় এক্সপোর্ট করা
export const name = "Rahat";
export const age = 25;

export function greet() {
    return "Hello!";
}

/* 
// পদ্ধতি ২: ফাইল এর শেষে একসাথে অবজেক্ট আকারে এক্সপোর্ট করা
const name = "Rahat";
const age = 25;

export { name, age }; 
*/
// mathUtils.js

const totalUser = 500;

// ফাইল এর যেকোনো একটা জিনিসকে default হিসেবে এক্সপোর্ট করা
export default totalUser;