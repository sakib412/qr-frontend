import './App.css'
import { Link, Route, Routes } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import StudentDashboard from './components/Dashboard/Student';
import QRScanner from './components/QRScanner';
import { AuthContext } from './AuthProvider';
import { useContext, useEffect } from 'react';
import axiosInstance, { ACCESS_TOKEN, REFRESH_TOKEN } from './axios';
import TeacherDashboard from './components/Dashboard/Teacher';


const { Header, Footer } = Layout;
function App() {
  const [authState, setAuthState] = useContext(AuthContext);

  useEffect(() => {
    console.log("App js");

    axiosInstance.get('/user/')
      .then(res => {
        setAuthState(res.data);

      })
      .catch(err => {
        console.log(err.response);
        setAuthState(null);
      })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const logOut = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    setAuthState(null);
    window.location.href = "/signin";
  }

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        {/*  */}
        <Menu theme="dark" mode="horizontal">
          {authState ?
            (<>{authState.is_staff ? <Menu.Item key={4}><Link to="/dashboard/teacher">Teacher Dashboard</Link></Menu.Item> : <Menu.Item key={4}><Link to="/dashboard/student">Student Dashboard</Link></Menu.Item>}<Menu.Item onClick={logOut} key={5}>Sign Out</Menu.Item></>)
            :
            (<>
              <Menu.Item key={2}><Link to="/signin">Sign In</Link></Menu.Item>
              <Menu.Item key={3}><Link to="/signup">Sign Up</Link></Menu.Item>

            </>)}
          <Menu.Item key={1}><Link to="/">Home</Link></Menu.Item>


        </Menu>
      </Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard/student" element={<StudentDashboard />} />
        <Route path="/dashboard/teacher" element={<TeacherDashboard />} />
        <Route path="/scan" element={<QRScanner />} />
      </Routes>

      <Footer style={{ textAlign: 'center' }}> ©2022</Footer>
    </Layout>
  );
}

export default App;
