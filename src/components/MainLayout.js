import React, { useState } from 'react';
import { Layout, Menu, Button, theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import {AiOutlineDashboard,AiOutlineBgColors} from 'react-icons/ai'
import {FiUsers} from 'react-icons/fi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {FaProductHunt,FaNewspaper,FaMicroblog} from 'react-icons/fa'
import {GiHamburgerMenu} from 'react-icons/gi'
import {SlSocialStumbleupon} from 'react-icons/sl'
import {RiCoupon3Fill} from 'react-icons/ri'
import {BiSolidCoupon} from 'react-icons/bi'
import {BiSolidBell} from 'react-icons/bi'
import {TbBrandSymfony,TbCategory2} from 'react-icons/tb'
import {BsFillCartFill,BsFillBoxSeamFill,BsNewspaper,BsFillMegaphoneFill} from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';
const { Header, Sider, Content } = Layout;

const MainLayout= () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const logOut = ()=>{
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className=" fixed logo d-flex align-items-center justify-content-center">
          <h3 className='text-center text-white fs-5 mb-0 '>
            <span className='sm-logo'>AC</span>
            <span className='lg-logo'>AppC</span>
            </h3>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['']}
          onClick={({key})=>{
            if(key==="signout")
            {

            }
            else{
              navigate(key)
            }
          }}
          items={[
            {
              key: '',
              icon: <AiOutlineDashboard className='fs-4'/>,
              label: 'DashBoard',
            },
            {
              key: 'customers',
              icon: <FiUsers className='fs-4'/>,
              label: 'Customers',
            },
            {
              key: 'Catalog',
              icon: <FaProductHunt className='fs-4'/>,
              label: 'Catalog',
              children:[
                {
                  key: 'product',
                  icon: <BsFillCartFill className='fs-4'/>,
                  label: 'Add Product',
                },
                {
                  key: 'product-list',
                  icon: <BsFillCartFill className='fs-4'/>,
                  label: 'Product List',
                },
                {
                  key: 'brand',
                  icon: <TbBrandSymfony className='fs-4'/>,
                  label: 'Brand',
                },
                {
                  key: 'brand-list',
                  icon: <TbBrandSymfony className='fs-4'/>,
                  label: 'Brand List',
                },
                {
                  key: 'category',
                  icon: <TbCategory2 className='fs-4'/>,
                  label: 'Category',
                },
                {
                  key: 'category-list',
                  icon: <TbCategory2 className='fs-4'/>,
                  label: 'Category List',
                },
                {
                  key: 'color',
                  icon: <AiOutlineBgColors className='fs-4'/>,
                  label: 'Color',
                },
                {
                  key: 'color-list',
                  icon: <AiOutlineBgColors className='fs-4'/>,
                  label: 'Color List',
                },
              ],
            },
            {
              key:"orders",
              icon:<BsFillBoxSeamFill className='fs-4'/>,
              label:"Orders" 
            },
            {
              key:"marketing",
              icon:<SlSocialStumbleupon className='fs-4'/>,
              label:"Marketing",
              children:[
                {
                  key:"coupon",
                  icon:<RiCoupon3Fill/>,
                  label:'Add Coupon'
                },
                {
                  key:"coupon-list",
                  icon:<BiSolidCoupon/>,
                  label:'Coupon List'
                },
              ]
            },
            {
              key:"blogs",
              icon:<BsNewspaper className='fs-4'/>,
              label:"Blogs",
              children:[
                {
                  key:"add-blog",
                  icon:<FaNewspaper/>,
                  label:'Add Blog'
                },
                {
                  key:"blog-list",
                  icon:<FaMicroblog/>,
                  label:'Blog List'
                },
                {
                  key:"blog-category",
                  icon:<FaNewspaper/>,
                  label:'Add Blog Category'
                },
                {
                  key:"blog-category-list",
                  icon:<FaMicroblog/>,
                  label:'Blog Category List'
                },
              ]
            },
            {
              key:"enquiries",
              icon:<BsFillMegaphoneFill/>,
              label:"Enquires"
            } 
            // gt
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} className='d-flex justify-content-between ps-3 pe-5'>
          <Button
            type="text"
            icon={collapsed ? <GiHamburgerMenu/> : <GiHamburgerMenu/>}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <div className='d-flex gap-3 align-items-center'>
            <div className='position-relative'>
              <BiSolidBell className='fs-5'/>
              <span className='badge rounded-circle p-1 position-absolute'>1</span>
            </div>
            <div className='d-flex gap-3 align-items-center justify-content-center dropdown' >
              <div className=''>
                <img className='img-fluid' style={{width:"35px",height:"35px"}} src="https://www.tekportal.net/wp-content/uploads/2019/02/admin-7629.jpg" alt="" />
              </div>
              <div role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">  
                <h5 className='fs-6 mb-0'>{localStorage.getItem('user')?JSON.parse(localStorage.getItem('user'))?.firstname:"N/A"}</h5>
                <p className='mb-0'>{localStorage.getItem('user')?JSON.parse(localStorage.getItem('user'))?.email:"N/A"}</p>
              </div>
              <div className='dropdown-menu' aria-labelledby='dropdownMenuLink'>
                  <li className='mb-0 py-0' style={{height:"auto",lineHeight:"2"}}><Link className="dropdown-item" to="/">Profile</Link></li>
                  
                  <li className='mb-0 py-0' style={{height:"auto",lineHeight:"2"}}><Link className="dropdown-item" to="/" onClick={()=>logOut()}>Sign Out</Link></li>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <ToastContainer
            position='top-right'
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='light'
          />
         <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;