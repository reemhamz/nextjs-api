import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import styled from "styled-components";

export default function Home({ userList }) {
  // State stuff
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [offset, setOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [pagination, setPagination] = useState(true);
  const [merge, setMerge] = useState(false);

  const groupedItems = userList.reduce((acc, curr) => {
    if (acc[curr.userId]) {
      acc[curr.userId] += curr.body;
    } else {
      acc[curr.userId] = curr.body;
    }
    return acc;
  }, {});

  const groupedArray = Object.keys(groupedItems).map((e) => {
    return {
      id: e,
      text: groupedItems[e],
    };
  });

  // Next page button for pagination
  const nextPage = () => {
    setOffset(offset + 5);
  };

  const previousPage = () => {
    setOffset(offset - 5);
  };

  const showFullList = () => {
    setPagination(false);
  };

  const showPagination = () => {
    setPagination(true);
  };

  const showMerged = () => {
    setMerge(true);
  };

  const unMerge = () => {
    setMerge(false)
  }

  // slice array method
  const slice = userList.slice(offset, offset + postsPerPage);

  useEffect(() => {
    setPageCount(Math.ceil(userList.length / postsPerPage));
  }, [userList, postsPerPage]);

  // styled-components stuff
  const Body = styled.div`
    // background-color: red;
  `;

  const Main = styled.main`
    width: 100vw;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  `;

  const List = styled.ul`
    display: flex;
    // flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin: 0 auto;
    flex-wrap: wrap;
    padding: 0;
    width: 100vw;
  `;

  const ListItems = styled.li`
    background: lightpink;
    border: 2px dashed tomato;
    border-radius: 4px;
    padding: 10px;
    text-align: center;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: 100%;
    max-width: 100%;
    justify-items: center;
    align-items: center;
    margin: 30px 0;
    width: 300px;
  `;

  const UserInfo = styled.div`
    display: flex;
    justify-content: space-evenly;
  `;

  const Button = styled.button`
    padding: 10px;
    font-size: 15px;
    background: lightblue;
    color: teal;
    border: none;
    border: 2px solid navy;
    margin: 10px;
    width: 210px;
    cursor: pointer;
  `;

  // Actual code
  return (
    <Body className={styles.container}>
      <Head>
        <title>Next API Call</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <h1 className={styles.title}>Howdy, Health Espresso ☕️</h1>

        {pagination ? (
          <List>
            {slice.map((e, index) => (
              <ListItems key={index}>
                <div>
                  <UserInfo>
                    <span>User ID:</span>
                    <span>{e.userId}</span>
                  </UserInfo>
                  <hr />
                  <div>{e.title}</div>
                  <div>{e.body}</div>
                </div>
              </ListItems>
            ))}
            <Button onClick={showFullList}>Show full results</Button>
            <div>
              {offset > 0 && (
                <Button onClick={previousPage}>Previous page</Button>
              )}
              <Button onClick={nextPage}>Next page</Button>
            </div>
          </List>
        ) : (
            merge ? (
          <List>
            {groupedArray.map((e, index) => (
              <ListItems key={index}>
                <div>
                  <UserInfo>
                    <span>User ID:</span>
                    <span>{e.id}</span>
                  </UserInfo>
                  <hr />

                  <div>{e.text}</div>
                </div>
              </ListItems>
            ))}
            <Button onClick={unMerge}>Unmerge</Button>
          </List>
        ) :
          <List>
            {userList.map((e, index) => (
              <ListItems key={index}>
                <div>
                  <UserInfo>
                    <span>User ID:</span>
                    <span>{e.userId}</span>
                  </UserInfo>
                  <hr />
                  <div>
                    <span>Title:</span>
                    <br />
                    <span>{e.title}</span>
                  </div>
                  <hr />
                  <div>{e.body}</div>
                </div>
              </ListItems>
            ))}
            <div>
              <Button onClick={showMerged}>Merge by User ID</Button>
              <Button onClick={showPagination}>Show pagination</Button>
            </div>
          </List>
        )}
      </Main>

      <footer className={styles.footer}>
        <a href="https://reemify.dev" target="_blank" rel="noopener noreferrer">
          Challenge accepted by Reem 🤘🏼
        </a>
      </footer>
    </Body>
  );
}

// Fetch API call
Home.getInitialProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();
  return { userList: posts };
};
Home.getInitialProps();
