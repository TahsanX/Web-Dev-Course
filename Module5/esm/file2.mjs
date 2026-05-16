// file2.js
// ঠিক যে নামে এক্সপোর্ট করা হয়েছে, সেই নামেই { } এর ভেতর ইমপোর্ট করতে হবে
import { name, age, greet } from "./file1.mjs";

console.log(name);  // Rahat
console.log(age);   // 25
console.log(greet()); // Hello!
// app.js
// এখানে curly braces {} লাগবে না এবং 'totalUser' এর জায়গায় 'userCount' বা যেকোনো নাম দেওয়া যাবে
import userCount from "./file1.mjs";

console.log(userCount); // 500