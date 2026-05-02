//nullable
const getuser = (input: string | null)=>{
    if (input) {
        console.log(`From DB ${input}`)
    }
    else{
        console.log("Fuck you")
    }
}
getuser(null)
const v = 44
console.log(typeof(v))