import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/cadastro.module.css';

function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');
  const router = useRouter();

  const aoEnviarFormulario = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem');
      return;
    }

    try {
      
      const response = await fetch('http://127.0.0.1:5000/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message || 'Cadastro realizado com sucesso!');
        router.push('/');
      } else {
        setErro(data.error || 'Erro ao realizar o cadastro');
      }
    } catch (error) {
      setErro('Erro ao conectar com o servidor');
    }
  };

  return (
    <div className={styles.fundo}>
      <div className={styles.container}>
        <div className={styles.containerIlustracao}>
          <img src="/favicon.avif" alt="Ilustração" className={styles.ilustracao} />
        </div>
        <div className={styles.containerFormulario}>
          <h2 className={styles.titulo}>Cadastro</h2>
          <form onSubmit={aoEnviarFormulario}>
            <div className={styles.grupoInput}>
              <span className={styles.icone}>👤</span>
              <input
                type="text"
                placeholder="Nome Completo"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.grupoInput}>
              <span className={styles.icone}>📧</span>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.grupoInput}>
              <span className={styles.icone}>🔒</span>
              <input
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.grupoInput}>
              <span className={styles.icone}>🔒</span>
              <input
                type="password"
                placeholder="Confirme a Senha"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                required
                className={styles.input}
              />
            </div>
            {erro && <p className={styles.mensagemErro}>{erro}</p>}
            <button type="submit" className={styles.botaoCadastrar}>Cadastrar</button>
          </form>
          <p className={styles.textoRodape}>
            Já tem uma conta?{' '}
            <Link href="/" className={styles.link}>Clique aqui</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;