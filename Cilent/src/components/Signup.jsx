import { Formik, useFormik } from "formik";
import { signUpSchema } from "../schemas/signupschema";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
const initialValues = {
  username: "",
  email: "",
  password: "",
};
const Signup = () => {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSchema,
      onSubmit: async (values, { resetForm }) => {
        try {
          const response = await axios.post(
            "http://localhost:3000/api/register",
            values
          );
          console.log("Success:", response.data);
          toast.success(response.data.message);
          resetForm();
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
                  Create an Account
                </h1>
              </div>
              <>
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="border-2 border-[#D2EA28] rounded-[9px] w-[80%] p-2 "
                />
              </>
              {errors.username && touched.username ? (
                <span className="form-error text-[red] font-[0.875rem] ">
                  {errors.username}
                </span>
              ) : null}

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
                Sign Up
              </button>
              <p className="text-[16px] font-[500] font-montserrat ">
                Already have an account <Link to="/">Login</Link>
              </p>
            </div>
          </form>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
};

export default Signup;
