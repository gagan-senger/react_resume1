import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import { Products } from "./pages/Products";
import { Arrival } from "./pages/Arrival";
import Contact from "./pages/Contact";
import AppLayout from './components/Layout/AppLayout';
import { CartProvider } from "./context/CartContext";
import { ProductDetails } from "./components/UI/ProductDetails";
import { WomenProducts } from "./pages/WomenProducts";
import { MenProducts } from "./pages/MenProducts";
import { SearchProvider } from "./context/SearchContext";
// import Contact from "./pages/Contact";
import About from "./pages/About";
import { CategoryPage } from "./components/UI/CategoryPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/products", element: <Products /> },
      { path: "/arrival", element: <Products /> },
      { path: "/menproducts", element: <MenProducts /> },
      { path: "/womenproducts", element: <WomenProducts /> },
      { path: "/product/:id", element: <ProductDetails />, },
      { path: "/category/:type", element: <CategoryPage />, },
      { path: "/contact", element: <Contact />, },
      { path: "/about", element: <About />, },
    ],
  },
]);

const App = () => {
  return (
    <SearchProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </SearchProvider>
  );
};

export default App;