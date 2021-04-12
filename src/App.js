import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { message } from 'antd';
import Routes from './routes';
import { getAdminToken, getToken } from './utils/storage';
import { getAllSellerProducts, getUserData } from './redux';

function App() {
  const dispatch = useDispatch();

  const loggingIn = useSelector(state => state?.user?.loggingIn);

  useEffect(() => {
    dispatch(getUserData());
  }, [loggingIn]);

  const PrivateRouter = () => {
    useEffect(() => {
      message.info({
        content: "You must login to view this page!",
      });
    });

    return <Redirect to="/"></Redirect>
  }

  const AdminPrivateRouter = () => {
    useEffect(() => {
      message.info({
        content: "You must be admin to view this page!"
      })
    });
    return <Redirect to="/admin/login" />
  }

  return (
    <Switch>
      {Routes.map((
        {
          name,
          path,
          privateRoute,
          adminRoute,
          exact,
          displaySearchBar,
          layout: Layout,
          component: Component
        },
        i
      ) => {
        if (privateRoute && !adminRoute) {
          return (
            <Route
              key={`${path}_${i}`}
              path={path}
              exact={exact}
              render={(props) => {
                if (!getToken()) {
                  return <PrivateRouter />
                } else {
                  return (
                    <Layout displaySearchBar={displaySearchBar} {...props}>
                      <Component {...props}></Component>
                    </Layout>
                  )
                }
              }}
            >
            </Route>
          )
        } else if (privateRoute && adminRoute) {
          return (
            <Route
              key={`${path}_${i}`}
              path={path}
              exact={exact}
              render={(props) => {
                if (!getAdminToken()) {
                  return <AdminPrivateRouter />;
                } else {
                  return (
                    <Layout {...props}>
                      <Component {...props}></Component>
                    </Layout>
                  )
                }
              }}
            />
          )
        } else {
          return (
            <Route
              key={`${path}_${i}`}
              path={path}
              exact={exact}
              render={(props) => {
                return (
                  <Layout displaySearchBar={displaySearchBar} {...props}>
                    <Component {...props}></Component>
                  </Layout>
                )
              }
              }
            ></Route>
          )
        }
      })}
      <Route path="*" exact>
        <div style={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center" }}>Page Not Found!</div>
      </Route>
    </Switch >
  );
}

export default App;
