import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: `http://localhost:4000/graphql`,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          book: {
            read(_, { args, toReference }) {
              return toReference({
                __typename: 'Book',
                id: args?.id,
              });
            }
          },
          category: {
            read(_, { args, toReference }) {
              return toReference({
                __typename: 'Category',
                id: args?.id,
              });
            }
          },
        },
      },
    },
  }),
});
