function Card({ icon, title, text }) {
    return (
      <div className="card" style={{
        margin: '10px',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        maxWidth: '300px',
        backgroundColor: "#F0F0F0",
        position: 'relative',
      }}>
        <img src={icon} alt={title} style={{ width: '60px', height: '60px' }} />
        <h2 style={{ marginTop: '20px', color: '#ff7f00' }}>{title}</h2>
        <p style={{ textAlign: 'center', lineHeight: '1.6' }}>{text}</p> 
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '5px',
          backgroundColor: '#ff7f00',
        }}></div>
      </div>
    );
  }
  
  export default Card;
  
