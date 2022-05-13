import {
  cursorForObjectInConnection,
  mutationWithClientMutationId,
} from 'graphql-relay';

import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';
import {GraphQLTodoEdge, GraphQLUser} from '../nodes.js';

import {
  addTodo,
  getTodoOrThrow,
  getTodos,
  getUserOrThrow,
  User,
} from '../../database.js';

const AddTodoMutation = mutationWithClientMutationId({
  name: 'AddTodo',
  inputFields: {
    text: {type: new GraphQLNonNull(GraphQLString)},
    userId: {type: new GraphQLNonNull(GraphQLID)},
  },
  outputFields: {
    todoEdge: {
      type: new GraphQLNonNull(GraphQLTodoEdge),
      resolve: ({todoId}) => {
        const todo = getTodoOrThrow(todoId);

        return {
          cursor: cursorForObjectInConnection([...getTodos()], todo),
          node: todo,
        };
      },
    },
    user: {
      type: new GraphQLNonNull(GraphQLUser),
      resolve: ({userId}) => getUserOrThrow(userId),
    },
  },
  mutateAndGetPayload: ({text, userId}) => {
    const todoId = addTodo(text, false);

    return {todoId, userId};
  },
});

export {AddTodoMutation};
