import {Article} from '../models/Article'
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
const dataPath = path.join(__dirname, '../..', 'data', 'inventory.json');

export function getArticlesByNameAndVendorId(articleName: string, vendorId:string) : Article[] {
    const articlelList: Article[] = JSON.parse(readFileSync(dataPath, 'utf-8'));
    return articlelList.filter((article) => {
        if(
            (articleName == article.name || articleName == "*") 
            &&(vendorId == article.vendorId || vendorId == "*")
        ) {
            return true;
        }
        return false;
    });
}

export function updateArticleById(vendorId: string, articleId: string, size: string, quantity: number, price: number): boolean {
    const articlelList: Article[] = JSON.parse(readFileSync(dataPath, 'utf-8'));
    const articleIndex = articlelList.findIndex(a => a.id === articleId);
        if (articleIndex === -1) {
           return false;
        } else {
            articlelList[articleIndex].sizes[size] = { quantity, price };
            writeFileSync(dataPath, JSON.stringify(articlelList, null, 2));
            return true;
        }
}

export function checkArticleQuantity(articleId: string, size: string, quantity: number): number {
    // read the all articles
    const articlelList: Article[] = JSON.parse(readFileSync(dataPath, 'utf-8'));

    // filter the article 
    let articles = articlelList.filter((item) => {
        if(item.id == articleId && item.sizes[size]?.quantity > 0)
         return true;
        return false;
    })
    // sort the article on the basis of price for particular specific size
    articles.sort((a, b) => { return a.sizes[size]?.price - b.sizes[size]?.price});
    let totalPrice = 0;
    for(let index = 0; index < articles.length && quantity > 0; index++) {
            let itemSizeQty = articles.at(index)?.sizes[size]?.quantity || 0;
            if(itemSizeQty <= quantity) {
               quantity = quantity - itemSizeQty;
               totalPrice = totalPrice + itemSizeQty * (articles.at(index)?.sizes[size]?.price || 0); 
            } else {
                quantity = 0;
                totalPrice = totalPrice + quantity * (articles.at(index)?.sizes[size]?.price || 0);
            }
    }
    return quantity <= 0 ? totalPrice : -1;
}