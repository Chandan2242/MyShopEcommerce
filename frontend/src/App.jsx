import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import { HomePage } from "./pages/HomePage"
import { OrdersPage } from "./pages/OrdersPage"
import ProductsPage from "./pages/ProductsPage"
import { CartPage } from "./pages/CartPage"
import { LoginPage } from "./pages/LoginPage"
import { SignupPage } from "./pages/SignupPage"
import { ProductDetailsPage } from "./pages/ProductDetailsPage"
import { AdminDashboard } from "./pages/AdminDashboard"
import ProductForm from "./pages/ProductForm"

import { CartProvider } from "./context/CartContext"
import { Profile } from "./pages/Profile"
import ConfirmOrders from "./pages/ConfirmOrders"

import AdminProducts from "./pages/AdminProducts";
import AdminOrders from "./pages/AdminOrders";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import Categories from "./pages/Categories";
// import AdminDashboard from "./pages/AdminDashboard";
// import AdminProducts from "./pages/AdminProducts";
// import ProductUpload from "./pages/ProductUpload";

function App() {


  return (
    <>

      <div className="hero">
        <CartProvider>
          <BrowserRouter>

            <Routes>
              <Route path="/" element={<><Header /> <HomePage /> <Footer /> </>} />
              <Route path="/orders" element={<><Header /> <OrdersPage /> <Footer /> </>} />
              <Route path="/products" element={<><Header /> <ProductsPage /> <Footer /> </>} />
              <Route path="/cart" element={<><Header /> <CartPage /> <Footer /> </>} />
              <Route path="/login" element={<><Header /> <LoginPage /> <Footer /> </>} />
              <Route path="/signup" element={<><Header /> <SignupPage /> <Footer /> </>} />

              <Route path="/products/:id" element={<><Header /> <ProductDetailsPage /> <Footer /> </>} />
              <Route path="/admin-dashboard" element={<> <AdminDashboard />  </>} />
              <Route path="/admin-dashboard1" element={<> <AdminDashboard />  </>} />
              <Route path="/product-upload" element={<> <ProductForm />  </>} />
              <Route path="/profile" element={<> <Header /> <Profile /> <Footer /> </>} />
              <Route path="/confirm-order" element={<>  <ConfirmOrders /> </>} />
              <Route path="/admin/products" element={<AdminProducts />} />
              <Route path="/product-upload" element={<ProductForm />} />
              <Route path="/admin/orders" element={<AdminOrders />}/>
              <Route path="/orders/:id" element={<OrderDetailsPage />} />
              <Route path="/categories" element={<Categories />}/>



            </Routes>

          </BrowserRouter>
        </CartProvider>
      </div>
    </>
  )
}

export default App
