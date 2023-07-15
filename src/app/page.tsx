import Login from "@/components/Login";
import Profile from "@/components/Profile";

export default function Home() {
  return (
    <main>
      <h1>GamingStore</h1>
      <div>
        <Profile />
        <Login />
      </div>
    </main>
  );
}
