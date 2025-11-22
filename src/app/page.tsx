// src/app/page.tsx  (Server Component)
import HomeCanvas from "@/components/HomeCanvas"; // normal import is fine

export default function Page() {
  return <HomeCanvas />; // HomeCanvas is a Client Component
}
