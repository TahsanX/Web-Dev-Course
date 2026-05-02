const user = {
    id: 12,
    name: {
        frst: "Tahsan",
        last: "Zhd"
    },
    phn: 12344444
}
const {name:{last}} = user
console.log(last)
// array destructuring
const friends = ["karim", "Rahim", "Keya"]
const [a,b,c] = friends
console.log(a,b,c)