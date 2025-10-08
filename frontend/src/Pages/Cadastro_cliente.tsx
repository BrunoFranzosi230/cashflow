import React, { useState } from 'react';
// 1. Importe o componente Link
import { Link } from 'react-router-dom';

// Tipagem para os objetos de estilo
type StyleObject = React.CSSProperties;

// --- Ícones em SVG ---
const BellIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
);
const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);
const FilterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
);
const ArrowLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
);
const ChevronDownIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
);


// --- Estilos do Componente ---
const styles: { [key: string]: StyleObject } = {
    pageContainer: {
        display: 'flex',
        width: '100vw',
        height: '100vh',
        backgroundColor: '#f0f2f5',
        fontFamily: `'Segoe UI', sans-serif`,
        color: '#333',
    },
    sidebar: {
        width: '280px',
        backgroundColor: '#ffffff',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid #e0e0e0',
    },
    sidebarHeader: {
        marginBottom: '40px',
    },
    logo: {
        fontSize: '1.8rem',
        fontWeight: 'bold',
        color: '#0d6efd',
    },
    welcomeMessage: {
        marginTop: '40px',
        fontSize: '1.5rem',
        fontWeight: 'bold',
    },
    nav: {
        flex: 1,
        marginTop: '20px',
    },
    navList: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
    },
    navItem: {
        margin: '5px 0',
        borderRadius: '8px',
        fontWeight: 500,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    // 2. Adicionei um estilo para os links para remover a decoração padrão
    navLink: {
        display: 'block',
        padding: '15px 20px',
        textDecoration: 'none',
        color: 'inherit',
        borderRadius: '8px',
    },
    navItemActive: {
        backgroundColor: '#1a237e',
        color: 'white',
    },
    subNavList: {
        listStyle: 'none',
        padding: '5px 0 5px 25px',
        margin: '5px 0 0 0',
    },
    subNavItem: {
        margin: '2px 0',
        borderRadius: '6px',
        fontWeight: 400,
        fontSize: '0.95rem',
    },
    subNavLink: {
        display: 'block',
        padding: '10px 15px',
        textDecoration: 'none',
        color: 'inherit',
        borderRadius: '6px',
    },
    subNavItemActive: {
        fontWeight: 'bold',
        color: '#0d6efd',
        backgroundColor: '#e7f5ff'
    },
    logoutButton: {
        display: 'flex',
        alignItems: 'center',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '10px',
    },
    mainContent: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '20px 40px',
        overflowY: 'auto',
    },
    header: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: '30px',
    },
    headerItem: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: '20px',
        padding: '8px 12px',
        borderRadius: '8px',
        backgroundColor: '#e9ecef',
        fontSize: '0.9rem',
    },
    content: {
        backgroundColor: '#ffffff',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
        flex: 1,
    },
    contentHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        paddingBottom: '20px',
        borderBottom: '1px solid #e9ecef',
    },
    contentTitle: {
        fontSize: '2rem',
        fontWeight: 'bold',
    },
    actions: {
        display: 'flex',
        gap: '10px',
    },
    headerActionButton: {
        padding: '10px 20px',
        border: '1px solid #ced4da',
        borderRadius: '8px',
        background: '#fff',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontWeight: 500,
    },
    tableActions: {
        marginBottom: '20px',
    },
    tableActionButton: {
        padding: '10px 25px',
        border: 'none',
        borderRadius: '8px',
        color: 'white',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginRight: '10px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
    },
    th: {
        padding: '12px 15px',
        textAlign: 'left',
        borderBottom: '2px solid #dee2e6',
        color: '#495057',
        fontWeight: 600,
        fontSize: '0.9rem',
    },
    td: {
        padding: '12px 15px',
        borderBottom: '1px solid #e9ecef',
        height: '30px'
    },
    checkbox: {
        width: '18px',
        height: '18px',
    }
};

function ClientesPage() {
    const [isCadastrosOpen, setIsCadastrosOpen] = useState(true);
    const tableHeaders = ['Código', 'Razão Social', 'CPF/CNPJ', 'Telefone', 'Inscrição Estadual'];
    const emptyRows = Array.from({ length: 10 });

    return (
        <div style={styles.pageContainer}>
            <aside style={styles.sidebar}>
                <div style={styles.sidebarHeader}><h1 style={styles.logo}>CashFlow</h1></div>
                <h2 style={styles.welcomeMessage}>Bem-Vindo, <br /> Usuário!</h2>
                <nav style={styles.nav}>
                    <ul style={styles.navList}>
                        {/* 3. Envolvemos os links com o componente <Link> */}
                        <li style={styles.navItem}><Link to="/dashboard" style={styles.navLink}>Dashboard</Link></li>
                        
                        <li>
                            <div 
                                style={{...styles.navItem, ...styles.navItemActive, padding: '15px 20px', cursor: 'pointer'}}
                                onClick={() => setIsCadastrosOpen(!isCadastrosOpen)}
                            >
                                <span>Cadastros</span>
                                <ChevronDownIcon />
                            </div>
                            {isCadastrosOpen && (
                                <ul style={styles.subNavList}>
                                    <li style={{...styles.subNavItem, ...styles.subNavItemActive}}>
                                        <Link to="/cadastro_cliente" style={styles.subNavLink}>Clientes</Link>
                                    </li>
                                    <li style={styles.subNavItem}>
                                        <Link to="/cadastro_fornecedor" style={styles.subNavLink}>Fornecedores</Link>
                                    </li>
                                    <li style={styles.subNavItem}>
                                        <Link to="/cadastro_produto" style={styles.subNavLink}>Produtos</Link>
                                    </li>
                                </ul>
                            )}
                        </li>

                        <li style={styles.navItem}><Link to="/contas_a_pagar" style={styles.navLink}>Contas a pagar</Link></li>
                        <li style={styles.navItem}><Link to="/contas_a_receber" style={styles.navLink}>Contas a receber</Link></li>
                        <li style={styles.navItem}><Link to="/configuracoes" style={styles.navLink}>Configurações</Link></li>
                    </ul>
                </nav>
                <button style={styles.logoutButton}><ArrowLeftIcon /></button>
            </aside>

            {/* Conteúdo Principal */}
            <main style={styles.mainContent}>
                <header style={styles.header}>
                    <div style={styles.headerItem}>Empresa / Filial</div>
                    <div style={styles.headerItem}><BellIcon /></div>
                    <div style={styles.headerItem}>
                        <UserIcon />
                        <div style={{marginLeft: '10px'}}>
                            <strong>Usuário</strong><br/>
                            <small>usuario@email.com</small>
                        </div>
                    </div>
                </header>

                <div style={styles.content}>
                    <div style={styles.contentHeader}>
                        <h1 style={styles.contentTitle}>Clientes</h1>
                        <div style={styles.actions}>
                            <button style={styles.headerActionButton}>Exportar</button>
                            <button style={styles.headerActionButton}>Filtro <FilterIcon /></button>
                        </div>
                    </div>
                    
                    <div style={styles.tableActions}>
                        <button style={{...styles.tableActionButton, backgroundColor: '#0d6efd'}}>Incluir</button>
                        <button style={{...styles.tableActionButton, backgroundColor: '#343a40'}}>Alterar</button>
                        <button style={{...styles.tableActionButton, backgroundColor: '#343a40'}}>Visualizar</button>
                        <button style={{...styles.tableActionButton, backgroundColor: '#343a40'}}>Excluir</button>
                    </div>

                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={{...styles.th, width: '5%'}}><input type="checkbox" style={styles.checkbox} /></th>
                                {tableHeaders.map(header => <th key={header} style={styles.th}>{header}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {emptyRows.map((_, index) => (
                                <tr key={index}>
                                    <td style={styles.td}><input type="checkbox" style={styles.checkbox} /></td>
                                    {tableHeaders.map(header => <td key={header} style={styles.td}></td>)}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}

export default ClientesPage;