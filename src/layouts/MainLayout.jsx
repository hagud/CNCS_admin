import React from "react";
import { Grid } from "semantic-ui-react";
import { TopBar, NavBar, UserInfo } from "../components/Shared";
import { useSelector } from "react-redux";

export function MainLayout(props) {
  const { children } = props;
  const { isAuth } = useSelector((state) => state.auth);

  return (
    <Grid className="bg-zinc-100">
      <Grid.Row columns={1}>
        <Grid.Column children={<TopBar />} />
      </Grid.Row>
      <Grid.Row columns={2} className="ml-4 mr-8 mt-14">
        <Grid.Column
          only="computer"
          width={3}
          children={
            <div className="flex justify-center items-center">
              {isAuth && <UserInfo />}
              <NavBar />
            </div>
          }
        />
        <Grid.Column
          tablet={16}
          computer={13}
          children={children}
          className="bg-white rounded-md shadow"
        />
      </Grid.Row>
    </Grid>
  );
}
