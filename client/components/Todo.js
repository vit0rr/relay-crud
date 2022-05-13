import {useChangeTodoStatusMutation} from '../mutations/ChangeTodoStatusMutation';
import {useRenameTodoMutation} from '../mutations/RenameTodoMutation';
import {useRemoveTodoMutation} from '../mutations/RemoveTodoMutation';
import TodoTextInput from './TodoTextInput';

import * as React from 'react';
import {useState} from 'react';
import {graphql, useFragment} from 'react-relay';
import classnames from 'classnames';

const Todo = ({userRef, todoRef, todoConnectionId}) => {
  const todo = useFragment(
    graphql`
      fragment Todo_todo on Todo {
        complete
        text
        ...ChangeTodoStatusMutation_todo
        ...RenameTodoMutation_todo
        ...RemoveTodoMutation_todo
      }
    `,
    todoRef,
  );
  const user = useFragment(
    graphql`
      fragment Todo_user on User {
        ...ChangeTodoStatusMutation_user
        ...RemoveTodoMutation_user
      }
    `,
    userRef,
  );

  const commitChangeTodoStatusMutation = useChangeTodoStatusMutation(
    user,
    todo,
  );

  const handleCompleteChange = (e) => {
    const complete = e.currentTarget.checked;
    commitChangeTodoStatusMutation(complete);
  };

  const [isEditing, setIsEditing] = useState(false);
  const handleLabelDoubleClick = () => setIsEditing(true);
  const handleTextInputCancel = () => setIsEditing(false);
  const commitRenameTodoMutation = useRenameTodoMutation(todo);
  const handleTextInputSave = (text) => {
    setIsEditing(false);
    commitRenameTodoMutation(text);
  };

  const commitRemoveTodoMutation = useRemoveTodoMutation(
    user,
    todo,
    todoConnectionId,
  );
  const handleRemoveTodo = () => {
    commitRemoveTodoMutation();
  };

  const handleTextInputDelete = () => {
    setIsEditing(false);
    handleRemoveTodo();
  };

  return (
    <li className={classnames({completed: todo.complete, editing: isEditing})}>
      <div className="view">
        <input
          checked={todo.complete}
          className="toggle"
          onChange={handleCompleteChange}
          type="checkbox"></input>
        <label onDoubleClick={handleLabelDoubleClick}>{todo.text}</label>
        <button className="destroy" onClick={handleRemoveTodo}></button>
      </div>

      {isEditing && (
        <TodoTextInput
          className="edit"
          commitOnBlur={true}
          onCancel={handleTextInputCancel}
          onDelete={handleTextInputDelete}
          onSave={handleTextInputSave}
        />
      )}
    </li>
  );
};

export default Todo;
