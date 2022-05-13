import {GraphQLString} from 'graphql';
import {GraphQLUser} from '../nodes.js';
import {getUserOrThrow} from '../../database.js';

const UserQuery = {
  type: GraphQLUser,
  args: {
    id: {type: GraphQLString},
  },
  resolve: ({id}) => getUserOrThrow(id),
};

export {UserQuery};
