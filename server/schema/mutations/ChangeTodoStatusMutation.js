import {fromGlobalId, mutationWithClientMutationId} from 'graphql-relay';
import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLNonNull,
} from 'graphql';
import {GraphQLTodo, GraphQLUser} from '../nodes.js';
import {
  changeTodoStatus,
  getTodoOrThrow,
  getUserOrThrow,
} from '../../database.js';

const ChangeTodoStatusMutation = mutationWithClientMutationId({
  name: 'ChangeTodoStatus',
  inputFields: {
    complete: {type: new GraphQLNonNull(GraphQLBoolean)},
    id: {type: new GraphQLNonNull(GraphQLID)},
    userId: {type: new GraphQLNonNull(GraphQLID)},
  },
  outputFields: {
    todo: {
      type: new GraphQLNonNull(GraphQLTodo),
      resolve: ({todoId}) => getTodoOrThrow(todoId),
    },
    user: {
      type: new GraphQLNonNull(GraphQLUser),
      resolve: ({userId}) => getUserOrThrow(userId),
    },
  },
  mutateAndGetPayload: ({id, complete, userId}) => {
    const todoId = fromGlobalId(id).id;
    changeTodoStatus(todoId, complete);

    return {todoId, userId};
  },
});

export {ChangeTodoStatusMutation};
