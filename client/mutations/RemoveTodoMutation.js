import {useCallback} from 'react';
import {graphql, useFragment, useMutation} from 'react-relay';

const mutation = graphql`
  mutation RemoveTodoMutation($connections: [ID!]!, $input: RemoveTodoInput!) {
    removeTodo(input: $input) {
      deletedTodoId @deleteEdge(connections: $connections)
      user {
        completedCount
        totalCount
      }
    }
  }
`;

export function useRemoveTodoMutation(userRef, todoRef, todoConnectionId) {
  const user = useFragment(
    graphql`
      fragment RemoveTodoMutation_user on User {
        id
        userId
        totalCount
        completedCount
      }
    `,
    userRef,
  );
  const todo = useFragment(
    graphql`
      fragment RemoveTodoMutation_todo on Todo {
        id
        complete
      }
    `,
    todoRef,
  );
  const [commit] = useMutation(mutation);

  return useCallback(() => {
    commit({
      variables: {
        input: {
          id: todo.id,
          userId: user.userId,
        },
        connections: [todoConnectionId],
      },
      optimisticResponse: {
        removeTodo: {
          deletedTodoId: todo.id,
          user: {
            id: user.id,
            totalCount: user.totalCount - 1,
            completedCount: user.completedCount + (todo.complete ? -1 : 0),
          },
        },
      },
    });
  }, [commit, user, todo, todoConnectionId]);
}
