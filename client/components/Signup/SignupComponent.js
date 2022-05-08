import React from "react";
import { Grid, cell, Textfield, Button } from "react-mdl";
import Page from "../Page/PageComponent";

export default function Signup() {
  return (
    <Page heading="Signup">
      <div style={{ width: "70%", margin: "auto" }}>
        <Grid>
          <form style={{ margin: "auto" }}>
            <Cell col={12}>
              <Textfield onChange={() => {}} label="Username" />
            </Cell>
            <Cell col={12}>
              <Textfield onChange={() => {}} label="Password" type="password" />
            </Cell>
            <Cell col={12} style={{ textAlign: "right" }}>
              <Button primary>Sign up</Button>
            </Cell>
          </form>
        </Grid>
      </div>
    </Page>
  );
}
