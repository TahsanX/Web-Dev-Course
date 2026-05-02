type userRole = 'admin' | 'user' | 'guest'
const getDashboard = (role: userRole)=>{
    if (role=="admin") {
        return "Admin Dashboard"
    }
    else{
        return "Kichuina"
    }
}
let val : String = getDashboard("admin")
console.log(val)