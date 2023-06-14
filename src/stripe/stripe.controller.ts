import { Body, Controller, Get, Post } from "@nestjs/common";
import Stripe from 'stripe';
import CheckoutSessionDto, { CreateCheckoutSessionDto } from "./dtos/checkout-session.dto";

const STRIPE_SECRET_KEY = '';

@Controller('stripe')
export default class StripeController {
  @Post('create-checkout-session')
  async createSession(@Body() createSessionDto: CreateCheckoutSessionDto): Promise<CheckoutSessionDto> {
    const stripe = new Stripe(STRIPE_SECRET_KEY, { typescript: true, apiVersion: '2022-11-15' });
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: createSessionDto.priceId, quantity: 1 }],
      success_url: 'https://example.com/success',
      cancel_url: 'https://example.com/cancel',
    });

    return { sessionId: session.id };
  }

  @Get('products')
  async getProducts(): Promise<Stripe.Product[]> {
    const stripe = new Stripe(STRIPE_SECRET_KEY, { typescript: true, apiVersion: '2022-11-15' });
    const products = await stripe.products.list({ active: true, expand: ['data.default_price'] });
    return products.data;
  }
}