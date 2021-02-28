import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { message } from 'antd';
import Routes from './routes';
import { getToken } from './utils/storage';
import { getAllSellerProducts } from './redux';

function App() {
  // const UserRoutes = () => {
  //   return (
  //     <div>
  //       <Navbar />
  //       <LandingPage />
  //     </div>
  //   );
  // };

  const dispatch = useDispatch();

  const userId = useSelector(state => state.user.user?.user_id);
  const addingSellerProductsSuccess = useSelector(state => state.addSellerProducts?.addingSellerProductsSuccess);  
  
  //Get Seller All Product Details
  useEffect(() => {    
    dispatch(getAllSellerProducts(userId));
  }, [userId, addingSellerProductsSuccess]);

  return (
    <Switch>
      {/* <Route path="/users/login" exact component={LoginPage}>
      </Route>
      <Route path="/users/register" exact component={RegisterUser}>
      </Route>
      <Route path="/" exact component={UserRoutes}></Route>
      <Route path="*" render={() => {
        return (
          <h2>Page Not Found</h2>
        )
      }}>
      </Route> */}
      {Routes.map((
        {
          name,
          path,
          privateRoute,
          exact,
          displaySearchBar,
          layout: Layout,
          component: Component
        },
        i
      ) => {
        if (privateRoute) {
          return (
            <Route
              key={`${path}_${i}`}
              path={path}
              exact={exact}
              render={(props) => {
                if (!getToken()) {
                  message.info({
                    content: "You must login to view this page!",
                  });
                  return <Redirect to="/"></Redirect>
                } else {
                  return (
                    <Layout {...props}>
                      <Component {...props}></Component>
                    </Layout>
                  )
                }
              }}
            >
            </Route>
          )
        } else {
          return (
            <Route
              key={`${path}_${i}`}
              path={path}
              exact={exact}
              render={(props) => {
                // console.log(props);
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
    </Switch >
  );
}

export default App;
