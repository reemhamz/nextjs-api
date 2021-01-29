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

  // function to merge objects based on ID
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

  // Button functions
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
    setMerge(false);
  };

  // slice array method
  const slice = userList.slice(offset, offset + postsPerPage);

  // styled-components stuff
  const Body = styled.div`
    // background-color: red;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  `;

  const Main = styled.main`
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  `;

  const Header = styled.h1`
    color: tomato;
  `;

  const List = styled.ul`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    margin: 0 auto;
    flex-wrap: wrap;
    padding: 0;
    width: 100vw;
  `;

  const ListItems = styled.li`
    border: 4px dashed tomato;
    align-items: center;
    justify-content: center;
    padding: 10px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: 100%;
    margin: 30px;
    min-height: 400px;
    width: 300px;
  `;

  const UserInfo = styled.div`
    display: flex;
    justify-content: space-evenly;
  `;

  const ButtonContainer = styled.div`
    display: block;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  const Button = styled.button`
    padding: 10px;
    font-size: 15px;
    color: tomato;
    border: none;
    border: 2px solid tomato;
    margin: 10px;
    width: 210px;
    cursor: pointer;
    &:hover {
      background: tomato;
      color: white;
    }
  `;

  const Footer = styled.footer`
    // align-self: flex-end;
    // margin-bottom: auto;
    margin-top: auto;
    background: tomato;
    display: block;
    padding: 20px;
    width: 100%;
    text-align: center;
    color: white;
    font-size: 20px;
  `;

  // Actual code
  return (
    <Body className={styles.container}>
      <Head>
        <title>Next API Call</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <Header className={styles.title}>Howdy, Health Espresso ☕️</Header>

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
            <ButtonContainer>
              <Button onClick={showFullList}>Show full results</Button>
              <div>
                {offset > 0 && (
                  <Button onClick={previousPage}>Previous page</Button>
                )}
                <Button onClick={nextPage}>Next page</Button>
              </div>
            </ButtonContainer>
          </List>
        ) : merge ? (
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
            <ButtonContainer>
              <Button onClick={unMerge}>Unmerge</Button>
            </ButtonContainer>
          </List>
        ) : (
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
            <ButtonContainer>
              <Button onClick={showMerged}>Merge by User ID</Button>
              <Button onClick={showPagination}>Show pagination</Button>
            </ButtonContainer>
          </List>
        )}
      </Main>

      <Footer>
        <a href="https://reemify.dev" target="_blank" rel="noopener noreferrer">
          Challenge accepted by Reem 🤘🏼
        </a>
      </Footer>
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
