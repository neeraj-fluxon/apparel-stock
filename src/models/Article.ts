export interface ArticelDescription {
    quantity: number,
    price: number,
}

export interface Article {
    name: string,
    id: string,
    vendorId:string,
    sizes : {[size: string]: ArticelDescription },
}