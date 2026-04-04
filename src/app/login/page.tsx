'use client';

import React, { ChangeEvent,useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Mail, Lock, User, Eye, EyeOff, Briefcase } from "lucide-react";
import Link from "next/link";

interface LoginFormData {

  email: string;
  password: string;
}

//form - formEvent
//input - inputEvent

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  // Handle input change
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

  const handleInputChange = (name:string,value:string) => {
    setFormData((prev) => ({
        ...prev,
        [name]:value,
    }))
  }

      
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      
      {/* Card Container */}
      <Card className="w-full max-w-lg shadow-xl rounded-2xl">
        
        {/* Header */}
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-blue-600">
            Login
          </CardTitle>
          <p className="text-center text-gray-500 text-sm">
            Join the job portal and start your journey 🚀
          </p>
        </CardHeader>

        <CardContent>
          <form className="space-y-5">

            {/* Email */}
            <div className="space-y-1">
              <Label>Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                <Input
                id="username"
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={formData.email}
                  className="pl-10"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("email",e.target.value)}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <Label>Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
                <Input
                   id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                  value={formData.password}
                  className="pl-10"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("password",e.target.value)}
                />
                <div
                  className="absolute right-3 top-3 cursor-pointer text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </div>
              </div>
            </div>

            
          

            {/* Submit Button */}
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Login
            </Button>

            {/* Footer */}
            <p className="text-center text-sm text-gray-500">
              <Link href={"/register"}>
              <span className="text-blue-600 cursor-pointer hover:underline">
                Create new account
              </span>
              </Link>
            </p>

          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;