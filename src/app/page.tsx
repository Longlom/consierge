import { MainLayout } from "@/components/MainLayout";
import { ChatCategory } from "@/pages/ChatCategory";
import axios from "axios";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {

  const cookieStore = cookies()
  const token = cookieStore.get('TOKEN');


  if (!token) {
    redirect('/login');
  }

  const url = `${process.env.NEXT_PUBLIC_URL}/api/chat/category`;

  let chatData;
  try {
    chatData = await axios.get(url);
  } catch (e) {
    console.log(e)
  }


  return (

      <MainLayout>
        <ChatCategory data={chatData?.data || []}/>
      </MainLayout>
  );
}
