import React from 'react';
import {
  ApolloProvider, ApolloClient, InMemoryCache, split, HttpLink,
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import {
  Container, createTheme, CssBaseline, Grid, ThemeProvider,
} from '@mui/material';
import { AuthProvider } from './helpers/auth';
import Chat from './dashboards/Chat';
import User from './dashboards/User';
import Ranking from './dashboards/Ranking';
import Chart from './dashboards/Chart';
import './App.css';
import Top from './dashboards/Top';

const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' });

const wsLink = new GraphQLWsLink(createClient({ url: 'ws://localhost:4000/graphql' }));

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition'
      && definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Container maxWidth="lg" sx={{ py: 2 }}>
        <CssBaseline />
        <ApolloProvider client={client}>
          <AuthProvider>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <User />
              </Grid>
              <Grid item xs={8}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Top />
                  </Grid>
                  <Grid item xs={12}>
                    <Chart />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Ranking />
                  </Grid>
                  <Grid item xs={8}>
                    <Chat />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </AuthProvider>
        </ApolloProvider>
      </Container>
    </ThemeProvider>
  );
}

export default App;
