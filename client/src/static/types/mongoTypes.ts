export interface IProductFromMongo {
    _id: string;
    title: string;
    desc: string;
    img: string;
    categories: string[];
    size: string[];
    color: string[];
    price: number;
    inStock: boolean;
    createdAt: string;
}

export interface IUserFromMongo {
    _id: string;
    username: string;
    email: string;
    isAdmin: boolean;
}