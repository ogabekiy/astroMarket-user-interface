"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from "next/navigation";
import { Apple, Chrome as Google } from "lucide-react"; // Fixed ChromeIcon to Chrome
import { useLoginMutation, useRegisterMutation } from "@/redux/api/allApi";

export default function AuthForm() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("login"); // Control active tab
  const [loginError, setLoginError] = useState(""); // For error feedback
  const [registerError, setRegisterError] = useState("");

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    firstname: "",
    surname: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    age: "",
  });

  const [login, { isLoading: loginLoading }] = useLoginMutation();
  const [register, { isLoading: registerLoading }] = useRegisterMutation();

  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, "");
    return numbers.slice(0, 9); // Limit to 9 digits
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError(""); // Reset error
    try {
      const result = await login(loginData).unwrap(); // unwrap() gets the data or throws error
      localStorage.setItem("token", result.token); // Adjust based on your API response
      localStorage.setItem("userData", JSON.stringify(result.user)); // Adjust key names
      router.push("/");
    } catch (error) {
      setLoginError(error?.data?.message || "Login failed. Please try again.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterError(""); // Reset error
    try {
      console.log(registerData);
      
      await register(registerData).unwrap();
      setActiveTab("login"); // Switch to login tab on success
    } catch (error) {
      setRegisterError(error?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Shopping</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                required
              />
            </div>
            {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
            <Button type="submit" className="w-full bg-black text-white" disabled={loginLoading}>
              {loginLoading ? "Loading..." : "Login"}
            </Button>
            <Button variant="link" className="w-full" onClick={() => alert("Forgot password clicked")}>
              Forgot Password?
            </Button>

            {/* Social Media Login (Placeholder) */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-background px-2 text-muted-foreground">Login with social media</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" type="button" className="w-full">
                <Google className="mr-2 h-4 w-4" />
                Google
              </Button>
              <Button variant="outline" type="button" className="w-full">
                <Apple className="mr-2 h-4 w-4" />
                Apple
              </Button>
            </div>
          </form>
        </TabsContent>

        <TabsContent value="register">
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstname">First Name</Label>
                <Input
                  id="firstname"
                  placeholder="First name"
                  value={registerData.firstname}
                  onChange={(e) => setRegisterData({ ...registerData, firstname: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="surname">Surname</Label>
                <Input
                  id="surname"
                  placeholder="Surname"
                  value={registerData.surname}
                  onChange={(e) => setRegisterData({ ...registerData, surname: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="register-email">Email</Label>
              <Input
                id="register-email"
                type="email"
                placeholder="Email"
                value={registerData.email}
                onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="register-password">Password</Label>
              <Input
                id="register-password"
                type="password"
                placeholder="Password"
                value={registerData.password}
                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="905670733"
                value={registerData.phone}
                onChange={(e) => setRegisterData({ ...registerData, phone: formatPhone(e.target.value) })}
                required
                maxLength={9}
              />
            </div>

            <div className="space-y-2">
              <Label>Gender (Optional)</Label>
              <RadioGroup
                value={registerData.gender}
                onValueChange={(value) => setRegisterData({ ...registerData, gender: value })}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                placeholder="Age"
                value={registerData.age}
                onChange={(e) => setRegisterData({ ...registerData, age: e.target.value })}
                min="1"
                max="120"
              />
            </div>

            {registerError && <p className="text-red-500 text-sm">{registerError}</p>}
            <Button type="submit" className="w-full bg-black text-white" disabled={registerLoading}>
              {registerLoading ? "Loading..." : "Register"}
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}