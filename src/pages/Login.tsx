import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Loader2 } from "lucide-react";
import { Label } from "../components/ui/label";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../api/firebase";
import { useAuthStore } from "../store/useAuthStore";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  type Inputs = {
    email: string;
    password: string;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: "onBlur" });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    setServerError("");
    setSuccess(false);
    try {
      await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      setSuccess(true);

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error: any) {
      switch (error.code) {
        case "auth/user-not-found":
          setServerError("No account found with this email.");
          break;
        case "auth/wrong-password":
          setServerError("Incorrect password.");
          break;
        default:
          setServerError("An error occurred. Please try again later.");
      }
    } finally {
      if (!success) setLoading(false);
    }
  };
  const { user, loading: authLoading } = useAuthStore();
  useEffect(() => {
    // If we have a user and we aren't currently checking the session
    if (user && !authLoading) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, authLoading, navigate]);
  return (
    <div className="flex h-screen w-full items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md shadow-xl border-t-4 border-t-blue-600">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Healthcare Portal
          </CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access the B2B dashboard
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            {/* Server-side Error Alert */}
            {serverError && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                {serverError}
              </div>
            )}
            {success && (
              <div className="p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded-md">
                Login successful! Redirecting to dashboard...
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="doctor@hospital.com"
                className={
                  errors.email
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className={
                  errors.password
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Min 6 characters" },
                  // Example of a custom function validation
                  validate: (value) =>
                    !value.includes("password") ||
                    "Password cannot contain the word 'password'",
                })}
              />
              {errors.password && (
                <p className="text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
          </CardContent>

          <CardFooter>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
