import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Solana API - 보상 토큰 지급
app.post("/mint-reward", async (req: Request, res: Response) => {
  try {
    const { userWallet, amount } = req.body;

    console.log(`Minting ${amount} tokens to wallet: ${userWallet}`);

    // Solana 트랜잭션 로직 (예제)
    // 실제 코드에서는 Solana Web3 SDK를 사용해 트랜잭션 실행 필요

    res.status(200).json({ message: "Token minted successfully!" });
  } catch (error) {
    console.error("Error minting token:", error);
    res.status(500).json({ error: "Failed to mint token" });
  }
});

// 서버 실행
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
