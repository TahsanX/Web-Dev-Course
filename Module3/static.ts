class Counter {
    static val: number
    constructor(initialVal?: number) {
        if (initialVal) {
            Counter.val = initialVal
        }
    }
    add(){
        Counter.val = Counter.val+1;
    }
    sub(){
        Counter.val = Counter.val-1;
    }
}
const num1 = new Counter(1)
num1.add()
console.log(Counter.val)
const num2 = new Counter()
num1.add()
console.log(Counter.val)