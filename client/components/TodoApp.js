// @flow
import TodoList from './TodoList.js';

import * as React from 'react';
import {graphql, usePreloadedQuery} from 'react-relay'; 

export default function TodoApp({queries}) {
  const {user} = usePreloadedQuery(
    graphql`
      query TodoAppQuery($userId: String) @preloadable {
        user(id: $userId) @required(action: THROW) {
          ...TodoList_user
        }
      }
    `,
    queries.TodoAppQueryRef,
  );

  return (
    <div>
      <section className="todoapp">
        <TodoList userRef={user} />
      </section>

      <footer className="info">
        <p>Double-click to edit a todo</p>

        <p>
          Created by the{' '}
          <a href="https://facebook.github.io/relay/">Relay team</a>
        </p>

        <p>
          Part of <a href="http://todomvc.com">TodoMVC</a>
        </p>
      </footer>
    </div>
  );
};
