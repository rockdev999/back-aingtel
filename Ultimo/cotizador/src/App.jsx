import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import AddProducts from "./pages/AddProducts";
import AddDealers from "./pages/AddDealers";
import ListDealers from "./pages/ListDealers";
import ListProducts from "./pages/ListProducts";
import Navbar from "./components/nav/Navbar";
import HomeAdmin from "./pages/HomeAdmin";
import Footer from "./components/footer/Footer";
import About from "./pages/About";
import Login from "./pages/Login";
import ProductsCards from "./pages/ProductsCards";
import Quoter from "./pages/Quoter";
import AdditionalData from "./pages/AdditionalData";
import QuotesList from "./pages/QuotesList";
import { AdminAuthenticationProvider } from "./contexts/AdminAuthentication";
import { DealerAuthenticationProvider } from "./contexts/DealerAuthentication";
function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        <AdminAuthenticationProvider>
          <DealerAuthenticationProvider>
            <Navbar />
            <div className="flex-grow">
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/products" element={<ProductsCards />} />

                <Route path="/login" element={<Login />} />

                <Route path="/home-admin" element={<HomeAdmin />} />

                <Route path="/add-products" element={<AddProducts />} />
                <Route path="/add-dealers" element={<AddDealers />} />
                <Route path="/list-products" element={<ListProducts />} />
                <Route path="/list-dealers" element={<ListDealers />} />

                <Route path="/quoter" element={<Quoter />} />
                <Route path="/additional-data" element={<AdditionalData />} />
                <Route path="/quotes-list" element={<QuotesList />} />
              </Routes>
            </div>
          </DealerAuthenticationProvider>
        </AdminAuthenticationProvider>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
