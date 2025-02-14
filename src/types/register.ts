import { Gender } from "@prisma/client";

export type Registration = {
    age : string;
    gender : Gender;
    phone  : string;
    address : string;
    adhar : string;
}