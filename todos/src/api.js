import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getDatabase, ref, push, set, get, query} from 'firebase/database';

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


// Добавление дела в firebase базу
export async function add(user, deed) {
    const oRef = await push(
        ref(getDatabase(), `users/${user.uid}/todos`)
    );

    await set(oRef, deed);
    const oSnapshot = await get(query(oRef));

    const oDeed = oSnapshot.val();
    oDeed.key = oRef.key;

    console.log("Ссылка oRef: " +  oRef);
    console.log("uid текущего пользователя: " +  user.uid);
    console.log("oSnapshot: " +  JSON.stringify(oSnapshot));
    console.log("oDeed: " +  JSON.stringify(oDeed));


    return oDeed;
}





