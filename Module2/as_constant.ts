// readonly properties
const UserRoles = {
    Admin: 'Admin',
    User: 'User',
    Editor: 'Editor',
} as const;


// type create from object values
type UserRole = typeof UserRoles[keyof typeof UserRoles];


const canEdit = (role: UserRole) => {

    if (
        role === UserRoles.Admin ||
        role === UserRoles.Editor
    ) {
        return true;
    }

    return false;
};


console.log(canEdit(UserRoles.Admin));
console.log(canEdit(UserRoles.User));
console.log(canEdit(UserRoles.Editor));