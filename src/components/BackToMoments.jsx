import { momentUrl } from '../editionSchedule';
import './BackToMoments.css';

// Enlace flotante para volver a la página principal desde un momento revivido
export default function BackToMoments() {
  return (
    <a className="back-to-moments" href={`${momentUrl('principal')}#momentos`}>
      <span aria-hidden="true">←</span> Momentos
    </a>
  );
}
