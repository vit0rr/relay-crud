import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
} from "graphql";

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
  cursorForObjectInConnection,
} from "graphql-relay";

import {
  List,
  User,
  getList,
  getUser,
  getUsers,
  addUser,
  deleteUser,
  updateUser,
} from "./database";

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    if (type === "List") {
      return getList(id);
    } else if (type === "User") {
      return getUser(id);
    }
    return null;
  },
  (obj) => {
    if (obj instanceof List) {
      return listType;
    } else if (obj instanceof User) {
      return userType;
    }
    return null;
  }
);

const listType = new GraphQLObjectType({
  name: "List",
  description: "A kind of list",
  fields: () => ({
    id: globalIdField("list"),
    users: {
      type: userConnection,
      description: "Users that belongs to this list",
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(getUsers(), args),
    },
    name: {
      type: GraphQLString,
      description: "List's name",
    },
  }),
  interfaces: [nodeInterface],
});

const userType = new GraphQLObjectType({
  name: "User",
  description: "Users added by default",
  fields: () => ({
    id: globalIdField("user"),
    name: {
      type: GraphQLString,
      description: "Name of user",
    },
    address: {
      type: GraphQLString,
      description: "Address of user",
    },
    email: {
      type: GraphQLString,
      description: "Email of user",
    },
    age: {
      type: GraphQLString,
      description: "Age of user",
    },
  }),
  interfaces: [nodeInterface],
});

const { connectionType: userConnection, edgeType: userEdge } =
  connectionDefinitions({ name: "User", nodeType: userType });

const addUserMutation = mutationWithClientMutationId({
  name: "AddUser",
  inputFields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    address: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: new GraphQLNonNull(GraphQLString) },
  },

  outputFields: {
    userEdge: {
      type: userEdge,
      resolve: (obj) => {
        const cursorId = cursorForObjectInConnection(getUsers(), obj);
        return { node: obj, cursor: cursorId };
      },
    },
    viewer: {
      type: userType,
      resolve: () => getList(1),
    },
  },
  mutateAndGetPayload: ({ name, address, email, age }) =>
    addUser(name, address, email, age),
});

const updateUserMutation = mutationWithClientMutationId({
  name: "UpdateUser",
  inputFields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    address: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    oldEmail: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: new GraphQLNonNull(GraphQLString) },
  },

  outputFields: {
    user: {
      type: userType,
      resolve: ({ email }) => getUser(email),
    },
    viewer: {
      type: listType,
      resolve: () => getList(1),
    },
  },

  mutateAndGetPayload: ({ name, address, email, oldEmail, age }) =>
    updateUser(name, address, email, oldEmail, age),
});

const deleteUserMutation = mutationWithClientMutationId({
  name: "DeleteUser",
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    email: { type: new GraphQLNonNull(GraphQlString) },
  },

  outputFields: {
    DeletedUser: {
      type: GraphQLID,
      resolve: (id) => id,
    },
    viewer: {
      type: listType,
      resolve: () => getList(1),
    },
    viewer: {
      type: userType,
      resolve: () => getUser(1),
    },
  },
  mutateAndGetPayload: ({ id, email }) => deleteUser(id, email),
});

const queryType = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    node: nodeField,
    viewer: {
      type: listType,
      resolve: () => getList(1),
    },
  }),
});

const mutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    addUser: addUserMutation,
    deleteUser: deleteUserMutation,
    updateUser: updateUserMutation,
  }),
});

export default new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
});
