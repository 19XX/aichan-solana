// scripts/create-mint.ts
import { Connection, Keypair, clusterApiUrl } from "@solana/web3.js";
import fs from "fs";

async function main() {
  // 동적 import 방식 적용
  const { createMint } = await import("@solana/spl-token");

  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const payer = Keypair.generate();
  const mint = await createMint(
    connection,
    payer,
    payer.publicKey,
    null,
    9 // 소수점 자리수
  );

  console.log("✅ 토큰 Mint 완료:", mint.toBase58());

  fs.writeFileSync("mint-address.txt", mint.toBase58());
}

main().catch((err) => console.error(err));
