import React, { memo, useEffect, useState } from "react";
import {
  Platform,
  StyleSheet,
  View,
} from "react-native";
import { Table, Row, Rows } from "react-native-table-component";
import { Pagination, WhiteSpace, WingBlank } from "@ant-design/react-native";
import cloneDeep from "lodash/cloneDeep";

const Home = memo((props) => {
  const [pageData, setPageData] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    fetch(
      `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${
        pageCount - 1
      }`
    )
      .then((response) => response.json())
      .then((responseJson) => {
        let copy = cloneDeep(pageData);
        copy.push(createTableData(responseJson.hits));
        setPageData(copy);
      })
      .catch((error) => console.log(error));
  }, [pageCount]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPageCount((pageCount) => pageCount + 1);
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const createTableData = (hits = []) => {
    let tableRows = [];
    hits.forEach((hit) => {
      const tableRow = [hit.title, hit.url, hit.created_at, hit.author];
      tableRows.push(tableRow);
    });
    return tableRows;
  };

  const handleOnPageChange = (index) => {
    setCurrentPage(index);
  };

  const renderPagination = () => {
    return (
      <WingBlank>
        <WhiteSpace size="lg" />
        <Pagination
          total={pageCount}
          current={currentPage}
          locale={{ prevText: "<", nextText: ">" }}
          onChange={handleOnPageChange}
        />
      </WingBlank>
    );
  };

  const renderTable = () => {
    const tableHead = ["title", "URL", "created_at", "author"];
    return (
      <View style={styles.tableContainer}>
        <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
          <Row data={tableHead} style={styles.head} textStyle={styles.text} />
          <Rows data={pageData[currentPage - 1]} textStyle={styles.text} />
        </Table>
      </View>
    );
  };

  return (
    <View>
      {renderPagination()}
      {renderTable()}
    </View>
  );
});

const styles = StyleSheet.create({
  tableContainer: { flex: 1, padding: 16, backgroundColor: "#fff" },
  head: { height: 40, backgroundColor: "#f1f8ff" },
  text: { margin: 6 },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    paddingTop: 30,
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center",
  },
});

export default Home;
