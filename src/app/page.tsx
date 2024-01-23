import { ChatCategory } from "@/components/ChatCategory";
import { MainLayout } from "@/components/MainLayout";
import axios from "axios";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {

  const cookieStore = cookies()
  const token = cookieStore.get('TOKEN');


  if (!token) {
    redirect('/login');
  }

  const url = `${headers().get("Referer")}/api/chat`;

  const chatData = await axios.get(url);

  return (

      <MainLayout>
        <ChatCategory data={chatData.data}/>
      </MainLayout>
  );
}
