import React, { PureComponent, useEffect } from "react";
import ApolloClient from "apollo-boost";
import { gql } from "apollo-boost";

import { StyleSheet, ScrollView } from "react-native";

const client = new ApolloClient({
  uri: "https://graphql-pokemon.now.sh/"
});

function Main() {
  useEffect(() => {
    let data;
    async function run() {
      data = await test();
      console.log(data);
    }
    run();
  });
  async function test() {
    const response = await client.query({
      query: gql`
        {
          pokemon(name: "Pikachu") {
            id
            name
          }
        }
      `
    });
    return response;
  }
  return <ScrollView style={styles.container}></ScrollView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

export default Main;
