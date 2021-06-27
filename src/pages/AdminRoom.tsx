import '../styles/room.scss';
import { useHistory, useParams } from 'react-router-dom';
import { logoSVG } from '../assets/images';
import { Button, Question } from '../components';
import { RoomCode } from '../components';
import { useRoom } from '../hooks';
import { deleteSVG, checkSVG, answerSVG } from '../assets/images'
import { database } from '../services';

type RoomParams = {
  id: string,
}

export function AdminRoom() {
  // const { user } = useAuth();
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { questions, title } = useRoom(roomId);

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza que deseja excluir esta pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    history.push('/');
  };

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoSVG} alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button onClick={handleEndRoom} isOutlined>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>{title}</h1>
          {questions.length > 0 ? (
            <span>{questions.length} {questions.length > 1 ? 'perguntas' : 'pergunta'}</span>
          ) : (
            <span>Sem perguntas</span>
          )}
        </div>

        <div className="question-list">
          {questions.map(question => (
            <Question
              key={question.id}
              content={question.content}
              author={question.author}
              isAnswered={question.isAnswered}
              isHighlighted={question.isHighlighted}
            >
              {!question.isAnswered && (
                <>
                  <button
                    type="button"
                    onClick={() => handleCheckQuestionAsAnswered(question.id)}
                  >
                    <img src={checkSVG} alt="Marcar pergunta como respondida" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleHighlightQuestion(question.id)}
                  >
                    <img src={answerSVG} alt="Dar destaque à pergunta" />
                  </button>
                </>
              )}

              <button
                type="button"
                onClick={() => handleDeleteQuestion(question.id)}
              >
                <img src={deleteSVG} alt="Remover pergunta" />
              </button>
            </Question>
          ))}
        </div>
      </main>
    </div>
  );
}