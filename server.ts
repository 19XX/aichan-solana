import express from "express";
import { Request, Response } from "express";
import bodyParser from "body-parser";
import { Connection, Keypair, clusterApiUrl, PublicKey } from "@solana/web3.js";
import { mintTo, getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import fs from "fs";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();


const app = express();
const port = process.env.PORT || 3001;

app.use(cors()); // CORS 허용

app.use(bodyParser.json());

// Solana Devnet 연결
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

// 관리자 키페어 로드
const payerSecretKey = JSON.parse(fs.readFileSync("payer-keypair.json", "utf8"));
const payer = Keypair.fromSecretKey(new Uint8Array(payerSecretKey));

// 토큰 Mint Address
const TOKEN_MINT_ADDRESS = process.env.TOKEN_MINT_ADDRESS || "여기에_토큰_Mint_주소를_입력하세요";
const tokenMint = new PublicKey(TOKEN_MINT_ADDRESS);

app.post("/mint-reward", async (req: Request, res: Response) => {
  try {
    const { userWallet, amount } = req.body;

    if (!userWallet || !amount) {
      return res.status(400).json({ error: "userWallet 및 amount는 필수입니다." });
    }

    const userPublicKey = new PublicKey(userWallet);

    const userTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      payer,
      tokenMint,
      userPublicKey
    );

    const signature = await mintTo(
      connection,
      payer,
      tokenMint,
      userTokenAccount.address,
      payer.publicKey,
      amount
    );

    res.json({
      signature,
      tokenAccount: userTokenAccount.address.toBase58(),
    });
  } catch (error: unknown) {
    console.error("보상 지급 실패:", error);
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unknown error occurred." });
    }
  }
});

app.listen(port, () => {
  console.log(`API 서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
