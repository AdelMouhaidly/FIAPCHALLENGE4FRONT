import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/login.module.css';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const router = useRouter();

  const aoEnviarFormulario = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      
      const response = await fetch('http://127.0.0.1:5000/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message || 'Login bem-sucedido!');
        router.push('/Inicio'); 
      } else {
        setErro(data.message || 'Email ou senha incorretos');
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
          <h2 className={styles.titulo}>Login</h2>
          <form onSubmit={aoEnviarFormulario}>
            <div className={styles.grupoInput}>
              <label className={styles.rotulo}>Email</label>
              <input
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.grupoInput}>
              <label className={styles.rotulo}>Senha</label>
              <input
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.opcoes}>
              <label className={styles.lembrarMe}>
                <input type="checkbox" className={styles.checkbox} />
                Lembrar-me
              </label>
              <Link href="/recuperar-senha" className={styles.link}>
                Esqueceu a senha?
              </Link>
            </div>
            {erro && <p className={styles.mensagemErro}>{erro}</p>}
            <button type="submit" className={styles.botaoEntrar}>Entrar</button>
          </form>
          <p className={styles.textoRodape}>
            Não tem uma conta? <Link href="/cadastro" className={styles.linkCadastro}>Cadastre-se</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
