import { NextRequest, NextResponse } from "next/server";
import { classes } from "@/lib/data";
import { nanoid } from "nanoid"

export const GET = async () =>{
    const allclasses = classes

    return NextResponse.json(allclasses)
};

export const POST = async (req: NextRequest) => {
    try{
        const requestData = await req.json()

        const newClass = {
            name: requestData.name,
            id: nanoid(),
        };

        classes?.push(newClass)

        return NextResponse.json({ status: 202, data: newClass});
    } catch (error){
        console.log(error)
        return NextResponse.json({ status: 500, message: `Error ${error}`});
    }
};


export const DELETE = async (req: NextRequest) => {
  try {
    const requestData = await req.json();

    const deleteClass = {
      id: requestData.id
    };

    

    return NextResponse.json({ status: 202, data: deleteClass });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, message: `Error ${error}` });
  }
};
