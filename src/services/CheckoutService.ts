import { PrismaClient } from "@prisma/client";

import { CustomerData } from "../interfaces/CustomerData";
import { PaymentData } from "../interfaces/PaymentData";
import { SnackData } from "../interfaces/SnackData";

export default class CheckoutService {
    private prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient();
    }

    async process(
        cart: SnackData[],
        customer: CustomerData,
        payment: PaymentData
    ) {
        //  TODO: pegar dados de snacks do bando de dados
        const snacks = await this.prisma.snack.findMany({
            where: {
                id: {
                    in: cart.map(snack => snack.id)
                }
            }
        })
        
        //  TODO: registrar os dados do cliente no banco
        //  TODO: criar uma orgem
        //  TODO: processar o pagamento
    }
}