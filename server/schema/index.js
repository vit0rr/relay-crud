import {GraphQLObjectType, GraphQLSchema} from 'graphql';

import {nodeField} from './nodes.js';
import {UserQuery} from './queries/UserQuery.js';
import {AddTodoMutation} from './mutations/AddTodoMutation.js';
import {ChangeTodoStatusMutation} from './mutations/ChangeTodoStatusMutation.js';
import {MarkAllTodosMutation} from './mutations/MarkAllTodosMutation.js';
import {RemoveCompletedTodosMutation} from './mutations/RemoveCompletedTodosMutation.js';
import {RemoveTodoMutation} from './mutations/RemoveTodoMutation.js';
import {RenameTodoMutation} from './mutations/RenameTodoMutation.js';

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: UserQuery,
    node: nodeField,
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addTodo: AddTodoMutation,
    changeTodoStatus: ChangeTodoStatusMutation,
    markAllTodos: MarkAllTodosMutation,
    removeCompletedTodos: RemoveCompletedTodosMutation,
    removeTodo: RemoveTodoMutation,
    renameTodo: RenameTodoMutation,
  },
});

export const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
