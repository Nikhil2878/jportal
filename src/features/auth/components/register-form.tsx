'use client';

import React, { ChangeEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Mail, Lock, User, Eye, EyeOff, Briefcase } from "lucide-react";
import Link from "next/link";
// import { Select } from "radix-ui";
import { toast } from "sonner"
import { RegisterUserWithConfirmData, registerUserWithConfirmSchema } from "@/features/auth/auth.schema";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm,Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import registerUserAction from "@/app/register/registrationAction.action";

const RegistrationForm = () => {

const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerUserWithConfirmSchema),
  })

 const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async(data:RegisterUserWithConfirmData)=>{
     const result = await registerUserAction(data);

    if(result.status === "SUCCESS"){
      if(data.role === "employer"){
        router.push('/employer-dashboard');
      }else{
        router.push('/dashboard'); 
      } 
    }

     if(result.status === "SUCCESS") toast.success(result.message);
     else toast.error(result.message);
     
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      
      {/* Card Container */}
      <Card className="w-full max-w-lg shadow-xl rounded-2xl">
        
        {/* Header */}
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-blue-600">
            Create Your Account
          </CardTitle>
          <p className="text-center text-gray-500 text-sm">
            Join the job portal and start your journey 🚀
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            {/* Name */}
            <div className="space-y-1">
              <Label>Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400" size={18} />
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  required
                  {...register("name")}
                  className={`pl-10 ${errors.name ? "border-destructive":""}`}
                />
              </div>
              {errors.name && (<p className="text-sm text-destructive">{errors.name.message}</p>)}
            </div>

            {/* Username */}
            <div className="space-y-1">
              <Label>Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400" size={18} />
                <Input
                   id="userName"
                  type="text"
                  placeholder="Enter your username"
                  required
                  {...register("userName")}
                  className={`pl-10 ${errors.userName ? "border-destructive":""}`}
                  
                />
              </div>
              {errors.userName && (<p className="text-sm text-destructive">{errors.userName.message}</p>)}
            </div>

            {/* Email */}
            <div className="space-y-1">
              <Label>Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                <Input
                id="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  {...register("email")}
                  className={`pl-10 ${errors.email ? "border-destructive":""}`}
                 
                />
              </div>
              {errors.email && (<p className="text-sm text-destructive">{errors.email.message}</p>)}
            </div>
 {/* Role Selection */}
            <div className="space-y-2 w-full">
              <Label htmlFor="role">Select your role</Label>
              <Controller name="role" control={control} render={({field})=>(
                 <Select value={field.value} onValueChange={field.onChange} 
               {...register("role")}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="applicant">Job Applicant</SelectItem>
                  <SelectItem value="employer">Employer</SelectItem>
                </SelectContent>
              </Select>
              )}>
             </Controller>
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
                  {...register("password")}
                  className={`pl-10 ${errors.password ? "border-destructive":""}`}
                 
                />
                <div
                  className="absolute right-3 top-3 cursor-pointer text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </div>
              </div>
              {errors.password && (<p className="text-sm text-destructive">{errors.password.message}</p>)}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <Label>Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
                <Input
                     id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  required
                  {...register("confirmPassword")}
                  className={`pl-10 ${errors.confirmPassword ? "border-destructive":""}`}
                  
                />
              </div>
              {errors.confirmPassword && (<p className="text-sm text-destructive">{errors.confirmPassword.message}</p>)}
            </div>

           

            {/* Submit Button */}
            <Button  
            className="w-full bg-blue-600 hover:bg-blue-700">
              Create Account
            </Button>

            {/* Footer */}
            <p className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link href={"/login"}>
              <span className="text-blue-600 cursor-pointer hover:underline">
                Login
              </span>
              </Link>
            </p>

          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrationForm; 