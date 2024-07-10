import { Link } from "react-router-dom";
import { Formik, useFormik } from "formik";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { loginSchema } from "../schemas/loginSchema";
const initialValues = {
  email: "",
  password: "",
};
const Login = () => {
  const navigate = useNavigate();
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: loginSchema,
      onSubmit: async (values, { resetForm }) => {
        try {
          axios.defaults.withCredentials = true;
          const response = await axios.post(
            "http://localhost:3000/api/login",
            values
          );
          if (response.data) {
            localStorage.setItem("user", JSON.stringify(response.data.user));
            console.log(response.data.login);
            navigate("/Dashboard");
            resetForm();
          } else {
            navigate("/");
          }
        } catch (error) {
          console.log("error", error);
          if (error.response && error.response.status === 400) {
            toast.error(error.response.data.message);
            resetForm();
          } else {
            toast.error("Registration failed. Please try again.");
          }
        }
      },
    });
  console.log(Formik);
  return (
    <div>
      <section className="h-screen bg-[#E0E0E0] flex justify-center items-center  ">
        <div className="w-[500px] h-[450px] bg-white p-4 rounded-[9px]">
          <form action="" onSubmit={handleSubmit}>
            <div className="flex flex-col justify-center items-center gap-4 p-10 ">
              <div className="text-center">
                <h1 className="text-[20px] font-[700] font-montserrat ">
                  Welcome back
                </h1>
                <p className="text-[16px] font-[500] font-montserrat ">
                  Hey Enter your details to get Login
                </p>
                <p className="text-[16px] font-[500] font-montserrat ">
                  in to your account
                </p>
              </div>
              <input
                type="text"
                placeholder="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className="border-2 border-[#D2EA28] rounded-[9px] w-[80%] p-2 "
              />
              {errors.email && touched.email ? (
                <span className="form-error text-[red] font-[0.875rem] ">
                  {errors.email}
                </span>
              ) : null}

              <input
                type="password"
                placeholder="Password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className="border-2 border-[#D2EA28] rounded-[9px] w-[80%] p-2"
              />
              {errors.password && touched.password ? (
                <p className="form-error text-[red] font-[0.875rem] ">
                  {errors.password}
                </p>
              ) : null}
              <button className="bg-[#D2EA28] w-[80%] text-[#212529] font-[700] py-2 px-4 rounded-[9px] font-montserrat ">
                Login in
              </button>
              <p className="text-[16px] font-[500] font-montserrat ">
                Do not have an account <Link to="/signup">Sign up</Link>
              </p>
            </div>
          </form>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
};

export default Login;
