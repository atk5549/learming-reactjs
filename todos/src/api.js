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


// метод ref() - возвращает обьект ссылки
// метод val() - возвращает документ в виде простого обьекта
// Добавление дела в firebase базу
export async function add(user, deed) {

    // создадим ссылку по которой запишем документ с новым делом текущего юзера
    const oRef = await push(ref(getDatabase(), `users/${user.uid}/todos`));

    // запишем дело deed текущего юзера
    await set(oRef, deed);

    // получим записанный дело по ссылке
    const oSnapshot = await get(query(oRef));

    // получим дело (внимание/ key присваивается внутри базы автоматически и при)
    const oDeed = oSnapshot.val();

    // добавляем в oDeed.key ключ дела из базы
    oDeed.key = oRef.key;

    console.log("Ссылка oRef: " +  oRef);
    console.log("Ссылка oRef.key: " +  oRef.key);
    console.log("uid текущего пользователя: " +  user.uid);
    console.log("oSnapshot: " +  JSON.stringify(oSnapshot));
    console.log("oDeed: " +  JSON.stringify(oDeed));

    return oDeed;
}

export async function getList(user){

    const dbCurrentUser = await ref(getDatabase(), `users/${user.uid}/todos`);

    // получим записанный дело по ссылке
    const oSnapshot = await get(query(dbCurrentUser));
    const oArr = [];
    let oDeed;

    oSnapshot.forEach((oDoc) => {
        oDeed = oDoc.val();
        oDeed.key = oDoc.key;
        oArr.push(oDeed);
    });
    return oArr;

}


// помечаем дело как выполненное
export function setDone(user, key){
    const setRef = ref(getDatabase(), `users/${user.uid}/todos/${key}/done`, true);

    // отмечаем дело как выполненное по ссылке
    return set(setRef);

}



