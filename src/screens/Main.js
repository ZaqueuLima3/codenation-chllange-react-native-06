import React, { useState } from "react";
import { ScrollView, Text, Image, ActivityIndicator } from "react-native";

import { useQuery, ApolloProvider } from "@apollo/react-hooks";
import ApolloClient, { gql } from "apollo-boost";

const client = new ApolloClient({
  uri: "https://graphql-pokemon.now.sh/"
});

export default function Main() {
  const [pokemons, setPokemons] = useState([]);

  const GET_POKEMONS = gql(
    `query pokemons($first: Int!) {
      pokemons(first: $first) {
        id
        number
        name
        image
        types
    }}`
  );
  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: { first: 20 }
  });

  if (error) return `Error ${error}`;

  return (
    <ApolloProvider client={client}>
      <ScrollView style={styles.container}>
        {loading ? (
          <ActivityIndicator></ActivityIndicator>
        ) : (
          data.pokemons.map(pokemon => (
            <>
              <Image className="pokemon-image" source={{ uri: "photo" }} />
              <Text className="pokemon-name">001 - Test</Text>
              <Text className="pokemon-type">testType</Text>
              <Text className="pokemon-type">testType 2</Text>
            </>
          ))
        )}
      </ScrollView>
    </ApolloProvider>
  );
}
