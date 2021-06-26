import '../styles/home.scss';
import { useState, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button } from '../components';
import { illustrationSVG, logoSVG } from "../assets/images";
import { useAuth } from '../hooks';
import { database } from '../services';

export function NewRoom() {
  const { user } = useAuth();
  const history = useHistory();
  const [newRoom, setNewRoom] = useState<string>('');

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === '') return;

    const roomRef = database.ref('rooms');
    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id, 
    })

    history.push(`/rooms/${firebaseRoom.key}`)
  }

  return (
    <div className="home">
      <aside className="home__aside">
        <img className="home__aside-image" src={illustrationSVG} alt="Ilustração simbolizando perguntas e respostas" />
        <strong className="home__aside-title">Crie salas de Q&amp;A ao-vivo.</strong>
        <p className="home__aside-description">Tire as dúvidas da sua audiência em tempo-real.</p>
      </aside>

      <main className="home__main">
        <div className="home__main-content">
          <img className="home__main-image" src={logoSVG} alt="Letmeask" />
          <h2 className="home__main-title">Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom } className="home__main-form">
            <input
              type="text"
              className="home__main-input"
              placeholder="Nome da sala"
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button className="home__main-button" type="submit">Criar sala</Button>
          </form>
          <p className="home__main-signup">Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link></p>
        </div>
      </main>
    </div>
  );
};