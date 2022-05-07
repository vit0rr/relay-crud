import path from "path";
import webpack from "webpack";
import express from "express";
import graphQLHTTP from "express-graphql";
import WebpackDevServer from "webpack-dev-server";
import historyApiFallback from "connect-history-api-fallback";
import chalk from "chalk";
import webpackConfig from "../webpack.config";
import config from "./config/environment";
import schema from "./data/schema";

if (config.env === "development") {
  const graphql = express();
  graphql.use(
    "/",
    graphQLHTTP({
      graphiql: true,
      pretty: true,
      schema,
    })
  );
  graphql.listen(config.graphql.port, () =>
    console.log(
      chalk.green(`GraphQL is listening on port ${config.graphql.port}`)
    )
  );

  const relayServer = new WebpackDevServer(webpack(webpackConfig), {
    contentBase: "/build/",
    proxy: {
      "/graphql": `http://localhost:${config.graphql.port}`,
    },
    stats: {
      colors: true,
    },
    hot: true,
    historyApiFallback: true,
  });

  relayServer.use("/", express.static(path.join(__dirname, "../build")));
  relayServer.listen(config.port, () =>
    console.log(chalk.green(`Relay is listening on port ${config.port}`))
  );
} else if (config.env === "production") {
  const relayServer = express();
  relayServer.use(historyApiFallback());
  relayServer.use("/", express.static(path.join(__dirname, "../build")));
  relayServer.use("/graphql", graphQLHTTP({ schema }));
  relayServer.listen(config.port, () =>
    console.log(chalk.green(`Relay is listening on port ${config.port}`))
  );
}
