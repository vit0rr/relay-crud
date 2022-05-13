import {useCallback} from 'react';
import {graphql, useFragment, useMutation} from 'react-relay';

const mutation = graphql`
  mutation ChangeTodoStatusMutation($input: ChangeTodoStatusInput!) {
    changeTodoStatus(input: $input) {
      todo {
        id
        complete
      }
      user {
        id
        completedCount
      }
    }
  }
`;

export function useChangeTodoStatusMutation(userRef, todoRef) {
  const user = useFragment(
    graphql`
      fragment ChangeTodoStatusMutation_user on User {
        id
        userId
        completedCount
      }
    `,
    userRef,
  );
  const todo = useFragment(
    graphql`
      fragment ChangeTodoStatusMutation_todo on Todo {
        id
      }
    `,
    todoRef,
  );
  const [commit] = useMutation(mutation);

  return useCallback(
    (complete) => {
      const payload = {
        id: todo.id,
        complete,
      };
      commit({
        variables: {
          input: {
            userId: user.userId,
            ...payload,
          },
        },
        optimisticResponse: {
          changeTodoStatus: {
            todo: payload,
            user: {
              id: user.id,
              completedCount: user.completedCount + (complete ? 1 : -1),
            },
          },
        },
      });
    },
    [user, todo, commit],
  );
}
