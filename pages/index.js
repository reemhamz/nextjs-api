import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import api from "./api/hello.js";

export default function Home({ userList }) {
  // const [posts, setPosts] = useState();
  const [userID, setUserID] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Howdy, <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <ul>
          {userList.map((e, index) => (
            <li key={index}><div>
              <div>{e.userId}</div>
              <div>{e.title}</div>
              <div>{ e.body}</div>
            </div></li>
          ))}
        </ul>
      </main>

      <footer className={styles.footer}>
        <a href="https://reemify.dev" target="_blank" rel="noopener noreferrer">
          Challenge accepted by Reem 🤘🏼
        </a>
      </footer>
    </div>
  );
}

Home.getInitialProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();
  console.log(posts);
  return { userList: posts };
};
Home.getInitialProps();
