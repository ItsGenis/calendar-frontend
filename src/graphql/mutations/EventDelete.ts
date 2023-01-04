import { gql } from "@apollo/client";

export const EVENT_DELETE = gql`
  mutation EventDelete(
    $id: ID!,
  ) {
    eventDelete(input: {
      id: $id,
    }) {
      event {
        id
      }
    }
  }
`;
