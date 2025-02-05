// scripts/create-mint.ts
import { Connection, Keypair, clusterApiUrl } from "@solana/web3.js";
import { createMint } from "@solana/spl-token";
import fs from "fs";

async function main() {
    // Solana Devnet 연결
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

    // payer-keypair.json 파일에 관리자(토큰 Mint Authority) 키페어가 저장되어 있다고 가정
    // 이 파일은 반드시 안전하게 보관하세요.
    const payerSecretKey = JSON.parse(fs.readFileSync("payer-keypair.json", "utf8"));
    const payer = Keypair.fromSecretKey(new Uint8Array(payerSecretKey));

    // 토큰 Mint 생성
    // - payer: 토큰 발행 및 초기 비용 결제
    // - payer.publicKey: Mint Authority (토큰 발행 권한)
    // - decimals: 9 (일반적인 SOL 및 SPL 토큰의 소수점 자리수)
    const mint = await createMint(
        connection,
        payer,
        payer.publicKey,  // Mint Authority
        null,             // Freeze Authority (옵션으로 null 설정)
        9                 // decimals
    );

    console.log("토큰 Mint Address:", mint.toBase58());
}

main().catch((err) => {
    console.error(err);
});
