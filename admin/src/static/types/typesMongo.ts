export interface IObjString {
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
    status: string;
}

//orders from MongoDB
export interface IOrder {
    _id: string;
    createdAt: string;
    userId: string,
    products: [],
    amount: number,
    address: {},
    status: string,
}
