import { Router } from "express";
import { checkoutSession } from "../controllers/payment.controller.js";

const router = Router()

router.post("/checkout-stripe", checkoutSession)
router.get("/success", (req, res) => res.send("Thanks for contributing to the project"))
router.get("/cancel", (req, res) => res.send("cancel"))

export default router