import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  nodeDefinitions,
} from 'graphql-relay';

import {
  Todo,
  User,
  USER_ID,
  getTodoOrThrow,
  getTodos,
  getUserOrThrow,
} from '../database.js';

const {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    const {type, id} = fromGlobalId(globalId);

    if (type === 'Todo') {
      return getTodoOrThrow(id);
    } else if (type === 'User') {
      return getUserOrThrow(id);
    }
    return null;
  },
  (obj) => {
    if (obj instanceof Todo) {
      return GraphQLTodo;
    } else if (obj instanceof User) {
      return GraphQLUser;
    }
    return null;
  },
)

const GraphQLTodo = new GraphQLObjectType({
  name: 'Todo',
  fields: {
    id: globalIdField('Todo'),
    text: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (todo) => todo.text,
    },
    complete: {
      type: new GraphQLNonNull(GraphQLBoolean),
      resolve: (todo) => todo.complete,
    },
  },
  interfaces: [nodeInterface],
});

const {connectionType: TodosConnection, edgeType: GraphQLTodoEdge} =
  connectionDefinitions({
    name: 'Todo',
    nodeType: GraphQLTodo,
  });

const todosArgs = {
  status: {
    type: GraphQLString,
    defaultValue: 'any',
  },
  ...connectionArgs,
};

const GraphQLUser = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: globalIdField('User'),
    userId: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: () => USER_ID,
    },
    todos: {
      type: TodosConnection,
      args: todosArgs,
      // eslint-disable-next-line flowtype/require-parameter-type
      resolve: ({status, after, before, first, last}) =>
        connectionFromArray([...getTodos(status)], {
          after,
          before,
          first,
          last,
        }),
    },
    totalCount: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: () => getTodos().length,
    },
    completedCount: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: () => getTodos('completed').length,
    },
  },
  interfaces: [nodeInterface],
});

export {nodeField, GraphQLTodo, GraphQLTodoEdge, GraphQLUser};
