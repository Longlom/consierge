import { MainLayout } from '@/components/MainLayout';
import { LoginPage } from '@/pages/Login';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function Chat() {

  const cookieStore = cookies()
  const token = cookieStore.get('TOKEN');

  console.log('token - ', token)

  if (token) {
    redirect('/');
  }
    return (
        <MainLayout>
            <LoginPage />
        </MainLayout>
    );
}
