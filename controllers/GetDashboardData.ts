import { pb } from "@/api/auth/pocketbase";

const getDashboardData = async () => {
  pb.autoCancellation(false);
  try {
    const profileID = pb.authStore.model?.id;
    const record = await pb.collection('getAdminProfileData').getOne(profileID);
    const gym_id = record?.gym_branch
    const gym = await pb.collection('branch').getOne(gym_id)
    console.log(gym.name)
    return { record, gym }
  } catch (error) {
    console.log(error)
  }
}

export default getDashboardData