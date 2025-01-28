import { signInWithEmailAndPassword } from "firebase/auth";
import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers";
import { checkingCredentials, login, logout } from "./"
import { clearNotesLogout } from "../journal";

export const checkingAuthentication = (email, password) => {
    return async (dispatch) => {

        dispatch(checkingCredentials());

    }
}

export const startGoogleSignIn = () => {
    return async (dispatch) => {

        dispatch(checkingCredentials());

        const result = await signInWithGoogle()
        if (!result.ok) return dispatch(logout(result.errorMessage));


        dispatch(login(result));
    }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
    return async (dispatch) => {

        dispatch(checkingCredentials());

        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName });

        /* Si la función falló, hago despacho el logout con el errorMessage como payload */
        if (!ok) return dispatch(logout({ errorMessage }));

        /* Si todo sale bien, logueo al usuario */
        dispatch(login({ uid, displayName, email, photoURL }));

    }
}

export const startLoginWithEmailPassword = ({ email, password }) => {

    return async (dispatch) => {

        dispatch(checkingCredentials());

        const result = await loginWithEmailPassword({ email, password });
        console.log(result)

        if (!result.ok) return dispatch(logout(result));
        dispatch(login(result));
    }

}


export const startLogout = () => {
    return async (dispatch) => {

        await logoutFirebase();

        dispatch( clearNotesLogout());
        dispatch( logout() );

    }
}