import pocketbase from "pocketbase";

const pb = new pocketbase(process.env.POCKETBASE_URL || "http://ec2-3-107-74-111.ap-southeast-2.compute.amazonaws.com:8080/");

type UserDataType = {
    username: string
    firstName: string
    lastName: string
    email: string
    password: string
    passwordConfirm: string
}

type UserLoginType = {
    email: string
    password: string
}

type UserRecordData = {
    token: string
    record: {
      id: string
      collectionId: string
      collectionName: string
      username: string
      verified: boolean
      emailVisibility: boolean
      email: string
      created: string
      updated: string
      firstName: string
      avatar: string
      isAdmin: boolean
      lastName: string
    }
}

type profileUpdateDataType = {
    first_name: string
    last_name: string
    username: string
}

/**
 * Asynchronously creates a new user in the "users" collection of the pocketbase database.
 *
 * @param {UserDataType} UserData - An object containing the user's username, first name, last name, email, and password.
 * @return {Promise<any>} A promise that resolves to the newly created user record, or rejects with an error if the creation fails.
**/
async function createUser(UserData: UserDataType) {
    try { 
        const record = await pb.collection("users").create({
            username: UserData.username,
            firstName: UserData.firstName,
            lastName: UserData.lastName,
            email: UserData.email,
            password: UserData.password,
            passwordConfirm: UserData.passwordConfirm,
        });
        return record;
    } catch (error) {
        console.log(error);
    }
}

/**
 * Asynchronously logs in a user with their email and password.
 *
 * @param {UserLoginType} UserData - An object containing the user's email and password.
 * @return {Promise<RecordModel>} A promise that resolves to the authenticated user record.
**/
async function loginEmail(UserData: UserLoginType) {
    try {
        const record = await pb.collection("users").authWithPassword(UserData.email, UserData.password) satisfies UserRecordData;
        
        // Save the user record to local storage
        localStorage.setItem('userRecord', JSON.stringify(record));

        // When you need to retrieve the user record from local storage, you can use the getItem method:
        // const userRecord = JSON.parse(localStorage.getItem('userRecord'));

        return record;
    } catch (error) {
        console.log(error);
    }
}


/**
 * Asynchronously gets the avatar of the authenticated user.
 *
 * @return {Promise<string>} A promise that resolves to the URL of the user's avatar, or rejects with an error if the retrieval fails.
 * @throws {Error} If the user is not authenticated or if the avatar is not found.
 */
async function getAvatar() {
    try {
        const userRecordId = pb.authStore.model?.id;
        if (!userRecordId) {
            throw new Error("User is not authenticated.");
        }

        console.log("User ID: ", userRecordId);

        const record = await pb.collection("users").getOne(userRecordId, { expand: "avatar" });

        // Debugging: Inspect the returned record
        console.log("Record:", record);
        console.log("Expanded Avatar Field:", record.avatar);

        if (record && record.avatar && record.avatar) {
            const avatarFile = record
            const avatarURL = pb.getFileUrl(avatarFile, avatarFile.avatar);
            return avatarURL;
        } else {
            throw new Error("Avatar not found for the user.");
        }
    } catch (error) {
        console.error("Error fetching avatar:", error);
    }
}


/**
 * Clears the authentication store, effectively logging out the user.
 *
 * @return {Promise<void>} A promise that resolves when the authentication store has been cleared.
 */
async function logout() {
  await pb.authStore.clear()
}

/**
 * Asynchronously updates the profile of the authenticated user.
 *
 * @param {profileUpdateDataType} props - An object containing the updated profile information.
 * @return {Promise<void>} A promise that resolves when the profile has been updated.
 */
async function updateProfile(props: profileUpdateDataType) {
  try {
    const record = await pb.collection('users').update(pb.authStore.model?.id, {
        firstName: props.first_name,
        lastName: props.last_name,
        username: props.username
      }) 
    return record
  } catch (error) {
    console.log(error);
  }
}


export { createUser, loginEmail, getAvatar, logout, pb, updateProfile };