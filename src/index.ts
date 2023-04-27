import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import express, { Express, Request, Response} from 'express';

import { CustomerData } from './interfaces/CustomerData';
import { SnackData } from './interfaces/SnackData';
import { PaymentData } from './interfaces/PaymentData';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

const prisma = new PrismaClient();

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    const { message } =  req.body;

    res.send({message: message});
});

app.get('/snacks', async (req: Request, res: Response) => {
    const { snack } =  req.query;
    
    if(!snack) return res.status(400).send({error: "Snack is required"});
    
    const snacks = await prisma.snack.findMany({
        where: {
            snack: {
                equals: snack as string
            }
        }
    })
    
    res.send(snacks);
});

interface CheckoutRequest extends Request {
    bodt: {
        cart: SnackData[]
        custumer: CustomerData
        payment: PaymentData
    }
}

app.post('/checkout', async (req: Request, res: Response) => {
    const { cart, customer, payment } = req.body;

    
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})