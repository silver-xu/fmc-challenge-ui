import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import { SuppliersDashboard } from "./components/SuppliersDashboard";
import { SuppliersTable } from "./components/SuppliersTable";
import { SupplierDetails } from "./components/SupplierDetails";
import { config } from "./config";

function App() {
  const client = new ApolloClient({
    uri: config.graphQLUri,
  });

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <SuppliersDashboard>
            <Switch>
              <Route path="/supplier/:id">
                <SupplierDetails />
              </Route>
              <Route path="/">
                <SuppliersTable />
              </Route>
            </Switch>
          </SuppliersDashboard>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
