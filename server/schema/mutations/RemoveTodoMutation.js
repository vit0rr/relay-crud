import {mutationWithClientMutationId, fromGlobalId} from 'graphql-relay';
import {GraphQLID, GraphQLNonNull} from 'graphql';
import {GraphQLUser} from '../nodes.js';
import {getUserOrThrow, removeTodo} from '../../database.js';

const RemoveTodoMutation = mutationWithClientMutationId({
  name: 'RemoveTodo',
  inputFields: {
    id: {type: new GraphQLNonNull(GraphQLID)},
    userId: {type: new GraphQLNonNull(GraphQLID)},
  },
  outputFields: {
    deletedTodoId: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: ({id}) => id,
    },
    user: {
      type: new GraphQLNonNull(GraphQLUser),
      resolve: ({userId}) => getUserOrThrow(userId),
    },
  },
  mutateAndGetPayload: ({id, userId}) => {
    const localTodoId = fromGlobalId(id).id;
    removeTodo(localTodoId);

    return {id, userId};
  },
});

export {RemoveTodoMutation};
