"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Stepper } from "@/components/Stepper";
import { Button } from "@/components/ui/button";
import { toast, Toaster } from "sonner";
import { Eye } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Home() {
   const [length, setLength] = useState<number>(8);
   const [number, setNumber] = useState<number>(0);
   const [special, setSpecial] = useState(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/g)
  const OnChange = (event: React.ChangeEvent<HTMLInputElement>) => {};
  const handleSubmit = () => {
      if (confirm==password && password!=="" && confirm!=="") {
        toast("Account created successfully")
      }else{
        toast("Password must be confirmed")
      }
  };

  const [passwordShown, setPasswordShown] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [confirm, confirmPassword] = useState("");
 
const [step, setSteps] = useState<number>(1);

  const numbersOnly = password.replace(/\D/g, ""); 
  const foundSpecial = password.match(special);
  
  const handlePrevStep = () => {
    setSteps(step - 1);
  };

  const handleNextStep = () => {

    setSteps(step + 1);
  };

  // const [tick,setTick] = useState<Number>(0)
  return (
    <div className="mx-auto w-screen h-screen flex flex-col justify-center items-center">
      <Toaster position="top-right" theme="dark" />
      <Card className="w-80 bg-white shadow border border-stone-400">
        <CardHeader>
          <div className="text-[20px]">Sign-in</div>
          <CardTitle></CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-1 flex-wrap">
            <Toaster position="top-right" theme="dark" />
            {step == 1 && (
              <div className="flex gap-1 flex-wrap">
                <Input
                  type=""
                  placeholder="Username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  className="w-50 h-9 border border-black rounded bg-white pl-2"
                />
                <div className="relative flex flex-wrap gap-1">
                  <Input
                    type=""
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    className="w-50 h-9 border border-black rounded bg-white pl-2"
                  />
                  <Input
                    type=""
                    placeholder="YYYY/MM/DD"
                    value={birthdate}
                    onChange={(e) => {
                      setBirthdate(e.target.value);
                    }}
                    className="w-50 h-9 border border-black rounded bg-white pl-2"
                  />
                </div>
              </div>
            )}
            {step == 2 && (
              <div className="flex gap-2 flex-wrap">
                <div className="relative">
                  <Input
                    placeholder="Password"
                    type={passwordShown ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    className="w-50 h-9 border border-black rounded bg-white pl-2"
                  />
                  <Button
                    variant={"ghost"}
                    className="absolute h-9 right-0.5 top-0.5 hover:h-8 "
                    onClick={() => {
                      setPasswordShown(!passwordShown);
                    }}
                  >
                    <Eye />
                  </Button>
                </div>
                {length! >= password.length && (
                  <p className="text-[12px] text-red-600">
                    * Password must be atleast 8 digits
                  </p>
                )}
                {number! >= numbersOnly.length && (
                  <p className="text-[12px] text-red-600">
                    * Password must include aleast one number
                  </p>
                )}
                {foundSpecial?.length != 1 && (
                  <p className="text-[12px] text-red-600">
                    * Password must include one special character
                  </p>
                )}
                <Input
                  placeholder="Confirming password"
                  type={passwordShown ? "text" : "password"}
                  value={confirm}
                  onChange={(e) => {
                    confirmPassword(e.target.value);
                  }}
                  className="w-50 h-9 border border-black rounded bg-white pl-2"
                />
                {confirm !== password && (
                  <div className="text-[12px] text-red-600">
                    * Password must be the same
                  </div>
                )}
                <div className="flex gap-1">
                  <Button className="w-30" onClick={handlePrevStep}>
                    Prev
                  </Button>
                  <Button className="w-30" onClick={handleSubmit}>
                    Submit
                  </Button>
                </div>
              </div>
            )}
            {step == 1 && (
              <Button className="w-30" onClick={handleNextStep}>
                Next
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
