import {useCallback} from 'react';
import {graphql, useFragment, useMutation} from 'react-relay';

const mutation = graphql`
  mutation RenameTodoMutation($input: RenameTodoInput!) {
    renameTodo(input: $input) {
      todo {
        id
        text
      }
    }
  }
`;

export function useRenameTodoMutation(todoRef) {
  const todo = useFragment(
    graphql`
      fragment RenameTodoMutation_todo on Todo {
        id
        text
      }
    `,
    todoRef,
  );
  const [commit] = useMutation(mutation);

  return useCallback((text) => {
    const payload = {
      id: todo.id,
      text,
    };
    commit({
      variables: {
        input: payload,
      },
      optimisticResponse: {
        renameTodo: {
          todo: payload,
        },
      },
    });
  });
}
