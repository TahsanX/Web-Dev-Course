interface Developer<T> {
    name: string;
    salary: number;
    device:{
        brand: string;
        model: string;
        releaseYear: number;
    };
    smartWatch: T
}
const poorDeveloper : Developer<{
    heartRate: string;
    stopwatch: boolean;
}> = {
    name: "John Doe",
    salary: 200,
    device: {
        brand: "OldBrand",
        model: "OldModel",
        releaseYear: 2010
    },
    smartWatch: {
        heartRate: "72 bpm",
        stopwatch: true
    }
}
interface IDeveloper {
    heartRate: string;
    stopwatch: boolean;
    callsupport: boolean;
}
const richDeveloper : Developer<IDeveloper> = {
    name: "John Doe",
    salary: 200,
    device: {
        brand: "Newbrand",
        model: "newmodel",
        releaseYear: 2022
    },
    smartWatch: {
        heartRate: "72 bpm",
        stopwatch: true,
        callsupport: true
    }
}