import Stripe from "stripe"
import { STRIPE_PRIVATE_KEY } from "../config.js"

const stripe = new Stripe(STRIPE_PRIVATE_KEY)

export const checkoutSession = async(req, res) => {
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    product_data: {
                        name: "Laptop",
                        description: "Gaming Laptop",
                    },
                    currency: "usd",
                    unit_amount: 10000,
                },
                quantity: 1
            },
            {
                price_data: {
                    product_data: {
                        name: "TV",
                        description: "Smart TV",
                    },
                    currency: "usd",
                    unit_amount: 20000,
                },
                quantity: 2
            },
        ],
        mode: "payment",
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel",
    })

    return res.json(session)
}