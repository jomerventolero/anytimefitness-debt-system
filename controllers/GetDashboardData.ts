import { pb } from "@/api/auth/pocketbase";

const getDashboardData = async () => {
  const profileID = pb.authStore.model?.id;
  const record = await pb.collection('getDashboardData').getOne(profileID);
  return record
}

export default getDashboardData