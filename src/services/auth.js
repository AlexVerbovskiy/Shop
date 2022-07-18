import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup
} from "firebase/auth";

export const getCurrentUser = () => {
    const user = getAuth().currentUser;
    return user;
}

export const signOutUser = () => {
    signOut(getAuth());
}



export const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const signInByGoogle = async () => {
    const {
        user
    } = await signInWithPopup(getAuth(), provider);
    return user;
}

export const signUp = async ({
    email,
    password,
    fullName,
    repeatedPassword
}) => {
    if (repeatedPassword !== password)
        throw new Error("Password and repeated password are not equal!");

    const {
        user
    } = await createUserWithEmailAndPassword(
        getAuth(),
        email,
        password
    );

    let photoURL = "";

    const displayName = `${fullName}`;
    await updateProfile(user, {
        displayName,
        photoURL
    });
    //signOutUser();
    return user;
}

export const signIn = async ({
    email,
    password
}) => {
    const {
        user
    } = await signInWithEmailAndPassword(
        getAuth(),
        email,
        password
    );
    return user;
};