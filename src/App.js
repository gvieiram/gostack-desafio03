import React, { useEffect, useState } from "react";
import api from "./services/api";
import "./styles.css";


function App() {
  const [repository, setRepository] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepository(response.data);
    });
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Desafio ReactJS ${Date.now()}`,
      url: 'https://github.com/gustavo-gvm/gostack-desafios-conceitos-reactjs.git',
      techs: ["Node.js", "ReactJS"]
    })

    const newRepository = response.data;

    setRepository([...repository, newRepository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepository(repository.filter(
      repo => repo.id !== id
    ))
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {repository.map(repo => 
            <li key={repo.id}>
              {repo.title}
              
              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
          )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
