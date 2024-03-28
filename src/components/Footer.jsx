import Logo from '../assets/LogoOpenG.png';

function Footer() {
  return (
    <footer style={{ backgroundColor: '#ff7f00', padding: '20px 0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfUjUIUOUr2zEwuhLh4Q_qziqXtIHwEyyMEwRXsK34aQ&s" alt="Logo 1" style={{ marginRight: '30px', maxHeight: "100px", maxWidth: '100px'}} />
      <img src={Logo} alt="Logo 2" style={{ maxHeight: "120px", maxWidth: "120px"}}/>
    </footer>
  );
}

export default Footer;
