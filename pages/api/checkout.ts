import type { NextApiRequest, NextApiResponse } from "next";

import { IFood } from "@/interfaces/*";
import { ILineItems } from "../../src/interfaces/index";
import { getStripeSession } from "../../src/stripe/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { products } = req.body;

  // format the data according to stripe
  const lineItems: ILineItems[] = products.map((product: IFood) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
        },
        unit_amount: product.price * 100, // convert dollars to cents ,
      },
      quantity: product.quantity || 1,
    };
  });

  try {
    const session = await getStripeSession(lineItems);

    return res.json({ url: session });
  } catch (err: any) {
    console.log(err.message);
    res.status(400).json({ message: err.message });
  }
}
