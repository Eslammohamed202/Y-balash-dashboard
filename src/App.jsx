import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Categories from "./pages/Categories";
// import Stores from "./pages/Stores";
import Orders from "./pages/Orders";
import Analytics from "./pages/Analytics";
import JoinRequests from "./pages/JoinRequests";
import AddProductPage from "./components/add-product/page";
import { ProductProvider } from "./utils/ProductContext";
import ApproveSeller from "./components/ApproveSeller/ApproveSeller";
import AddResturant from "./components/AddResturant/AddResturant";
import ModelResturant from "./components/ModelResturant/ModelResturant";


function App() {
  return (
    <Router>
      <ProductProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/add-product" element={<AddProductPage />} /> {/* 👈 ده المهم */}
          <Route path="/categories" element={<Categories />} />
          <Route path="/orders" element={<Orders />} />
          {/* <Route path="/stores" element={<Stores />} /> */}
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/join requests" element={<JoinRequests />} />
          <Route path="/approve seller" element={<ApproveSeller />} />
          <Route path="/add resturant" element={<AddResturant />} />
          <Route path="/model resturant" element={<ModelResturant />} />
        </Routes>
      </Layout>
         </ProductProvider>
    </Router>
  );
}

export default App;
