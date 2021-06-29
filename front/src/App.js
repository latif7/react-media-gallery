import routes from "./routes/routes";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <Switch>
      {routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            render={(props) => {
              // return <route.component {...props} />;
              return (
                <route.layout>
                  <route.component {...props} />
                </route.layout>
              );
            }}
          />
        );
      })}
    </Switch>
  );
}

export default App;
