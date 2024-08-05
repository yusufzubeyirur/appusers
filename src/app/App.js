import React, { useState } from "react";
import "./styles/App.css";

export default function App() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://api.github.com/search/users?q=${query}`
      );
      if (response.ok) {
        const data = await response.json();
        setUsers(data.items);
      } else {
        setUsers([]); // Kullanıcı bulunamazsa boş array döndür
      }
    } catch (error) {
      setUsers([]); // Hata durumunda da boş array döndür
    }
  };

  return (
    <div className="container">
      <h1>Project 5:GitHub Kullanıcı Arama</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="input"
      />
      <button onClick={handleSearch} className="button">
        Ara
      </button>
      <h2>Results</h2>
      <div className="results">
        {users.map((user) => (
          <div key={user.id} className="userCard">
            <img src={user.avatar_url} alt={user.login} className="avatar" />
            <div className="userInfo">
              <h2>{user.login}</h2>
              <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                Profile Git
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
