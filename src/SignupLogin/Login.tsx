import {
  Anchor,
  Button,
  Checkbox,
  LoadingOverlay,
  PasswordInput,
  rem,
  TextInput,
} from "@mantine/core";
import { IconAt, IconCheck, IconLock, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginValidation } from "../Services/FormValidation";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";
import ResetPassword from "./ResetPassword";
import { useDispatch } from "react-redux";
import { setUser } from "../Slices/UserSlice";
import {
  errorNotification,
  successNotification,
} from "../Services/NotificationService";
import { setJwt } from "../Slices/JwtSlice";
import { jwtDecode } from "jwt-decode";
import { loginUser } from "../Services/AuthService";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const form = {
    email: "",
    password: "",
  };
  const [data, setData] = useState<{ [key: string]: string }>(form);
  const [formError, setFormError] = useState<{ [key: string]: string }>(form);
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();

  // Added missing handleChange function
  const handleChange = (event: any) => {
    setFormError({ ...formError, [event.target.name]: "" });
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    let valid = true,
      newFormError: { [key: string]: string } = {};
    for (let key in data) {
      newFormError[key] = loginValidation(key, data[key]);
      if (newFormError[key]) valid = false;
    }
    setFormError(newFormError);

    if (valid) {
      setLoading(true);
      loginUser(data)
        .then((res) => {
          successNotification(
            "Login Successful",
            "Redirecting to home page ....."
          );
          dispatch(setJwt(res.jwt));
          const decoded = jwtDecode(res.jwt);
          dispatch(setUser({...decoded,email:decoded.sub}));
          setTimeout(() => {
            navigate("/"); // Fixed - should navigate to home, not login
          }, 3000);
        })
        .catch((err) => {
          setLoading(false);
          errorNotification("Login Failed", "Retry To Login !");
        });
    }
  };

  return (
    <>
      <LoadingOverlay
        visible={loading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "brightSun.4", type: "bars" }}
      />
      <div className="w-1/2 px-20 flex flex-col justify-center gap-3">
        <div className="text-2xl font-semibold">Login Account</div>
        <TextInput
          leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
          label="E-mail"
          withAsterisk
          placeholder="Your email"
          error={formError.email}
          name="email"
          value={data.email}
          onChange={handleChange} // Added missing onChange
        />
        <PasswordInput
          withAsterisk
          leftSection={<IconLock size={18} stroke={1.5} />}
          label="Password"
          placeholder="Password"
          value={data.password}
          error={formError.password}
          name="password"
          onChange={handleChange} // Added missing onChange
        />
        <Button
          loading={loading}
          onClick={handleSubmit}
          autoContrast
          variant="filled"
        >
          Login
        </Button>{" "}
        {/* Fixed button text */}
        <div className="text-center">
          Don't have an account ?
          <span
            onClick={() => {
              navigate("/signup");
              setFormError(form);
              setData(form);
            }}
            className="text-bright-sun-400 hover:underline cursor-pointer"
          >
            Signup
          </span>
        </div>
        <div
          onClick={open}
          className="text-bright-sun-400 hover:underline cursor-pointer text-center"
        >
          Forget Password
        </div>
      </div>
      <ResetPassword opened={opened} close={close} />
    </>
  );
};

export default Login;
