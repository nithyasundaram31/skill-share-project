import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));

    if (userInfo?.role === "admin") {
      navigate("/admin/dashboard");
    } else if (userInfo?.role === "user") {
      navigate("/user/dashboard");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return null; // not required ui
};


export default RedirectDashboard