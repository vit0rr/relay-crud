import JSResource from '../utilities/JSResource';
import TodoAppQuery from '../../__generated__/relay/TodoAppQuery.graphql.js';

const TodoAppEntryPoint = {
  getPreloadProps({userId}) {
    return {
      queries: {
        todoAppQueryRef: {
          parameters: {
            kind: 'PreloadableConcreteRequest',
            params: TodoAppQuery.params,
          },
          variables: {
            userId,
          },
        },
      },
    };
  },
  root: JSResource('TodoApp', () => import('../components/TodoApp.js')),
};

export default TodoAppEntryPoint;
