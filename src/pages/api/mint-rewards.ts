import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { userWallet, amount } = req.body;

    // Solana 트랜잭션 처리 로직
    console.log(`Minting ${amount} tokens to wallet: ${userWallet}`);

    res.status(200).json({ message: "Token minted successfully!" });
  } catch (error) {
    console.error("Error minting token:", error);
    res.status(500).json({ error: "Failed to mint token" });
  }
}
