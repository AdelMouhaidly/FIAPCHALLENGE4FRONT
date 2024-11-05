import React from 'react';
import Header from './components/Header';
import styles from '../styles/integrantes.module.css';

interface Integrante {
  id: number;
  nome: string;
  rm: string;
  imagem: string;
}

const integrantesData: Integrante[] = [
  {
    id: 1,
    nome: 'Adel Mouhaidly',
    rm: 'RM557705',
    imagem: '/Adel.png',
  },
  {
    id: 2,
    nome: 'Matheus Munuera Ueti',
    rm: 'RM557812',
    imagem: '/Mateus.png',
  },
  {
    id: 3,
    nome: 'Renan Olivi De Moura',
    rm: 'RM557680',
    imagem: '/Renan.png',
  },
];

function Integrantes() {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.title}>Integrantes do Grupo</h1>
        <div className={styles.integrantesList}>
          {integrantesData.map((integrante) => (
            <div key={integrante.id} className={styles.integranteCard}>
              <img src={integrante.imagem} alt={integrante.nome} className={styles.image} />
              <h2>{integrante.nome}</h2>
              <p className={styles.rm}>RM: {integrante.rm}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Integrantes;
