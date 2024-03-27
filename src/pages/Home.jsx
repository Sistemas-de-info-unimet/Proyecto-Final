import Header from "../components/Header";
import { Slideshow } from "../components/banner";
import Card from "../components/Card";
import SearchBar from "../components/SearchBar";
import "./Home.css";
import GroupCards from "../components/GroupCards";

export default function Home() {
    return (
            <div className="Contenedor">
                <Header/>
                <Slideshow/>
                <div style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column', 
            }}>
                <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '350px', 
                    borderBottomLeftRadius: '100%',
                    borderBottomRightRadius: '100%',
                    backgroundColor: '#ff7f00',
                    top: '-100px',
                    zIndex: 0,
                }}></div>
                <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', marginTop: '20px', marginBottom: '20px' }}>
                <Card 
                    icon="https://cdn-icons-png.flaticon.com/128/9254/9254638.png"
                    title="Misión"
                    text="Brindar al estudiante de la Universidad Metropolitana la oportunidad de conocer las diferentes agrupaciones con las que cuenta la UNIMET, al igual que proveer un sistema sencillo de afiliación a las mismas."
                />
                <Card 
                    icon="https://cdn-icons-png.flaticon.com/128/4055/4055993.png"
                    title="Visión"
                    text="Ser el canal de información digital entre los estudiantes y las agrupaciones que ofrece la Universidad Metropolitana."
                />
                <Card 
                    icon="https://cdn-icons-png.flaticon.com/128/9254/9254658.png"
                    title="Objetivos"
                    text="Fomentar el conocimiento de las agrupaciones estudiantiles de la Universidad Metropolitana y facilitar la afiliación de los estudiantes a dichos grupos mediante una aplicación web."
                />
            </div>
            </div>
            <section>
                <SearchBar /> 
                <h1 className="titulo">Agrupaciones Estudiantiles</h1>
                <GroupCards/>
            </section>
            </div>
    );

}