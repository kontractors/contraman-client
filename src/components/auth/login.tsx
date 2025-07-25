// This is the login form component for the application. Only email and password are required for login.
// Does a json POST request to the /auth/login endpoint.

import {useTranslation} from "react-i18next";

export default function LoginForm() {
    const {t} = useTranslation('translation');

    return (
        <form method="post" action="/auth/login">
            <div>
                <label htmlFor="email">{t('login.email')}</label>
                <input type="email" name="email" id="email" required/>
            </div>
            <div>
                <label htmlFor="password">{t('login.password')}</label>
                <input type="password" name="password" id="password" required/>
            </div>
            <button type="submit">{t('login.submit')}</button>
        </form>
    );
}