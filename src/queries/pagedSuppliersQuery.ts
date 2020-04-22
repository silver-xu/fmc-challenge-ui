import gql from "graphql-tag";

export const pagedSuppliersQuery = gql`
  query Suppliers($offset: Int, $pageSize: Int) {
    pagedSuppliers(offset: $offset, pageSize: $pageSize) {
      suppliers {
        id
        name
        number
        services
        rating
      }
      total
    }
  }
`;
