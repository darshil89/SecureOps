import { Gender } from "@prisma/client";

export type Registration = {
    age : number;
    gender : Gender;
    phone  : string;
    address : string;
    adhar : string;
}