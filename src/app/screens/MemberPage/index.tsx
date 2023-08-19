import React from "react";
import { Container } from "@mui/system";
import { Route, Switch, useRouteMatch, useLocation } from "react-router-dom";
import { VisitMyPage } from "./VisitMyPage";
import { VisitOtherPage } from "./VisitOtherPage";
import "../../../css/my_page.css";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export function MemberPage(props: any) {
  const query = useQuery();
  let member = useRouteMatch();
  const chosen_mb_id: string | null = query.get("mb_id") ?? null;
  const chosen_art_id: string | null = query.get("art_id") ?? null;

  console.log("QUERY mb_id:", query.get("mb_id"));

  return (
    <div className="member_page">
      <Switch>
        <Route path={`${member?.path}/other`}>
          <VisitOtherPage
            chosen_mb_id={chosen_mb_id}
            chosen_art_id={chosen_art_id}
          />
        </Route>
        <Route path={`${member?.path}`}>
          <VisitMyPage />
        </Route>
      </Switch>
    </div>
  );
}
