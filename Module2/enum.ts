enum UserRoles{
    Admin = 'Admin',
    User = 'User',
    Editor = 'Editor',
}

const canEdit = (role: UserRoles)=>{
    if(role === UserRoles.Admin || role === UserRoles.Editor){
        return true
    }
    return false
}

console.log(canEdit(UserRoles.Admin))
console.log(canEdit(UserRoles.User))
console.log(canEdit(UserRoles.Editor))