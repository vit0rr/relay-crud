// @flow
import type {TodoAppQuery} from 'relay/TodoAppQuery.graphql';
import type {
  PreloadedQuery,
  EntryPointProps,
  EntryPointComponent,
} from 'react-relay';
import {Link} from 'react-router-dom';

import TodoList from './TodoList';
import About from './About'

import * as React from 'react';
import {graphql, usePreloadedQuery} from 'react-relay';

type PreloadedQueries = {|todoAppQueryRef: PreloadedQuery<TodoAppQuery>|};
type Props = EntryPointProps<PreloadedQueries>;

export default (function TodoApp({queries}: Props): React.Node {
  const {user} = usePreloadedQuery(
    graphql`
      query TodoAppQuery($userId: String) @preloadable {
        user(id: $userId) @required(action: THROW) {
          ...TodoList_user
        }
      }
    `,
    queries.todoAppQueryRef,
  );

  return (
    <>
      <div>
        <section className="todoapp">
          <TodoList userRef={user} />
        </section>

        <footer className="info">
          <p>Double-click to edit a ToDo</p>
        </footer>
        <About></About>
      </div>
    </>
  );
}: EntryPointComponent<PreloadedQueries>);
