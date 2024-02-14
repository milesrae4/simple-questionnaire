import React from 'react';
import styled from '@emotion/styled';
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from 'react-router-dom';
import { Home, Quiz } from '../pages';
import { PageWrapper } from '../utility';

const routes = [
  {
    path: '/',
    exact: true,
    main: () => <Home />,
  },
  {
    path: '/quiz',
    exact: true,
    main: () => <Quiz />,
  },
];

export const Nav: React.VFC = () => {
  return (
    <Router>
      <Container>
        <PageContainer>
          <Switch>
            {routes.map(route => (
              <Route key={route.path} path={route.path} exact={route.exact}>
                <PageWrapper>{<route.main />}</PageWrapper>
              </Route>
            ))}
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </PageContainer>
      </Container>
    </Router>
  );
};

const Container = styled.div`
  display: flex;
  height: 100%;
`;

const PageContainer = styled.main`
  flex: 1;
  display: grid;
`;
