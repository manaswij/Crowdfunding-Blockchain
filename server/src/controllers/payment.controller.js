import Stripe from "stripe"
import { STRIPE_PRIVATE_KEY } from "../config.js"

const stripe = new Stripe(STRIPE_PRIVATE_KEY)

export const checkoutSession = async(req, res) => {
    const {donations} = req.body
    console.log(req.body);

    const lineItems = donations.map((donation) => ({
        price_data: {
            currency: "usd",
            product_data: {
                name: donation.project,
                description: `You are about to donate to the ${donation.author}'s project`,
            },
            unit_amount: Math.round(donation.amount * 100),
        },
        quantity: 1
    }))

    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: "payment",
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel",
    })

    res.json({id: session.id})
}