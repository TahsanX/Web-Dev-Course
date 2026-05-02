type User = {
    id: number,
    name: {
        frstname: string;
        lstname: string
    },
    gender: 'male' | 'female',
    contact: number
} 
const user1 = {
    id: 12,
    name:{
        frstname: "T",
        lstname: "Z"
    },
    gender: 'male',
    contact: 12222
}