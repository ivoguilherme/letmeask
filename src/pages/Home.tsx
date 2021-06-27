import '../styles/home.scss';
import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '../components';
import { illustrationSVG, logoSVG, googleIconSVG } from "../assets/images";
import { useAuth } from '../hooks';
import { database } from '../services';

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState<string>('');

  async function handleCreateRoom() {
    if (!user) {
     await signInWithGoogle();
    }

    history.push('/rooms/new')
  };

  async function handleJoinRoom(event: FormEvent) {
     event.preventDefault();

     if (roomCode.trim() === '') return;

     const roomRef = await database.ref(`rooms/${roomCode }`).get();

     if (!roomRef.exists()) {
        alert('Room does not exists.');
        return;
     };

     if (roomRef.val().endedAt) {
       alert('Room already closed.');
       return;
     }

     history.push(`rooms/${roomCode}`);
  };

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
          <button
            onClick={handleCreateRoom}
            className="home__main-google"
          >
            <img className="home__main-google-icon" src={googleIconSVG} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="home__main-separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom} className="home__main-form">
            <input
              type="text"
              className="home__main-input"
              placeholder="Digite o código da sala"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button className="home__main-button" type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
};