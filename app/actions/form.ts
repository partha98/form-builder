"use server";

import prisma from "@/lib/prisma";
import { formSchema, formSchemaType } from "@/schemas/form";
import { currentUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import { error } from "console";

class UserNotFoundErr extends Error{}

interface FormStats {
    visits: number;
    submissions: number;
    submissionRate: number;
    bounceRate: number;
}

export async function GetFormStats(): Promise<FormStats> {
    
    const userOrNull: User | null = await currentUser();
    if(userOrNull == null){
        throw new UserNotFoundErr()
    }

    
    const stats = await prisma.form.aggregate({
        where: {
            userId: userOrNull.id,
        },
        _sum: {
            visits: true,
            submissions: true
        }
    })

    const visits = stats._sum.visits || 0;
    const submissions = stats._sum.submissions || 0;

    let submissionRate = 0;
    if(visits!=0){
        submissionRate = (submissions/visits) * 100;
    }
    let bounceRate = 100 - submissionRate;
    
    return { visits,submissions,submissionRate,bounceRate }

}

export async function CreateForm(data: formSchemaType) {
    const validation = formSchema.safeParse(data);
    if(!validation){
        throw new Error("Form not valid");
    }

    const user = await currentUser();
    if(!user){
        throw new UserNotFoundErr();
    }

    const form = await prisma.form.create({
        data:{
            userId: user.id,
            name: data.name,
            description: data.description,
        }
    });
    
    if(!form){
        throw new Error("Something went wrong");
    }

    return form.id;
}
