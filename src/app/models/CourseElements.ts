export enum FormOfClass {
    W = "Wykład",
    C = "Ćwiczenia",
    L = "Laboratoria",
    P = "Praktyka"
}

export class Course {
    name?: string;
    ECTS?: number;
    semestr?: number;
    formsOfClass?: FormOfClass[];
    maxQuantity?: number;
    rating?: number;
    id?: number;
    imgPath?: string;
    rateList?: string[];
    partList?: string[];

    public constructor(init?: Partial<Course>) {
        Object.assign(this, init);
    }
}

