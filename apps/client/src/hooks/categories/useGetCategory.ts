import { gql, useQuery, ApolloError } from "@apollo/client";
import { Category } from "../../lib/utils";
import { toast } from "sonner";

const GET_CATEGORY = gql`
  query getCategory($id: String!) {
    category(id: $id) {
      id
      name
    }
  }
`;

interface GetCategoryData {
  category: Category | null;
}
interface GetCategoryVars {
  id: string;
}

export const useGetCategory = (id: string): { loading: boolean; error?: ApolloError; category: Category | null } => {
  const { loading, error, data } = useQuery<GetCategoryData, GetCategoryVars>(GET_CATEGORY, {
    variables: { id },
    skip: !id,
    onError(err) {
      console.error("Error fetching category:", err);
      toast.error(`Error fetching category: ${err.message}`);
    },
  });

  return {
    loading,
    error,
    category: data?.category ?? null,
  };
};
