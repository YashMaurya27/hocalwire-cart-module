import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import { Suspense, lazy } from "react";
import Checkout from "./components/Checkout/Checkout";

function App() {
  const Home = lazy(() => import("./components/Home/Home"));
  const Product = lazy(() => import("./components/Product/Product"));
  return (
    <div className="App">
      <Routes>
        <Route
          element={
            <Suspense fallback={<></>}>
              <Home />
            </Suspense>
          }
          path="home"
        >
          <Route path="*" element={<>Page not found</>} />
        </Route>
        <Route
          element={
            <Suspense fallback={<></>}>
              <Product />
            </Suspense>
          }
          path="product/:id"
        >
          <Route path="*" element={<>Page not found</>} />
        </Route>
        <Route
          element={
            <Suspense fallback={<></>}>
              <Checkout />
            </Suspense>
          }
          path="checkout"
        >
          <Route path="*" element={<>Page not found</>} />
        </Route>
        <Route path="*" element={<Navigate to={"home"} />} />
      </Routes>
    </div>
  );
}

export default App;
