import { gql, useQuery } from "@apollo/client";
import { Category } from "../../lib/utils";
import { toast } from "sonner";

const GET_CATEGORIES = gql`
  query getCategories {
    categories {
      id
      name
    }
  }
`;

export const useGetCategories = () => {
  const { loading, error, data } = useQuery<{ categories: Category[] }>(
    GET_CATEGORIES,
    {
      onError() {
        toast("Error fetching categories");
      },
    },
  );

  return {
    loading,
    error,
    categories: data?.categories ?? [],
  };
};
