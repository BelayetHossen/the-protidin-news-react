import { Navigate, createBrowserRouter } from 'react-router-dom'
import { DashboardMain } from '../layouts/DashboardMain'
import FrontMain from '../layouts/FrontMain'
import RoleAll from '../dashboard/pages/admins/role/RoleAll'
import RoleCreate from '../dashboard/pages/admins/role/RoleCreate'
import RoleEdit from '../dashboard/pages/admins/role/RoleEdit'
import AdminAll from '../dashboard/pages/admins/admin/AdminAll'
import AdminCreate from '../dashboard/pages/admins/admin/AdminCreate'
import AdminEdit from '../dashboard/pages/admins/admin/AdminEdit'
import AdminLoginMain from '../layouts/AdminLoginMain'
import AdminLogin from '../dashboard/pages/login/AdminLogin'
import Forgot from '../dashboard/pages/login/Forgot'
import ResetPassword from '../dashboard/pages/login/ResetPassword'
import PrivateRoute from './PrivateRoute'
import CategoryAll from '../dashboard/pages/post/category/CategoryAll'
import CategoryCreate from '../dashboard/pages/post/category/CategoryCreate'
import CategoryEdit from '../dashboard/pages/post/category/CategoryEdit'
import SubCategoryAll from '../dashboard/pages/post/sub-category/SubCategoryAll'
import SubCategoryCreate from '../dashboard/pages/post/sub-category/SubCategoryCreate'
import SubSubCategoryAll from '../dashboard/pages/post/sub-sub-category/SubSubCategoryAll'
import SubSubCategoryCreate from '../dashboard/pages/post/sub-sub-category/SubSubCategoryCreate'
import SubSubCategoryEdit from '../dashboard/pages/post/sub-sub-category/SubSubCategoryEdit'
import TagAll from '../dashboard/pages/post/tags/TagAll'
import TagCreate from '../dashboard/pages/post/tags/TagCreate'
import TagEdit from '../dashboard/pages/post/tags/TagEdit'
import PostAll from '../dashboard/pages/post/posts/PostAll'
import PostCreate from '../dashboard/pages/post/posts/PostCreate'
import PostEdit from '../dashboard/pages/post/posts/PostEdit'
import Home from '../frontend/pages/Home'
import PostDetails from '../frontend/pages/PostDetails'
import Category from '../frontend/pages/Category'
import Identity from '../dashboard/pages/settings/Identity'
import Info from '../dashboard/pages/settings/Info'
import Privacy from '../dashboard/pages/page/Privacy'
import Terms from '../dashboard/pages/page/Terms'
import VideoAll from '../dashboard/pages/post/video/VideoAll'
import VideoCreate from '../dashboard/pages/post/video/VideoCreate'
import VideoEdit from '../dashboard/pages/post/video/VideoEdit'
import Videos from '../frontend/pages/Videos'
import PrivacyPolicy from '../frontend/pages/PrivacyPolicy'
import TermsConditions from '../frontend/pages/TermsConditions'
import Contact from '../frontend/pages/Contact'
import Homead1 from '../dashboard/pages/settings/Homead1'
import Homead2 from '../dashboard/pages/settings/Homead2'
import Homead3 from '../dashboard/pages/settings/Homead3'
import Homead4 from '../dashboard/pages/settings/Homead4'
import Rightad1 from '../dashboard/pages/settings/Rightad1'
import Rightad2 from '../dashboard/pages/settings/Rightad2'
import Rightad3 from '../dashboard/pages/settings/Rightad3'
import Rightad4 from '../dashboard/pages/settings/Rightad4'
import Rightad5 from '../dashboard/pages/settings/Rightad5'
import Message from '../dashboard/pages/message/Message'
import Dashboard from '../dashboard/pages/Dashboard'


export const router = createBrowserRouter([



    {
        path: '/dashboard',
        element: <DashboardMain />,
        children: [

            {
                path: '/dashboard',
                element: <PrivateRoute><Dashboard /></PrivateRoute>,
            },
            // Role
            {
                path: '/dashboard/admin/role',
                element: <PrivateRoute><RoleAll /></PrivateRoute>,
            },
            {
                path: '/dashboard/admin/role/create',
                element: <PrivateRoute><RoleCreate /></PrivateRoute>,
            },
            {
                path: '/dashboard/admin/role/edit/:id',
                element: <PrivateRoute><RoleEdit /></PrivateRoute>,
            },
            // Admin
            {
                path: '/dashboard/admin',
                element: <PrivateRoute><AdminAll /></PrivateRoute>,
            },
            {
                path: '/dashboard/admin/create',
                element: <PrivateRoute><AdminCreate /></PrivateRoute>,
            },
            {
                path: '/dashboard/admin/edit/:id',
                element: <PrivateRoute><AdminEdit /></PrivateRoute>,
            },

            // Category
            {
                path: '/dashboard/post/category',
                element: <PrivateRoute><CategoryAll /></PrivateRoute>,
            },
            {
                path: '/dashboard/post/category/create',
                element: <PrivateRoute><CategoryCreate /></PrivateRoute>,
            },
            {
                path: '/dashboard/post/category/edit/:id',
                element: <PrivateRoute><CategoryEdit /></PrivateRoute>,
            },
            // Sub Category
            {
                path: '/dashboard/post/subcategory',
                element: <PrivateRoute><SubCategoryAll /></PrivateRoute>,
            },
            {
                path: '/dashboard/post/subcategory/create',
                element: <PrivateRoute><SubCategoryCreate /></PrivateRoute>,
            },
            {
                path: '/dashboard/post/subcategory/edit/:id',
                element: <PrivateRoute><AdminEdit /></PrivateRoute>,
            },
            // Sub Sub Category
            {
                path: '/dashboard/post/subsubcategory',
                element: <PrivateRoute><SubSubCategoryAll /></PrivateRoute>,
            },
            {
                path: '/dashboard/post/subsubcategory/create',
                element: <PrivateRoute><SubSubCategoryCreate /></PrivateRoute>,
            },
            {
                path: '/dashboard/post/subsubcategory/edit/:id',
                element: <PrivateRoute><SubSubCategoryEdit /></PrivateRoute>,
            },
            // Tag
            {
                path: '/dashboard/post/tag',
                element: <PrivateRoute><TagAll /></PrivateRoute>,
            },
            {
                path: '/dashboard/post/tag/create',
                element: <PrivateRoute><TagCreate /></PrivateRoute>,
            },
            {
                path: '/dashboard/post/tag/edit/:id',
                element: <PrivateRoute><TagEdit /></PrivateRoute>,
            },
            // Post
            {
                path: '/dashboard/post',
                element: <PrivateRoute><PostAll /></PrivateRoute>,
            },
            {
                path: '/dashboard/post/create',
                element: <PrivateRoute><PostCreate /></PrivateRoute>,
            },
            {
                path: '/dashboard/post/edit/:id',
                element: <PrivateRoute><PostEdit /></PrivateRoute>,
            },
            // Video
            {
                path: '/dashboard/video',
                element: <PrivateRoute><VideoAll /></PrivateRoute>,
            },
            {
                path: '/dashboard/video/create',
                element: <PrivateRoute><VideoCreate /></PrivateRoute>,
            },
            {
                path: '/dashboard/video/edit/:id',
                element: <PrivateRoute><VideoEdit /></PrivateRoute>,
            },

            // Settings
            {
                path: '/dashboard/settings/identity',
                element: <PrivateRoute><Identity /></PrivateRoute>,
            },
            {
                path: '/dashboard/settings/info',
                element: <PrivateRoute><Info /></PrivateRoute>,
            },
            {
                path: '/dashboard/settings/home-ad1',
                element: <PrivateRoute><Homead1 /></PrivateRoute>,
            },
            {
                path: '/dashboard/settings/home-ad2',
                element: <PrivateRoute><Homead2 /></PrivateRoute>,
            },
            {
                path: '/dashboard/settings/home-ad3',
                element: <PrivateRoute><Homead3 /></PrivateRoute>,
            },
            {
                path: '/dashboard/settings/home-ad4',
                element: <PrivateRoute><Homead4 /></PrivateRoute>,
            },
            {
                path: '/dashboard/settings/right-ad1',
                element: <PrivateRoute><Rightad1 /></PrivateRoute>,
            },
            {
                path: '/dashboard/settings/right-ad2',
                element: <PrivateRoute><Rightad2 /></PrivateRoute>,
            },
            {
                path: '/dashboard/settings/right-ad3',
                element: <PrivateRoute><Rightad3 /></PrivateRoute>,
            },
            {
                path: '/dashboard/settings/right-ad4',
                element: <PrivateRoute><Rightad4 /></PrivateRoute>,
            },
            {
                path: '/dashboard/settings/right-ad5',
                element: <PrivateRoute><Rightad5 /></PrivateRoute>,
            },

            // Pages
            {
                path: '/dashboard/pages/privacy-policy',
                element: <PrivateRoute><Privacy /></PrivateRoute>,
            },
            {
                path: '/dashboard/pages/terms',
                element: <PrivateRoute><Terms /></PrivateRoute>,
            },

            // Message
            {
                path: '/dashboard/message',
                element: <PrivateRoute><Message /></PrivateRoute>,
            },





        ]
    },





    {
        path: '/admin',
        element: <AdminLoginMain />,
        children: [
            {
                path: '/admin',
                element: < Navigate to="/admin/login" />,
            },
            {
                path: '/admin/login',
                element: <AdminLogin />,
            },
            {
                path: '/admin/password/forgot',
                element: <Forgot />,
            },
            {
                path: '/admin/password/forgot',
                element: <Forgot />,
            },
            {
                path: '/admin/reset/:token/:email',
                element: <ResetPassword />,
            },

        ]
    },







    {
        path: '/',
        element: <FrontMain />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/details/:slug',
                element: <PostDetails />,
            },
            {
                path: '/category/news/:slug',
                element: <Category />,
            },
            {
                path: '/videos',
                element: <Videos />,
            },
            {
                path: '/privacy',
                element: <PrivacyPolicy />,
            },
            {
                path: '/terms',
                element: <TermsConditions />,
            },
            {
                path: '/contact',
                element: <Contact />,
            },

        ]
    },













    // {
    //     path: '/*',
    //     element: <Page404 />,
    // },
])