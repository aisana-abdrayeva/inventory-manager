import { useState } from "react";
import { AuthForm } from "./AuthForm";
import { Admin } from "./Admin";

const Home = () => {
  const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null);

  const handleLogin = (userData: { id: string; name: string; email: string }) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <AuthForm onLogin={handleLogin} />;
  }

  return <Admin currentUser={user} onLogout={handleLogout} />;
};

export default Home;
