import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const [menuAberto, setMenuAberto] = useState<boolean>(false);
  const router = useRouter();

  const voltarParaLogin = () => {
    router.push('/'); 
  };

  return (
    <header className={styles.header}>
      <Link href="/Inicio" className={styles.logo}>
        Porto Seguro
      </Link>
      <nav className={styles.nav}>
        <Link href="/planos">Planos</Link>
        <Link href="/guincho">Guincho</Link>
        <Link href="/revisao">Revisão</Link>
        <Link href="/pecas">Peças</Link>
        <Link href="/integrantes">Integrantes</Link>
      </nav>
      <div className={styles.usuarioMenu} onClick={() => setMenuAberto(!menuAberto)}>
        <button className={styles.botaoLogout} onClick={voltarParaLogin}>Sair</button>
      </div>
    </header>
  );
};

export default Header;
