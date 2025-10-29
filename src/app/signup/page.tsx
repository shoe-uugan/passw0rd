"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Stepper } from "@/components/Stepper";
import { Button } from "@/components/ui/button";
import { Toaster } from "sonner";
import { Eye } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [step, setSteps] = useState<number>(1);

  const handleNextStep = () => {
    // if (step == 3) {
    //   return;
    // }
    setSteps(step + 1);
  };

  const handlePrevStep = () => {
    // if (step == 1) {
    //   return;
    // }
    setSteps(step - 1);
  };

  const OnChange = (event: React.ChangeEvent<HTMLInputElement>) => {};
  const handleSubmit = () => {
  
  };

  const [passwordShown, setPasswordShown] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("")

  return (
    <div className="mx-auto w-screen h-screen flex flex-col justify-center items-center">
      <Card className="w-100 bg-stone-300 shadow border border-stone-400">
        <CardHeader>
          <CardTitle>
            <Stepper step={step} />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-1 flex-wrap">
            <Toaster position="top-right" theme="dark" />
            {step == 1 && (
              <div className="flex gap-1 flex-wrap">
                <Input
                  type=""
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="w-50 h-9 border border-black rounded bg-white pl-2"
                />
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
                    className="absolute h-9 right-0.5 top-0.5 hover:h-8"
                    onClick={() => {
                      setPasswordShown(!passwordShown);
                    }}
                  >
                    {" "}
                    <Eye />{" "}
                  </Button>
                </div>
              </div>
            )}
            {step == 2 && (
              <div className="flex gap-1 flex-col">
                <Input
                  placeholder="username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  className="w-50 border h-9 border-black rounded bg-white pl-2"
                />
                <Input
                  placeholder="full name"
                  value={fullname}
                  onChange={(e) => {
                    setFullname(e.target.value);
                  }}
                  className="w-50 border h-9 border-black rounded bg-white pl-2"
                />
              </div>
            )}

            {step != 1 && (
              <Button className="w-30" onClick={handlePrevStep}>
                prev
              </Button>
            )}
            {step != 2 && (
              <Button className="w-30" onClick={handleNextStep}>
                next
              </Button>
            )}
            {step == 2 && (
              <Button className="w-30" onClick={handleSubmit}>
                submit
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
