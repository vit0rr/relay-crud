import {mutationWithClientMutationId, toGlobalId} from 'graphql-relay';
import {GraphQLID, GraphQLList, GraphQLNonNull} from 'graphql';
import {GraphQLUser} from '../nodes.js';
import {getUserOrThrow, removeCompletedTodos, User} from '../../database.js';

const RemoveCompletedTodosMutation = mutationWithClientMutationId({
  name: 'RemoveCompletedTodos',
  inputFields: {
    userId: {type: new GraphQLNonNull(GraphQLID)},
  },
  outputFields: {
    deletedTodoIds: {
      type: new GraphQLList(new GraphQLNonNull(GraphQLID)),
      resolve: ({deletedTodoIds}) => deletedTodoIds,
    },
    user: {
      type: new GraphQLNonNull(GraphQLUser),
      resolve: ({userId}) => getUserOrThrow(userId),
    },
  },
  mutateAndGetPayload: ({userId}) => {
    const deletedTodoLocalIds = removeCompletedTodos();

    const deletedTodoIds = deletedTodoLocalIds.map(
      toGlobalId.bind(null, 'Todo'),
    );

    return {deletedTodoIds, userId};
  },
});

export {RemoveCompletedTodosMutation};
