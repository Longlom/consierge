import { MainLayout } from "@/components/MainLayout";
import ChatCategory  from "@/pagesComponent/ChatCategory";
import { cookies } from "next/headers";
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
    const fetchData = await fetch(url, {cache: 'no-cache'});
    chatData = await fetchData.json();
  } catch (e) {
    console.log(e)
  }


  console.log('chatData', chatData);

  return (

      <MainLayout>
        <ChatCategory data={chatData || []}/>
      </MainLayout>
  );
}
