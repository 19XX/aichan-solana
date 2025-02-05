import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { userWallet, amount } = req.body;

  if (!userWallet || !amount) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  try {
    // 여기에 실제 Solana 트랜잭션 로직 작성
    res.status(200).json({ signature: "sample-signature" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
