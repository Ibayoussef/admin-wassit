import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from './Layout';
import LoginPage from './Pages/Login.jsx';
import Users from './Pages/Users.jsx';
import Chat from './Pages/Chat.jsx';
import Requests from './Pages/Requests.jsx';
import Messages from './Pages/Messages.jsx';
import FormData from './Pages/FormData.jsx';
import Receipts from './Pages/Receipts';
import Reviews from './Pages/Reviews';
import Reports from './Pages/Reports.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import Services from './Pages/Services.jsx';
import SingleService from './Pages/SingleService.jsx';
import Assignement from './Pages/Assignement.jsx';
import Projects from './Pages/Projects.jsx';
import CreateUser from './Pages/CreateUser.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Requests /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'users', element: <Users /> },
      { path: 'chat', element: <Chat /> },
      { path: 'projects', element: <Projects /> },
      { path: 'services', element: <Services /> },
      { path: 'services/:id', element: <SingleService /> },
      { path: 'services/create', element: <SingleService create /> },
      { path: 'pro/create', element: <CreateUser /> },
      { path: 'assign', element: <Assignement /> },
      { path: 'formdata', element: <FormData /> },
      { path: 'receipts', element: <Receipts /> },
      { path: 'reviews', element: <Reviews /> },
      { path: 'reports', element: <Reports /> },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
