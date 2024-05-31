import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import './App.css';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import MainLayout from './components/MainLayout';
import Enquiries from './pages/Enquiries';
import BlogList from './pages/BlogList';
import Blogcatlist from './pages/Blogcatlist';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import Colors from './pages/Colorlist';
import Categorylist from './pages/Categorylist';
import BrandList from './pages/Brandlist';
import ProductList from './pages/Productlist';
import PrivateRoutes from './pages/PrivateRoutes';
import PublicRoutes from './pages/PublicRoutes';
import AddBlog from './pages/AddBlog';
import AddBlogCat from './pages/AddBlogCat';
import AddColor from './pages/AddColor';
import AddCat from './pages/AddCat';
import AddBrand from './pages/Addbrand';
import AddProduct from './pages/AddProduct';
import Coupons from './pages/Coupons';
import AddCoupons from './pages/AddCoupons';

function App() {
  return (
    <div className="App">
        <Router>
          <Routes>
            <Route path='/' element={<PublicRoutes><Login/></PublicRoutes>}/>
            <Route path='/login' element={<PublicRoutes><Login/></PublicRoutes>}/>
            <Route path='/forgot-password' element={<ForgotPassword/>}/>
            <Route path='/reset-password' element={<ResetPassword/>}/>
            <Route path='/admin' element={<PrivateRoutes><MainLayout/></PrivateRoutes>}>
              <Route index element={<Dashboard/>}/>
              <Route path='enquiries' element={<Enquiries/>}/>
              <Route path='blog-list' element={<BlogList/>}/>
              <Route path='blog-category-list' element={<Blogcatlist/>}/>
              <Route path='orders' element={<Orders/>}/>
              <Route path='customers' element={<Customers/>}/>
              <Route path='color-list' element={<Colors/>}/>
              <Route path='category-list' element={<Categorylist/>}/>
              <Route path='brand-list' element={<BrandList/>}/>
              <Route path='brand-list/:id' element={<BrandList/>}/>
              <Route path='product-list' element={<ProductList/>}/>
              <Route path='add-blog' element={<AddBlog/>}/>
              <Route path='add-blog/:id' element={<AddBlog/>}/>
              <Route path='blog-category' element={<AddBlogCat/>}/>
              <Route path='blog-category/:id' element={<AddBlogCat/>}/>
              <Route path='color' element={<AddColor/>}/>
              <Route path='category' element={<AddCat/>}/>
              <Route path='category/:id' element={<AddCat/>}/>
              <Route path='brand' element={<AddBrand/>}/>
              <Route path='brand/:id' element={<AddBrand/>}/>
              <Route path='coupon' element={<AddCoupons/>}/>
              <Route path='coupon/:id' element={<AddCoupons/>}/>
              <Route path='coupon-list' element={<Coupons/>}/>
              <Route path='product' element={<AddProduct/>}/>
              <Route path='product/:id' element={<AddProduct/>}/>
            </Route>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
