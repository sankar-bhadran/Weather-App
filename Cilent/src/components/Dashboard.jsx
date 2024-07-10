import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Main from "./Main";

const Dashboard = () => {
  const [message, setMessage] = useState();
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/dashboard")
      .then((res) => {
        console.log(res);
        if (res.data.valid) {
          console.log(res.data);
          setMessage(res.data.message);
        } else {
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const logoutHandle = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    try {
      const response = await axios.post(
        "http://localhost:3000/api/logout",
        user
      );
      if (response.status === 200) {
        localStorage.clear(); // Clear local storage on the client-side
        navigate("/");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      <header className="header bg-[#E0E0E0] flex justify-between items-center h-[4.6rem] px-[0.8rem] py-[0]">
        <h1 className="text-[#212529] font-[700]">Weather App</h1>
        <nav className="main-nav">
          <button
            onClick={logoutHandle}
            className="bg-[#D2EA28]  text-[#212529] font-[700] py-2 px-4 rounded-[9px] font-montserrat "
          >
            LogOut
          </button>
        </nav>
      </header>
      <Main className="bg-[#E3F2FD]" />
    </div>
  );
};

export default Dashboard;
