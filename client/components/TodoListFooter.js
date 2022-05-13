import {useRemoveCompletedTodosMutation} from '../mutations/RemoveCompletedTodosMutation';

import * as React from 'react';
import {graphql, useFragment} from 'react-relay';

const TodoListFooter = (userRef, todoConnectionRef) => {
  const user = useFragment(
    graphql`
      fragment TodoListFooter_user on User {
        totalCount
        completedCount
        ...RemoveCompletedTodosMutation_user
      }
    `,
    userRef,
  );
  const todoConnection = useFragment(
    graphql`
      fragment TodoListFooter_todoConnection on TodoConnection {
        ...RemoveCompletedTodosMutation_todoConnection
      }
    `,
    todoConnectionRef,
  );

  const commitRemoveCompletedTodosMutation = useRemoveCompletedTodosMutation(
    user,
    todoConnection,
  );

  const numRemainingTodos = user.totalCount - user.completedCount;

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{numRemainingTodos}</strong> item{' '}
        {numRemainingTodos === 1 ? '' : 's'} left
      </span>

      {user.completedCount > 0 && (
        <button
          className="clear-completed"
          onClick={commitRemoveCompletedTodosMutation}>
          Clear completed
        </button>
      )}
    </footer>
  );
}

export default TodoListFooter;