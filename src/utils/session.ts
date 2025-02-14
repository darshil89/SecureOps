import { getServerSession } from "next-auth/next";
import { authOptions } from "../libs/auth"

export const getSessionForServer = async () => {
  const session = await getServerSession(authOptions);
  return session;
};
