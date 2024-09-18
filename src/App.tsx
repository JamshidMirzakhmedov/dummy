import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products/Products";
import Users from "./pages/Users/Users";
import Posts from "./pages/Posts/Posts";
import Todos from "./pages/Todos/Todos";
import Layout from "./components/Layout";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import UserProfile from "./pages/Users/UserProfile";
import ProductDetails from "./pages/Products/ProductDetails";
import NotFound from "./pages/NotFound";
import SingleUserPage from "./pages/Users/SingleUser";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<SingleUserPage />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/todos" element={<Todos />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
