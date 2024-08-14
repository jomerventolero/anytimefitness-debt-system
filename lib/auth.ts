import pb from "../lib/pocketbase"

async function logout() {
  await pb.authStore.clear()
} 

export default { logout } 