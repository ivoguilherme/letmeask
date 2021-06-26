import '../styles/room-code.scss';
import { copySVG } from "../assets/images";

type RoomCodeProps = {
  code: string;
}

export function RoomCode(props: RoomCodeProps) {
  function copyRoomCodeToClipboard() { 
    navigator.clipboard.writeText(props.code); 
  }

  return (
    <button className="room-code" onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copySVG} alt="Copy room code" />
      </div>
      <span>Sala #{props.code}</span>
    </button>
  )
}