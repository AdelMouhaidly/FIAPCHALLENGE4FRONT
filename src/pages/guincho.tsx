import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import styles from '../styles/guincho.module.css';

function Guincho() {
  const [cep, setCep] = useState('');
  const [exibirInfo, setExibirInfo] = useState(false);
  const [endereco, setEndereco] = useState({
    logradouro: '',
    bairro: '',
    cidade: '',
    estado: ''
  });
  const [temporizador, setTemporizador] = useState(300);
  const [botaoDesabilitado, setBotaoDesabilitado] = useState(false);

  useEffect(() => {
    let contagemRegressiva: NodeJS.Timeout;
    if (exibirInfo && temporizador > 0) {
      contagemRegressiva = setInterval(() => setTemporizador((prev) => prev - 1), 1000);
    } else if (temporizador === 0) {
      setBotaoDesabilitado(true);
    }
    return () => clearInterval(contagemRegressiva);
  }, [exibirInfo, temporizador]);

  const alterarCep = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCep(e.target.value);
  };

  const solicitarGuincho = async () => {
    if (cep) {
      const confirmacao = window.confirm('As informações estão corretas?');
      if (confirmacao) {
        try {
          const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
          const data = await response.json();

          if (data.erro) {
            alert('CEP inválido. Tente novamente.');
          } else {
            setEndereco({
              logradouro: data.logradouro,
              bairro: data.bairro,
              cidade: data.localidade,
              estado: data.uf
            });
            setExibirInfo(true);
            setTemporizador(300);
            setBotaoDesabilitado(false);
          }
        } catch (error) {
          alert('Erro ao buscar informações do CEP. Tente novamente mais tarde.');
        }
      }
    } else {
      alert('Por favor, insira um CEP válido.');
    }
  };

  const alterarEndereco = () => {
    setExibirInfo(false);
    setCep('');
  };

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <section className={styles.solicitacao}>
          <h1 className={styles.titulo}>Solicitar Guincho</h1>
          <div className={styles.campoCep}>
            <label htmlFor="cep" className={styles.labelCep}>CEP</label>
            <input
              type="text"
              id="cep"
              className={styles.inputCep}
              placeholder="Digite seu CEP"
              value={cep}
              onChange={alterarCep}
              disabled={botaoDesabilitado && exibirInfo} 
            />
            <button className={styles.botaoSolicitar} onClick={solicitarGuincho}>
              Solicitar Guincho
            </button>
          </div>
          {exibirInfo && (
            <>
              <p className={styles.confirmacao}>Guincho solicitado com sucesso para o endereço abaixo.</p>
              <div className={styles.informacoes}>
                <div className={styles.caixaInformacao}>
                  <h3>Logradouro:</h3>
                  <p>{endereco.logradouro}</p>
                </div>
                <div className={styles.caixaInformacao}>
                  <h3>Bairro:</h3>
                  <p>{endereco.bairro}</p>
                </div>
                <div className={styles.caixaInformacao}>
                  <h3>Cidade:</h3>
                  <p>{endereco.cidade}</p>
                </div>
                <div className={styles.caixaInformacao}>
                  <h3>Estado:</h3>
                  <p>{endereco.estado}</p>
                </div>
              </div>
              <p className={styles.timer}>Tempo restante para alterar o endereço: {Math.floor(temporizador / 60)}:{String(temporizador % 60).padStart(2, '0')}</p>
              <button
                className={styles.botaoMudarEndereco}
                onClick={alterarEndereco}
                disabled={botaoDesabilitado}
              >
                Mudar Endereço
              </button>
            </>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Guincho;
