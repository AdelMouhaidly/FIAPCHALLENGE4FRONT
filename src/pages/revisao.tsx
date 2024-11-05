import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import styles from '../styles/Revisao.module.css';
import emailjs from 'emailjs-com';

interface Dia {
  data: string;
  disponivel: boolean;
}

function Revisao() {
  const [email, setEmail] = useState<string>('');
  const [dataSelecionada, setDataSelecionada] = useState<string>('');
  const [horarioSelecionado, setHorarioSelecionado] = useState<string>('');
  const [diasDisponiveis, setDiasDisponiveis] = useState<Dia[]>([]);
  const [horariosDisponiveis, setHorariosDisponiveis] = useState<string[]>([]);

  useEffect(() => {
    const dias: Dia[] = [];
    const hoje = new Date();
    for (let i = 1; i <= 30; i++) {
      const data = new Date();
      data.setDate(hoje.getDate() + i);
      const disponivel = Math.random() > 0.3;
      dias.push({ data: data.toISOString().slice(0, 10), disponivel });
    }
    setDiasDisponiveis(dias);
  }, []);

  useEffect(() => {
    if (dataSelecionada) {
      const horarios = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];
      const disponiveis = horarios.filter(() => Math.random() > 0.5);
      setHorariosDisponiveis(disponiveis);
    }
  }, [dataSelecionada]);

  const aoEnviarFormulario = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dataSelecionada || !horarioSelecionado || !email) {
      alert('Por favor, selecione uma data, horário e insira seu email.');
      return;
    }

    emailjs.send(
      'service_083y55f',
      'template_kuj3s88',
      {
        email: email,
        data: dataSelecionada,
        horario: horarioSelecionado,
      },
      'T1E2HUGxT4VWvLSsi'
    )
      .then(() => {
        alert('Um formulário foi enviado para seu email com os detalhes de revisão.');
      })
      .catch(() => {
        alert('Erro ao enviar o email. Tente novamente.');
      });
  };

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.titulo}>Agendamento de Revisão</h1>
        <form onSubmit={aoEnviarFormulario} className={styles.form}>
          <label className={styles.label}>Selecione um dia:</label>
          <select
            value={dataSelecionada}
            onChange={(e) => setDataSelecionada(e.target.value)}
            className={styles.select}
          >
            <option value="">Selecione uma data</option>
            {diasDisponiveis.map((dia) => (
              <option key={dia.data} value={dia.data} disabled={!dia.disponivel}>
                {dia.data} {dia.disponivel ? '' : ' - Indisponível'}
              </option>
            ))}
          </select>

          {dataSelecionada && (
            <>
              <label className={styles.label}>Selecione um horário:</label>
              <select
                value={horarioSelecionado}
                onChange={(e) => setHorarioSelecionado(e.target.value)}
                className={styles.select}
              >
                <option value="">Selecione um horário</option>
                {horariosDisponiveis.map((horario) => (
                  <option key={horario} value={horario}>
                    {horario}
                  </option>
                ))}
              </select>
            </>
          )}

          <label className={styles.label}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email"
            className={styles.input}
          />

          <button type="submit" className={styles.button}>
            Solicitar Agendamento
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default Revisao;
