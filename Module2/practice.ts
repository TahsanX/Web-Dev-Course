type book = {
    title: string,
    author: string,
    year: number,
    genre: string,  
}
const book1: book = {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    year: 1925,
    genre: 'Novel',
}
interface Book {
    title: string,
    author: string,
    year: number,
    genre: string,  
}
const book2: Book = {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    year: 1960,
    genre: 'Novel',
}

interface Car<T> {
    make: string;
    model: string;
    year: number;
    features: T;
}
const car1: Car<{sunroof: boolean; navigation: boolean}> = {
    make: 'Toyota',
    model: 'Camry',
    year: 2020,
    features: {
        sunroof: true,
        navigation: true,
    }
}
enum UserRole {
   Admin = "Admin",
   User = "User"
}

interface User {
   name: string;
   age: number;
   role: UserRole;
}
const user: User = {
   name: "Ronaldo",
   age: 25,
   role: UserRole.Admin
}