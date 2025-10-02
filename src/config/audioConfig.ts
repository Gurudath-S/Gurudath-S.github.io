// Audio configuration for the portfolio website
export const audioConfig = {
  backgroundMusic: {
    // Replace this URL with your custom audio file
    url: '/audio/background-music.mp3',
    
    // Alternative URLs you can use (uncomment one):
    // url: 'https://your-audio-hosting-service.com/your-audio-file.mp3',
    // url: '/audio/ambient-music.mp3',
    // url: '/audio/lo-fi-beats.mp3',
    
    volume: 0.3, // 0.0 to 1.0
    loop: true,
  },
  
  clickSound: {
    // Future use for custom click sounds
    url: '/audio/click-sound.mp3',
    volume: 0.5,
  },
  
  // Responsive settings
  responsive: {
    disableOnMobile: true, // Audio will be disabled on screens < 768px
    enableOnTablet: true,  // Keep audio on tablet devices
  }
};

// You can import this config in your components like:
// import { audioConfig } from '@/config/audioConfig';
// const { isPlaying } = useBackgroundMusic(audioConfig.backgroundMusic);