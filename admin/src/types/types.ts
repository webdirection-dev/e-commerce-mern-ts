export interface IObjSrting {
    [key: string]: string;
}

//users from MongoDB
export interface IUser {
    _id: string;
    createdAt: string;
    email: string;
    isAdmin: string;
    password: string;
    profilePic: string;
    updatedAt: string;
    username: string;
    accessToken?: string;
}

//movies from MongoDB
export interface IMovie {
    _id: string | number;
    title: string;
    description: string;
    img: string;
    imgTitle: string;
    imgSm: string;
    trailer: string;
    video: string;
    year: string;
    limit: number;
    genre: string;
    isSeries: boolean;
}

//list from MongoDB
export interface IList {
    _id: string | number;
    title: string | number;
    type: string;
    genre: string;
    content: [];
}

// users from LocalDB
export interface IUserRows {
    _id: string;
    username: string;
    profilePic: string;
    status: string;
    email: string;
    age: number;
    isAdmin: string
}

//form Add NewMovie User
export interface INewItemInput {
    id: number,
    htmlId: string;
    label: string;
    type: string;
    placeholder?: string;
}

export interface INewFormInput {
    title: string,
    data: INewItemInput[]
}