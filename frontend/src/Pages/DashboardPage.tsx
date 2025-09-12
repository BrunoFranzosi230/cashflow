import React from 'react';

// Tipagem para os objetos de estilo
type StyleObject = React.CSSProperties;

// --- Ícones em SVG para não depender de imagens externas ---
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


// --- Estilos do Componente ---
const styles: { [key: string]: StyleObject } = {
    dashboardContainer: {
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
        padding: '15px 20px',
        margin: '5px 0',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 500,
    },
    navItemActive: {
        backgroundColor: '#1a237e',
        color: 'white',
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
        flex: 1,
    },
    contentHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
    },
    contentTitle: {
        fontSize: '2rem',
        fontWeight: 'bold',
    },
    actions: {
        display: 'flex',
        gap: '10px',
    },
    actionButton: {
        padding: '10px 20px',
        border: '1px solid #ced4da',
        borderRadius: '8px',
        background: '#fff',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
    },
    card: {
        backgroundColor: '#ffffff',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    },
    cardTitle: {
        fontSize: '1rem',
        fontWeight: 600,
        color: '#6c757d',
        marginBottom: '15px',
    },
    // Estilos específicos para os gráficos (simulados)
    faturamentoValue: {
        fontSize: '2rem',
        fontWeight: 'bold',
        marginBottom: '20px',
    },
    chartDots: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        height: '60px',
    },
    dot: {
        width: '25px',
        height: '25px',
        borderRadius: '50%',
        backgroundColor: '#4dabf7',
    },
    totalValue: {
        fontSize: '1.8rem',
        fontWeight: 'bold',
    },
    barChart: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        height: '100px',
        marginTop: '20px',
    },
    bar: {
        width: '40px',
        backgroundColor: '#1971c2',
        borderRadius: '4px',
        position: 'relative',
    },
    barLabel: {
        position: 'absolute',
        top: '-20px',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: '0.8rem',
        background: '#333',
        color: 'white',
        padding: '2px 5px',
        borderRadius: '4px',
    }
};

function DashboardPage() {
    const navLinks = ['Dashboard', 'Cadastros', 'Contas a pagar', 'Contas a receber', 'Configurações'];

    return (
        <div style={styles.dashboardContainer}>
            {/* Sidebar (Menu Lateral) */}
            <aside style={styles.sidebar}>
                <div style={styles.sidebarHeader}>
                    <h1 style={styles.logo}>CashFlow</h1>
                </div>
                <h2 style={styles.welcomeMessage}>Bem-Vindo, <br /> Usuário!</h2>
                <nav style={styles.nav}>
                    <ul style={styles.navList}>
                        {navLinks.map(link => (
                            <li key={link} style={{...styles.navItem, ...(link === 'Dashboard' ? styles.navItemActive : {})}}>
                                {link}
                            </li>
                        ))}
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
                        <h1 style={styles.contentTitle}>Controle Financeiro</h1>
                        <div style={styles.actions}>
                            <button style={styles.actionButton}>Exportar</button>
                            <button style={styles.actionButton}>Filtro <FilterIcon /></button>
                        </div>
                    </div>

                    <div style={styles.grid}>
                        {/* Card Faturamento */}
                        <div style={{...styles.card, gridColumn: 'span 2'}}>
                            <h3 style={styles.cardTitle}>Faturamento</h3>
                            <p style={styles.faturamentoValue}>R$ 100,75K</p>
                            <div style={styles.chartDots}>
                                <div style={{...styles.dot, height: '15px', width: '15px', backgroundColor: '#adb5bd'}}></div>
                                <div style={{...styles.dot, height: '25px'}}></div>
                                <div style={{...styles.dot, height: '35px', backgroundColor: '#1971c2'}}></div>
                                <div style={{...styles.dot, height: '20px'}}></div>
                                <div style={{...styles.dot, height: '30px'}}></div>
                            </div>
                        </div>

                         {/* Card Total Pagos */}
                        <div style={styles.card}>
                           <h3 style={styles.cardTitle}>Total Pagos</h3>
                           <p style={styles.totalValue}>R$ 74,65K</p>
                        </div>

                         {/* Card Total Recebidos */}
                        <div style={styles.card}>
                           <h3 style={styles.cardTitle}>Total Recebidos</h3>
                           <p style={styles.totalValue}>R$ 608,87K</p>
                        </div>

                        {/* Card Totais */}
                         <div style={{...styles.card, gridColumn: 'span 2'}}>
                            <h3 style={styles.cardTitle}>Totais</h3>
                             <p style={styles.faturamentoValue}>R$ 683,52K</p>
                             <div style={styles.barChart}>
                                <div style={{...styles.bar, height: '60%'}}><span style={styles.barLabel}>294,12K</span></div>
                                <div style={{...styles.bar, height: '80%'}}><span style={styles.barLabel}>400,87K</span></div>
                                <div style={{...styles.bar, height: '30%', backgroundColor: '#adb5bd'}}><span style={styles.barLabel}>78,94K</span></div>
                                <div style={{...styles.bar, height: '100%'}}><span style={styles.barLabel}>683,52K</span></div>
                             </div>
                        </div>

                        {/* Card Demonstração */}
                        <div style={styles.card}>
                           <h3 style={styles.cardTitle}>Demonstração Financeira</h3>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}

export default DashboardPage;