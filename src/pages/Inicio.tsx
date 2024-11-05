import Header from './components/Header';
import Footer from './components/Footer'; 
import styles from '../styles/inicio.module.css';

function Inicio() {
  return (
    <div className={styles.fundo}>
      <Header />
      <main className={styles.container}>
        <section className={`${styles.hero} ${styles.backgroundImage}`}>
          <div className={styles.overlay}></div>
          <div className={styles.textContent}>
            <h1 className={styles.mensagemBoasVindas}>
              Uma Porto Seguro cada vez mais inovadora
            </h1>
            <p className={styles.subtitulo}>
              Conheça as melhores soluções tecnológicas para segurança e inovação no transporte.
            </p>
            <button className={styles.botaoHero}>Saiba Mais</button>
          </div>
        </section>

        <section className={styles.servicos}>
          <h2 className={styles.tituloSecao}>Nossos Serviços</h2>
          <div className={styles.cartoes}>
            <div className={styles.cartao}>
              <img src="/imagemdeplanos.jpg" alt="Planos Personalizados" className={styles.imagemCard} />
              <h3>Planos Personalizados</h3>
              <p>Escolha o plano que se adapta às suas necessidades e aproveite os melhores benefícios.</p>
            </div>
            <div className={styles.cartao}>
              <img src="/Guincho.png" alt="Guincho 24 Horas" className={styles.imagemCard} />
              <h3>Guincho 24 Horas</h3>
              <p>Suporte imediato em qualquer situação de emergência na estrada.</p>
            </div>
            <div className={styles.cartao}>
              <img src="/revisao.jpeg" alt="Revisão Completa" className={styles.imagemCard} />
              <h3>Revisão Completa</h3>
              <p>Faça uma revisão completa no seu veículo com nossos especialistas.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Inicio;
