import { gql } from '@apollo/client';

export const EVENT_UPDATE = gql`
  mutation EventUpdate(
    $id: ID!
    $title: String
    $description: String
    $startsAt: ISO8601DateTime
    $endsAt: ISO8601DateTime
  ) {
    eventUpdate(
      input: {
        id: $id
        title: $title
        description: $description
        startsAt: $startsAt
        endsAt: $endsAt
      }
    ) {
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
