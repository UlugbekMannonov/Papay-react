import React from "react";
import { Container } from "@mui/system";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { VisitMyPage } from "./VisitMyPage";
import { VisitOtherPage } from "./VisitOtherPage";
import "../../../css/my_page.css";

export function MemberPage(props: any) {
  const { verifiedMemberData } = props;
  let memeber = useRouteMatch();
  console.log(memeber);
  return (
    <div className="member_page">
      <Switch>
        <Route path={`${memeber.path}/other`}>
          <VisitOtherPage verifiedMemberData={verifiedMemberData} />
        </Route>
        <Route path={`${memeber.path}`}>
          <VisitMyPage verifiedMemberData={verifiedMemberData} />
        </Route>
      </Switch>
    </div>
  );
}