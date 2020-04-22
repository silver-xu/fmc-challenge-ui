import gql from "graphql-tag";

export const supplierQuery = gql`
  query Suppliers($id: String!) {
    supplier(id: $id) {
      id
      name
      number
      services
      workOrders {
        dateDue
        dateCompleted
        priority
        serviceReportProvided
      }
      numOfSentMessages
      numOfReceivedMessages
      rating
      lastRatedDate
    }
  }
`;
