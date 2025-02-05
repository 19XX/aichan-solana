import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/mint-reward", async (req: Request, res: Response) => {
  try {
    const { userWallet, amount } = req.body;

    // 예시: 로직 추가
    console.log(`User Wallet: ${userWallet}, Amount: ${amount}`);

    res.status(200).json({ message: "Token minted successfully!" });
  } catch (error) {
    console.error("Error minting token:", error);
    res.status(500).json({ error: "Failed to mint token" });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`API 서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
