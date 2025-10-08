import React, { useState } from 'react';

// Tipagem para os objetos de estilo (boa prática em TypeScript)
type StyleObject = React.CSSProperties;

// ESTILOS GLOBAIS
const globalStyles = `
  #email::placeholder,
  #password::placeholder {
    color: #b0bec5 !important; /* Cor cinza claro para o placeholder */
    opacity: 1; /* Garante visibilidade em todos os navegadores */
  }

  /* Esconde o ícone de revelação de senha padrão do navegador */
  #password::-ms-reveal,
  #password::-webkit-password-reveal-button {
    display: none;
  }
`;

// Objeto que contém todos os nossos estilos
const styles: { [key: string]: StyleObject } = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
    backgroundColor: '#212121',
    padding: '10px',
    boxSizing: 'border-box',
  },
  loginCard: {
    display: 'flex',
    width: '100%',
    height: '100%',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
    overflow: 'hidden',
  },
  infoPanel: {
    backgroundColor: '#0d47a1',
    color: 'white',
    padding: '50px',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    borderTopLeftRadius: '10px',
    borderBottomLeftRadius: '10px',
  },
  infoPanelH1: {
    fontFamily: 'Roboto, sans-serif', 
    fontSize: '4rem',
    fontWeight: 'bold',
    lineHeight: 1.2,
    textAlign: 'center',
  },
  formPanel: {
    backgroundColor: 'white',
    fontFamily: 'Roboto, sans-serif', 
    padding: '50px 80px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    boxSizing: 'border-box',
    borderTopRightRadius: '10px',
    borderBottomRightRadius: '10px',
  },
  formPanelH2: {
    color: '#0d47a1',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '2.5rem',
    marginBottom: '40px',
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: '20px',
    width: '100%',
  },
  passwordContainer: {
    position: 'relative',
    width: '100%',
  },
  label: {
    display: 'block',
    fontFamily: 'Roboto, sans-serif', 
    marginBottom: '8px',
    color: '#666',
    fontSize: '0.9rem',
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    border: 'none',
    color: '#212529',
    backgroundColor: '#f3f4f6',
    borderRadius: '8px',
    fontSize: '1rem',
    boxSizing: 'border-box',
  },
  passwordInput: {
    paddingRight: '45px', // Adiciona espaço à direita para o ícone
  },
  toggleButton: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: '#000000', // Cor do ícone
    padding: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgotPassword: {
    display: 'block',
    fontFamily: 'Roboto, sans-serif', 
    textAlign: 'right',
    marginTop: '-10px',
    marginBottom: '25px',
    fontSize: '0.85rem',
    color: '#666',
    textDecoration: 'none',
  },
  submitButton: {
    width: '100%',
    fontFamily: 'Roboto, sans-serif', 
    padding: '15px',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#1976d2',
    color: 'white',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // --- CORREÇÃO APLICADA AQUI ---
  // Função para lidar com o login e redirecionar
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); // Impede que a página recarregue ao enviar o formulário
    
    // Lógica de validação (opcional) viria aqui
    // Ex: if (email && password) { ... }

    // Redireciona o usuário para a rota /dashboard
    window.location.href = '/dashboard';
  };

  // Ícones SVG para mostrar e ocultar senha
  const EyeOpenIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  );

  const EyeClosedIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
        <line x1="1" y1="1" x2="23" y2="23"></line>
    </svg>
  );

  return (
    <>
      <style>{globalStyles}</style>
      <div style={styles.container}>
        <div style={styles.loginCard}>
          {/* Painel Esquerdo (Azul) */}
          <div style={styles.infoPanel}>
            <h1 style={styles.infoPanelH1}>Olá, <br /> Bem-vindo!</h1>
          </div>

          {/* Painel Direito (Formulário) */}
          <div style={styles.formPanel}>
            <h2 style={styles.formPanelH2}>Login</h2>
            {/* O evento onSubmit agora chama a função handleLogin */}
            <form onSubmit={handleLogin}>
              <div style={styles.formGroup}>
                <label htmlFor="email" style={styles.label}>E-mail</label>
                <input 
                  type="email" 
                  id="email" 
                  style={styles.input}
                  placeholder="Digite seu e-mail" 
                  required // Boa prática adicionar validação básica
                />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="password" style={styles.label}>Senha</label>
                <div style={styles.passwordContainer}>
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    id="password" 
                    style={{...styles.input, ...styles.passwordInput}}
                    placeholder="Digite sua senha" 
                    required // Boa prática adicionar validação básica
                  />
                  <button 
                    type="button" 
                    onClick={togglePasswordVisibility} 
                    style={styles.toggleButton}
                  >
                    {showPassword ? EyeClosedIcon : EyeOpenIcon}
                  </button>
                </div>
              </div>
              <a href="#" style={styles.forgotPassword}>Esqueceu a senha?</a>
              <button type="submit" style={styles.submitButton}>Entrar</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;