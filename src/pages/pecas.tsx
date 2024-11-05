import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import styles from '../styles/pecas.module.css';

interface Peca {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
}

const dadosPecas = [
  { id: 1, nome: 'Câmbio Automático BMW 320i 2.0 2020', imagem: '/img1.png' },
  { id: 2, nome: 'Câmbio Automático BMW 320i 2.0 2017', imagem: '/img2.png' },
  { id: 3, nome: 'Câmbio Automático BMW 320i 2.0 2018', imagem: '/img3.png' },
  { id: 4, nome: 'Câmbio Automático BMW X1 2.0 2017', imagem: '/img4.png' },
];

function Pecas() {
  const [itensCarrinho, setItensCarrinho] = useState<Peca[]>([]);
  const [carrinhoVisivel, setCarrinhoVisivel] = useState(false);
  const [pecas, setPecas] = useState<Peca[]>([]);

  useEffect(() => {
    const pecasComPrecos = dadosPecas.map((peca) => ({
      ...peca,
      preco: Math.random() * 1000 + 100,
    }));
    setPecas(pecasComPrecos);
  }, []);

  const adicionarAoCarrinho = (peca: Peca) => {
    setItensCarrinho((prev) => [...prev, peca]);
  };

  const alternarVisibilidadeCarrinho = () => {
    setCarrinhoVisivel((prev) => !prev);
  };

  const finalizarCompra = () => {
    alert('Compra finalizada!');
    setItensCarrinho([]);
    setCarrinhoVisivel(false);
  };

  const total = itensCarrinho.reduce((soma, item) => soma + item.preco, 0);

  return (
    <>
      <Header />
      <div className={styles.container}>
        <main className={styles.mainContent}>
          <h1>Peças de Reposição</h1>
          <div className={styles.productList}>
            {pecas.map((peca) => (
              <div key={peca.id} className={styles.product}>
                <img src={peca.imagem} alt={peca.nome} className={styles.productImage} />
                <p>{peca.nome}</p>
                <p>R$ {peca.preco.toFixed(2)}</p>
                <button className={styles.button} onClick={() => adicionarAoCarrinho(peca)}>
                  Adicionar ao Carrinho
                </button>
              </div>
            ))}
          </div>
          <button className={styles.cartButton} onClick={alternarVisibilidadeCarrinho}>
            🛒 {itensCarrinho.length}
          </button>
          {carrinhoVisivel && (
            <div className={styles.cartModal}>
              <h2>Carrinho</h2>
              {itensCarrinho.length === 0 ? (
                <p>O carrinho está vazio.</p>
              ) : (
                <>
                  <ul className={styles.cartItemsList}>
                    {itensCarrinho.map((item, index) => (
                      <li key={index} className={styles.cartItem}>
                        {item.nome} - R$ {item.preco.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                  <div className={styles.cartTotal}>
                    <p>Total: R$ {total.toFixed(2)}</p>
                    <button className={styles.button} onClick={finalizarCompra}>
                      Finalizar Compra
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default Pecas;
