import PocketBase from "pocketbase";

export const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL || "http://ec2-3-107-74-111.ap-southeast-2.compute.amazonaws.com:8080/")

