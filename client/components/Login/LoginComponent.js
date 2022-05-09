import React from "react";
import { Grid, Cell, Textfield, Button, Checkbox } from "react-mdl";
import Page from "../Page/PageComponent";
import ReactDOM from 'react-dom'

export default function LoginComponent() {
  ReactDOM.render (
    console.log("teste"),
    <Page heading="Login">
      
      <div style={{ width: "70%", margin: "auto" }}>
        <Grid>
          <form style={{ margin: "auto" }}>
            <Cell col={12}>
              <Textfield onChange={() => {}} label="Username" />
            </Cell>
            <Cell col={12}>
              <Textfield onChange={() => {}} label="Password" type="password" />
            </Cell>
            <Cell col={12}>
              <Checkbox
                label="Remember me"
                ripple
                style={{ textAlign: "right" }}
              ></Checkbox>
            </Cell>
            <Cell col={12} style={{ textAlign: "right" }}>
              <a href="#">Forgot password?</a>
              <Button primary>Login</Button>
            </Cell>
          </form>
        </Grid>
      </div>
    </Page>
  );
}
