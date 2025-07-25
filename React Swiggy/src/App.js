// app.js
import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet, Router,
  createRoutesFromElements
} from "react-router-dom";

import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurentMenu from "./components/RestaurentMenu";
// import Grocery from "./components/Grocery";
import Shimmer from "./components/Shimmer";
import { UserProvider } from "./utils/UserContext";
import Cart from "./components/Cart";
import { Provider } from "react-redux";
import appStore from "./Store/appStore";
import Toast from './components/Toast';
import ErrorBoundary from './components/ErrorBoundary';


const Grocery = lazy(() => import("./components/Grocery"));
// const Grocerry = lazy(() => import("path"));

// App layout with shared Header
const AppLayout = () => {
  return (
    <Provider store={appStore}>
      <UserProvider>
        <div className="app">
          <Header />
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
          <Toast />
        </div>
      </UserProvider>
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/restaurant/:resId",
        element: <RestaurentMenu />,
      },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<Shimmer />}>
            <Grocery />
          </Suspense>
        ),
      }
    ],
    errorElement: <Error />,
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RouterProvider router={appRouter} />
);
