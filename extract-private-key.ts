import { Keypair } from "@solana/web3.js";
import base58 from "bs58";
import fs from "fs";

// payer-keypair.json 파일 로드
const secretKey = JSON.parse(fs.readFileSync("payer-keypair.json", "utf8"));

// Keypair 생성
const keypair = Keypair.fromSecretKey(new Uint8Array(secretKey));

// Base58 Private Key 출력
console.log("Base58 Private Key:", base58.encode(keypair.secretKey));
