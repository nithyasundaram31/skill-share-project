import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { selectEmail, selectPassword, setEmail, setPassword } from "../redux/features/auth/loginSlice";
import authServices from "../services/authServices";
import { toast } from "react-toastify";

const LoginPage = () => {

    const email = useSelector(selectEmail);
    const password = useSelector(selectPassword);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async(e) => {
        e.preventDefault();
try{
    const response= await  authServices.login({ email, password })
            console.log("the login response is:",response)
                toast.success(response.data.message);
         localStorage.setItem("user", JSON.stringify(response.data.user));

                // clear the form
                dispatch(setEmail(''));
                dispatch(setPassword(''));

                // navigate to the dashboard
              setTimeout(() => {
  const role = response.data.user.role;
  if (role === "admin") {
    navigate("/admin/dashboard");
  } else {
    navigate("/user/dashboard");
  }
}, 500);

        }catch(error){
                toast.error(error.response.data.message);
            }
    }

    return (
        <div className="max-w-xs mx-auto mt-20 p-6 border rounded">
            <h2 className="text-xl mb-4">User Login</h2>
            <form className="flex flex-col space-y-3"
                onSubmit={handleLogin}
            >
                <input name='email' type="email" placeholder="Email" className="border p-2 rounded"
                    value={email}
                    onChange={(e) => dispatch(setEmail(e.target.value))}
                />

                <input name='password' type="password" placeholder="Password" className="border p-2 rounded"
                    value={password}
                    onChange={(e) => dispatch(setPassword(e.target.value))}
                />

                <button className="bg-blue-500 text-white p-2 rounded" type="submit">Login</button>
            </form>
            <p className="mt-4 text-center">
                Don't have an account? <Link to="/register" className="text-blue-500">Register here</Link>
            </p>
        </div>
    )
}

export default LoginPage;