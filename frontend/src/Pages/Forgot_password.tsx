import React from 'react';
// CORREÇÃO: O nome do pacote estava com um erro de digitação.
import { Link } from 'react-router-dom';

// Type definition for style objects
type StyleObject = React.CSSProperties;

// Global styles for input placeholders
const globalStyles = `
  #email::placeholder {
    color: #b0bec5 !important;
    opacity: 1;
  }
`;

// Component styles (CSS-in-JS)
const styles: { [key: string]: StyleObject } = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
    backgroundColor: '#f0f2f5',
    fontFamily: 'Roboto, sans-serif',
  },
  card: {
    backgroundColor: 'white',
    padding: '40px 50px',
    borderRadius: '10px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '450px',
    textAlign: 'center',
  },
  title: {
    color: '#0d47a1',
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '15px',
  },
  subtitle: {
    color: '#666',
    marginBottom: '30px',
  },
  formGroup: {
    marginBottom: '20px',
    width: '100%',
    textAlign: 'left',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    color: '#666',
    fontSize: '0.9rem',
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    border: '1px solid #ddd',
    color: '#212529',
    backgroundColor: '#f3f4f6',
    borderRadius: '8px',
    fontSize: '1rem',
    boxSizing: 'border-box',
  },
  submitButton: {
    width: '100%',
    padding: '15px',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#1976d2',
    color: 'white',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginBottom: '20px',
  },
  backLink: {
    display: 'inline-block',
    color: '#666',
    textDecoration: 'none',
    fontSize: '0.9rem',
  }
};

function ForgotPasswordPage() {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to handle password reset request would go here
    alert('If an account with this email exists, a password reset link has been sent.');
  };

  return (
    <>
      <style>{globalStyles}</style>
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>Esqueceu a senha?</h2>
          <p style={styles.subtitle}>Não se preocupe, enviamos instruções de redefinição de senha.</p>
          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label htmlFor="email" style={styles.label}>Email</label>
              <input
                type="email"
                id="email"
                style={styles.input}
                placeholder="Digite seu email"
                required
              />
            </div>
            <button type="submit" style={styles.submitButton}>
              Enviar link de redefinição
            </button>
          </form>
          <Link to="/" style={styles.backLink}>
            &larr; Voltar para o login
          </Link>
        </div>
      </div>
    </>
  );
}

export default ForgotPasswordPage;