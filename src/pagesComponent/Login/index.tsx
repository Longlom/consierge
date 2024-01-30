'use client'

import { useState } from 'react'
import { ConsiergeInput } from '@/components/ConsiergeInput'
import { ConsiergeButton } from '@/components/ConsiergeButton'

import style from './style.module.css'
import { useRouter } from 'next/navigation'

export const TOKEN = 'TOKEN';

const  LoginPage: React.FC = () => {
    const { push } = useRouter()

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [city, setCity] = useState('');
    const [error, setError] = useState<null | string>(null);

    async function authenticate(formData: FormData) {

        try {
            const url = new URL(document.URL);
            url.pathname = 'api/auth';
            url.searchParams.append('login', formData.get('login')?.toString() || '');
            url.searchParams.append('password', formData.get('password')?.toString() || '');
            url.searchParams.append('city', formData.get('city')?.toString() || '');
            localStorage.setItem('CITY', formData.get('city')?.toString() || '')
            console.log(url)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const authRequest = await fetch(url);
            // const authData: IAuthSuccesfullResponse = await authRequest.json();

            push('/');
        } catch (error) {
            console.log(error)
            setError('Неверный пароль или логин')
        }
    }

    return <div className={style.container}>
        <h1 className={style.title}>Авторизация</h1>

        <form action={authenticate} >
            <div className={style.inputContainer}>
                <div className={style.inputHeader}>Логин</div>
                <ConsiergeInput name='login' value={login} onChange={(e) => setLogin(e.target.value)} />
            </div>

            <div className={style.inputContainer}>
                <div className={style.inputHeader}>Пароль</div>
                <ConsiergeInput type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>


            <div className={style.inputContainer}>
                <div className={style.inputHeader}>Город</div>
                <ConsiergeInput name='city' value={city} onChange={(e) => setCity(e.target.value)} />
            </div>

            <ConsiergeButton buttonType='long' className={style.button} text='Авторизация' disabled={!password || !login || !city} />
        </form>

        {error && <div className={style.errorMessage}>{error}</div>}
    </div>
}


export default LoginPage;