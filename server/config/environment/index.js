import _ from "lodash";

const config = {
  env: process.env.NODE_END || "development",
  port: process.env.PORT || 3000,
  graphql: {
    port: 8000,
  },
};

export default _.extend(config, require(`./${config.env}`).default);
