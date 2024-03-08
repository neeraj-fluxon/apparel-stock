import { Request, Response } from "express";
import { getArticlesByNameAndVendorId, updateArticleById, checkArticleQuantity } from "../repository/ArticleRepository";
import { RequestHandler } from 'express'
import {z} from 'zod';

interface QueryTypes {
  article: string
  vendor: string
}

interface UpdateArticle {
    code: string
    size: string, 
    quantity: number, 
    price: number
}

interface UpdateArticleRequest {
    articles : UpdateArticle[]
}

interface OrderItem {
    code: string,
    size: string,
    quantity : number,
}

interface OrderRequest {
    itenary : OrderItem[];
}

const UpdateArticleSchema = z.object({
    body: z.object ({
      articles: z.array (
            z.object({
            code: z.string({
                required_error: "code is required",
            }),
            size: z.string({
                required_error: "Size is required",
            }),
            quantity: z
                .number({
                required_error: "quantity is required",
                }),
            price: z
                .number({
                    required_error: "price is required",
                })
            }),
       )
    })
  });

  const OrderRequestSchema = z.object({
    body: z.object ({
        itenary: z.array (
            z.object({
            code: z.string({
                required_error: "code is required",
            }),
            size: z.string({
                required_error: "Size is required",
            }),
            quantity: z
                .number({
                required_error: "quantity is required",
                }),
            })
        )
    })
  });

export const getArticles:RequestHandler<unknown, unknown, unknown, QueryTypes > = (request, response) => {
    const article: string = request.query.article || "*";
    const vendor  = request.query.vendor || "*";
    console.log(" article :", article, " vendor:", vendor);
    const articlelList = getArticlesByNameAndVendorId(article, vendor);
    response.status(200).json(articlelList);
}

export const updateArticle:RequestHandler<unknown, unknown, UpdateArticleRequest, QueryTypes > = async (request, response) => {
    const vendor  = request.query.vendor || undefined;

    if(!vendor) return response.status(404).json({ error: "missing vendor"}); 
    try {
        console.log(" vendor:", vendor);
        await UpdateArticleSchema.parseAsync({
            body: request.body
          });
        const {articles} = request.body;
        articles.forEach(element => {
           if(!updateArticleById(vendor, element.code, element.size, element.quantity, element.price)){
              throw {error: `Error in updating article ${element.code}`};
           };
        });
        response.status(200).json({
          mesg: "updated"
        });
    } catch (error) {
        return response.status(400).json(error);
    }
}

export const checkOrderFullfilment:RequestHandler<unknown, unknown, OrderRequest, unknown > = async (request, response) => {
    try {
        await OrderRequestSchema.parseAsync({
            body: request.body
          });
        const {itenary} = request.body;
        let totalAmout = 0;
        itenary.forEach(element => {
           let itemPrice = checkArticleQuantity(element.code, element.size, element.quantity);
           if(itemPrice <=0){
              throw {error: `Error insufficient quantity for ${element.code}`};
           } else {
            totalAmout = totalAmout + itemPrice;
           }
        });
        return response.status(200).json({
          totalAmout: totalAmout
        });
    } catch (error) {
        return response.status(400).json(error);
    }
    return response.status(500).json({msg: "Server Error"});
}