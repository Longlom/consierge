import { MainLayout } from '@/components/MainLayout';
import { Chat, IChatProps } from '@/pages/Chat';
import axios from 'axios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function ChatConversation() {

  const cookieStore = cookies()
  const token = cookieStore.get('TOKEN');

  if (!token) {
    redirect('/login');
  }


  const url = `${process.env.NEXT_PUBLIC_URL}/api/chat/messages`;

  let messagesData;

  try {
    messagesData = await axios.get(url);
  } catch (e) {
    console.log(e)
  }
  console.log('messagesData?.data - ', messagesData?.data)

    return (
        <MainLayout withoutTopPadding>
          <Chat messages={messagesData?.data || []}/>
        </MainLayout>
    );
}
