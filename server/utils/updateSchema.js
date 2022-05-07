import path from "path";
import fs from "fs";
import { graphql } from "graphql";
import chalk from "chalk";
import { introspectionQuery, printSchema } from "graphql/utilities";
import schema from "../data/schema";

const jsonFile = path.join(__dirname, "../data/schema.json");
const graphQLFile = path.join(__dirname, "../data/schema.graphql");

async function updateSchema() {
  try {
    const json = await graphql(schema, introspectionQuery);
    fs.writeFileSync(jsonFile, JSON.stringify(json, null, 2));
    fs.writeFileSync(graphQLFile, printSchema(schema));
    console.log(chalk.green("Schema updated successfully"));
  } catch (err) {
    console.log(chalk.red(err.stack));
  }
}

if (!module.parent) updateSchema();
export default updateSchema;