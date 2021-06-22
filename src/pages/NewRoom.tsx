import '../styles/home.scss';
import { Link } from 'react-router-dom';
import { Button } from '../components';
import { illustrationSVG, logoSVG } from "../assets/images";
import { useAuth } from '../hooks';

export function NewRoom() {
  const { user } = useAuth();

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
          <h1>{user?.name}</h1>
          <h2 className="home__main-title">Criar uma nova sala</h2>
          <form className="home__main-form">
            <input
              type="text"
              className="home__main-input"
              placeholder="Nome da sala"
            />
            <Button className="button home__main-button">Criar sala</Button>
          </form>
          <p className="home__main-signup">Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link></p>
        </div>
      </main>
    </div>
  );
};