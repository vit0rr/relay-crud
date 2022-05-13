import {useCallback} from 'react';
import {graphql, useFragment, useMutation} from 'react-relay';

const mutation = graphql`
  mutation AddTodoMutation($connections: [ID!]!, $input: AddTodoInput!) {
    addTodo(input: $input) {
      todoEdge @appendEdge(connections: $connections) {
        node {
          complete
          id
          text
        }
      }
      user {
        id
        totalCount
      }
    }
  }
`;

let tempID = 0;

export function useAddTodoMutation(userRef, todoConnectionId) {
  const user = useFragment(
    graphql`
      fragment AddTodoMutation_user on User {
        userId
        id
        totalCount
      }
    `,
    userRef,
  );

  const [commit] = useMutation(mutation);

  return useCallback((text) => {
    commit({
      variables: {
        input: {
          text,
          userId: user.userId,
        },
        connections: [todoConnectionId],
      },
      optimisticResponse: {
        addTodo: {
          todoEdge: {
            node: {
              id: 'client:newTodo' + tempID++,
              text,
              complete: false,
            },
          },
          user: {
            id: user.id,
            totalCount: user.totalCount + 1,
          },
        },
      },
    });
  }, [commit, user, todoConnectionId]);
}
