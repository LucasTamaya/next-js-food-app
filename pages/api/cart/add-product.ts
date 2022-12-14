import type { NextApiRequest, NextApiResponse } from "next";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

import { db } from "src/firebase/firebase-config";
import { IFood } from "../../../src/interfaces/index";

interface IData {
  error: boolean;
  message: string;
  userId?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IData>
) {
  const { body, cookies } = req;

  if (!cookies.userId) {
    return res.json({ error: true, message: "Please sign-in first" });
  }

  // if cookie available, add product in firebase
  const docRef = doc(db, "users", cookies.userId);

  const { id, name, img, price, category, quantity }: IFood = body;

  try {
    await updateDoc(docRef, {
      cart: arrayUnion({ id, name, img, price, category, quantity }),
    });
    return res.status(200).json({
      error: false,
      message: "Product correctly added to cart",
      userId: cookies.userId,
    });
  } catch (err: any) {
    console.log(err.message);
    return res.status(400).json({
      error: true,
      message: "Something went wrong",
    });
  }
}
