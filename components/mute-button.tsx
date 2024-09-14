import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { useAudio } from '@/contexts/AudioContext';

function MuteButton() {
  const { isMuted, toggleAudio } = useAudio();

  return (
    <button
      onClick={toggleAudio}
      className="fixed bottom-4 right-4 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-blue-600 transition-colors duration-200 z-50"
    >
      {isMuted ? <FaVolumeMute size={24} /> : <FaVolumeUp size={24} />}
    </button>
  );
}

export default MuteButton;