import { gql } from "@apollo/client";

export const EVENT_CREATE = gql`
  mutation EventCreate(
    $title: String!,
    $description: String!,
    $startsAt: ISO8601DateTime!,
    $endsAt: ISO8601DateTime!
  ) {
    eventCreate(input: {
      title: $title,
      description: $description,
      startsAt: $startsAt,
      endsAt: $endsAt
    }) {
      event {
        id
        title
        description
        startsAt
        endsAt
      }
    }
  }
`;
