export interface ProductCollection {
    title: string,
    image: string,
    products?: Product[]
}

export interface Product {
    title: string,
    image: string,
    description: string,
}