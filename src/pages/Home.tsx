import '../styles/home.scss';
import { useHistory } from 'react-router-dom';
import { Button } from '../components';
import { illustrationSVG, logoSVG, googleIconSVG } from "../assets/images";
import { useAuth } from '../hooks';

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();

  async function handleCreateRoom() {
    if (!user) {
     await signInWithGoogle();
    }

    history.push('/rooms/new')
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
          <form className="home__main-form">
            <input
              type="text"
              className="home__main-input"
              placeholder="Digite o código da sala"
            />
            <Button className="button home__main-button">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
};