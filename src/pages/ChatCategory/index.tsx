'use client'

import { useEffect, useState } from 'react'
import { ConsiergeInput } from '@/components/ConsiergeInput'
import { ConsiergeButton } from '@/components/ConsiergeButton'

import style from './style.module.css'
import { IAuthSuccesfullResponse } from '@/app/api/auth/route'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'


export const ChatPage: React.FC = () => {


    return <div>
        <h1 className={style.title}>Авторизация</h1>

    </div>
}

