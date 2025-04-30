import { gql, useQuery, ApolloError } from "@apollo/client";
import { Book } from "../../lib/utils"; 
import { toast } from "sonner";

const GET_BOOK = gql`
  query getBook($id: String!) { 
    book(id: $id) {
      id
      title
      categories { 
        id
        name
      }
    }
  }
`;

interface GetBookData {
  book: Book | null; 
}

interface GetBookVars {
  id: string;
}

export const useGetBook = (id: string): { loading: boolean; error?: ApolloError; book: Book | null } => {
  const { loading, error, data } = useQuery<GetBookData, GetBookVars>(
    GET_BOOK,
    {
      variables: { id },
      skip: !id, 
      onError(err) {
        console.error("Error fetching book:", err);
        toast.error(`Error fetching book: ${err.message}`);
      },
    },
  );

  return {
    loading,
    error,
    book: data?.book ?? null, 
  };
};
