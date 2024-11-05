import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import styles from '../styles/planos.module.css';

function Planos() {
  const [planoSelecionado, setPlanoSelecionado] = useState<string | null>(null);

  const abrirPlano = (nomePlano: string) => {
    setPlanoSelecionado(nomePlano);
  };

  const fecharPlano = () => {
    setPlanoSelecionado(null);
  };

  const detalhesPlano = {
    "Seguro Auto Premium": {
      descricao: "Opção com cobertura básica e adicional, incluindo assistência 24 horas. Proteção total com benefícios exclusivos para o seu veículo.",
      descricaoExtra: "Além da proteção e cuidado que você já conhece, com o Seguro Auto da Porto, você também conta com cobertura para cabos de carregamento de veículos híbridos e elétricos, pontos de recarga gratuita nos Centros Automotivos, assistência e rede de oficinas especializadas.",
      imagem: "/image.png",
    },
    "Seguro Auto Jovem": {
      descricao: "Seguro completo para jovens entre 18 e 24 anos com cobertura total e parcial. Ideal para motoristas que estão começando sua jornada.",
      descricaoExtra: "O Porto Seguro Auto Jovem é uma proteção completa e personalizada para motoristas entre 18 e 24 anos, cobrindo danos ao veículo causados por incêndio, roubo, furto e acidentes, além de garantir cobertura para o condutor, passageiros e terceiros em caso de danos corporais ou materiais. Benefícios adicionais, como carro reserva por até 30 dias, reembolso de despesas emergenciais, cobertura para vidros e até higienização em caso de enchentes, são opções que agregam conveniência sem afetar o bônus do segurado.",
      imagem: "/image2.png",
    },
    "Seguro Auto Sênior": {
      descricao: "Ideal para pessoas acima de 60 anos, com proteção total e danos a terceiros. Segurança e tranquilidade na melhor idade.",
      descricaoExtra: "O Seguro Auto Sênior da Porto Seguro é uma solução especialmente projetada para motoristas acima de 60 anos, oferecendo proteção abrangente que cobre danos ao veículo em casos de colisão, roubo, furto e incêndio, além de incluir cobertura para danos causados a terceiros, com assistência personalizada para situações de emergência. O plano oferece uma série de vantagens adicionais, como reboque, assistência 24 horas e cobertura para vidros, faróis e retrovisores, promovendo segurança e tranquilidade nas estradas.",
      imagem: "/image3.png",
    },
  };

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <section className={`${styles.hero} ${styles.backgroundImage}`}>
          <div className={styles.overlay}></div>
          <div className={styles.textContent}>
            <img src="/portoseguro.png" alt="Porto Seguro" className={styles.logo} />
            <h1 className={styles.mensagemBoasVindas}>Bem-vindo à Porto Seguro</h1>
            <p className={styles.subtitulo}>
              Experimente nossos serviços exclusivos para sua segurança e conforto.
            </p>
          </div>
        </section>

        <section className={styles.servicos}>
          <h2 className={styles.tituloSecao}>Seguro de Carros</h2>
          <div className={styles.cartoes}>
            {Object.keys(detalhesPlano).map((plano) => (
              <div key={plano} className={styles.cartao}>
                <img src={detalhesPlano[plano as keyof typeof detalhesPlano].imagem} alt={plano} className={styles.imagemServico} />
                <h3>{plano}</h3>
                <p>{detalhesPlano[plano as keyof typeof detalhesPlano].descricao}</p>
                <button className={styles.botao} onClick={() => abrirPlano(plano)}>
                  Conheça e contrate
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      {planoSelecionado && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>{planoSelecionado}</h3>
            <p>{detalhesPlano[planoSelecionado as keyof typeof detalhesPlano].descricao}</p>
            <p className={styles.extraDescription}>
              {detalhesPlano[planoSelecionado as keyof typeof detalhesPlano].descricaoExtra}
            </p>
            <button className={styles.botaoContratar}>Contratar</button>
            <button className={styles.botaoFechar} onClick={fecharPlano}>
              Fechar
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Planos;
