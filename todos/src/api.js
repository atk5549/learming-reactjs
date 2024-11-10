import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

// регистрация/Registration
export async function register(email, password) {
    try {
        const oUC = await createUserWithEmailAndPassword(
            getAuth(),
            email, password
        )
        return oUC.user;
    }
    catch (err) {
        return err.code;
    }
}

// Вход/Login
export async function login(email, password) {
    try {
        const oUC = await signInWithEmailAndPassword(getAuth(), email, password);
        return oUC.user;
    }
    catch (err) {
        return err.code;
    }
}

// Выход/Logout
export async function logout() {
    await signOut(getAuth());
}


