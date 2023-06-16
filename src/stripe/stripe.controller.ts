import Stripe from 'stripe';
import { Request } from "express";
import { BadRequestException, Body, Controller, Get, Post, RawBodyRequest, Req } from "@nestjs/common";
import CheckoutSessionDto, { CreateCheckoutSessionDto } from "./dtos/checkout-session.dto";

const STRIPE_SECRET_KEY = '';

@Controller('stripe')
export default class StripeController {
  private readonly stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(STRIPE_SECRET_KEY, { typescript: true, apiVersion: '2022-11-15' });
  }

  @Post('create-checkout-session')
  async createSession(@Body() createSessionDto: CreateCheckoutSessionDto): Promise<CheckoutSessionDto> {
    const session = await this.stripe.checkout.sessions.create({
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
    Stripe.SubscriptionsResource
    const products = await this.stripe.products.list({ active: true, expand: ['data.default_price'] });
    return products.data;
  }

  @Post('webhook')
  async webhook(@Req() request: RawBodyRequest<Request>): Promise<string> {
    const signature = request.header('stripe-signature');
    if (!signature) throw new BadRequestException('Missing stripe-signature header');

    const endpointScrete = '';
    const rawBody = request.rawBody as Buffer;
    const event = this.stripe.webhooks.constructEvent(rawBody, signature, endpointScrete);
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.deleted':
        console.log(event);
        break;
      case 'invoice.payment_succeeded':
        console.log(event);
        break;
      case 'invoice.payment_failed':
        console.log(event);
        break;
      case 'checkout.session.completed':
        console.log(event);
      default: break;
    }

    return 'success';
  }
}