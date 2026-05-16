# TypeScript Generics: Reusable & Type-Safe

## Introduction
Generics allow you to create reusable components that work with multiple types while maintaining strict type safety, avoiding the problem of 'any'. Also it helps to dynamically generalize the type issue. You can use the type you want in times of need.

---

## The Core Problem & Solution

Using "any" loses all type safety and compile-time tracking:

### Code:
function getFirstAny(arr: any[]): any {
  return arr[0];
}

const numAny = getFirstAny([1, 2, 3]);   
const strAny = getFirstAny(["a", "b"]); 



Generics introduce a type placeholder (`T`) that preserves the exact type automatically:

### Code:

function getFirst<T>(arr: T[]): T {
  return arr[0];
}

const num = getFirst([1, 2, 3]);     
const str = getFirst(["a", "b"]);   

console.log(num.toFixed(2));  
console.log(str.toUpperCase()); 



## Conclusion: Generics make types flexible instead of abandoning them. They offer the perfect balance between **code reusability** and **compile-time type safety**.