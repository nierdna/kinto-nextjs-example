"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { createKintoSDK, KintoAccountInfo } from "kinto-web-sdk";
import { useEffect, useState } from "react";

export default function Home() {
  const [accountInfo, setAccountInfo] = useState<KintoAccountInfo | undefined>(
    undefined
  );
  console.log("🚀 ~ Home ~ accountInfo:", accountInfo);

  const kintoSDK = createKintoSDK("0x14A1EC9b43c270a61cDD89B6CbdD985935D897fE");

  async function kintoLogin() {
    try {
      await kintoSDK.createNewWallet();
    } catch (error) {
      console.error("Failed to login/signup:", error);
    }
  }

  async function fetchAccountInfo() {
    try {
      console.log("🚀 ~ fetchAccountInfo ~ kintoSDK:", kintoSDK);
      setAccountInfo(await kintoSDK.connect());
      console.log("🚀 ~ fetchAccountInfo ~ accountInfo:", accountInfo);
    } catch (error) {
      console.error("Failed to fetch account info:", error);
    }
  }

  useEffect(() => {
    fetchAccountInfo();
  });

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol>
          <li>
            Get started by editing <code>app/page.tsx</code>.
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            onClick={kintoLogin}
          >
            <Image
              className={styles.logo}
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Login
          </a>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            onClick={fetchAccountInfo}
            className={styles.secondary}
          >
            Fetch Account Info
          </a>
        </div>

        {/* Account Info Display */}
        <div className={styles.accountInfo}>
          {accountInfo ? (
            <div>
              <h2>Account Information</h2>
              <div>
                <p>
                  <strong>Wallet Address:</strong> {accountInfo.walletAddress}
                </p>
                <p>
                  <strong>App:</strong> {accountInfo.app?.name}
                </p>
              </div>
            </div>
          ) : (
            <p>Please login to view account information</p>
          )}
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
