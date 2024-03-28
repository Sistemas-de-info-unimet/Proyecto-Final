import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import Logo from '../assets/LogoOpenG.png'

const fadeImages = [
  {
    url: 'https://img2.rtve.es/i/?w=1600&i=1621953420612.jpg',
  },
  {
    url: 'https://www.sae.org/binaries/content/gallery/cm/hero/attend/student-events/2019/fsae_mi_2018_v6.jpg/fsae_mi_2018_v6.jpg/cm%3Ahero',
  },
  {
    url: 'https://www.clubesricardopalmachosica.com/wp-content/uploads/2023/02/Importancia-de-una-buena-cancha-de-futbol-1.jpg',
  },
];

export const Slideshow = () => {
  return (
    <div className="slide-container" style={{ position: 'relative', width: '100%' }}>
      <Fade>
        {fadeImages.map((fadeImage, index) => (
          <div key={index} className="each-fade" style={{ position: 'relative' }}>
            <img style={{ width: '100%', minHeight: '400px', maxHeight: '400px', objectFit: 'cover' }} src={fadeImage.url} />
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1 }}></div>
          </div>
        ))}
      </Fade>
      <img src={Logo} alt="Logo" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 2, height: '150px', width: '300px' }} />
    </div>
  )
}