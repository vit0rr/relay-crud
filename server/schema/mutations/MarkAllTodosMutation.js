import {mutationWithClientMutationId} from 'graphql-relay';
import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
} from 'graphql';
import {GraphQLTodo, GraphQLUser} from '../nodes.js';

import {
  getTodoOrThrow,
  getUserOrThrow,
  markAllTodos,
} from '../../database.js';

const MarkAllTodosMutation = mutationWithClientMutationId({
  name: 'MarkAllTodos',
  inputFields: {
    complete: {type: new GraphQLNonNull(GraphQLBoolean)},
    userId: {type: new GraphQLNonNull(GraphQLID)},
  },
  outputFields: {
    changedTodos: {
      type: new GraphQLList(new GraphQLNonNull(GraphQLTodo)),
      resolve: ({changedTodoIds}) =>
        changedTodoIds.map((todoId) => getTodoOrThrow(todoId)),
    },
    user: {
      type: new GraphQLNonNull(GraphQLUser),
      resolve: ({userId}) => getUserOrThrow(userId),
    },
  },
  mutateAndGetPayload: ({complete, userId}) => {
    const changedTodoIds = markAllTodos(complete);

    return {changedTodoIds, userId};
  },
});

export {MarkAllTodosMutation};
