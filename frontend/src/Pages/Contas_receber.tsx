import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// --- TYPE DEFINITIONS ---
type StyleObject = React.CSSProperties;

type Conta = {
  id: number;
  status: 'Aberto' | 'Recebido' | 'Vencido';
  prefixo: string;
  numeroTitulo: string;
  tipo: string;
  cliente: string;
  dataEmissao: string;
};

// --- SVG ICONS ---
const BellIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>;
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const FilterIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>;
const ArrowLeftIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>;
const ChevronDownIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>;

// --- MOCK DATA ---
const mockData: Conta[] = [
    { id: 1, status: 'Aberto', prefixo: 'FAT', numeroTitulo: '7501', tipo: 'Serviço', cliente: 'Alpha Co.', dataEmissao: '2025-10-15' },
    { id: 2, status: 'Recebido', prefixo: 'NF', numeroTitulo: '3345', tipo: 'NF-e', cliente: 'Omega Inc.', dataEmissao: '2025-09-30' },
    { id: 3, status: 'Vencido', prefixo: 'BOL', numeroTitulo: '9823', tipo: 'Boleto', cliente: 'Beta Group', dataEmissao: '2025-09-05' },
    { id: 4, status: 'Aberto', prefixo: 'FAT', numeroTitulo: '7502', tipo: 'Serviço', cliente: 'Gamma LLC', dataEmissao: '2025-10-20' },
    { id: 5, status: 'Recebido', prefixo: 'NF', numeroTitulo: '3350', tipo: 'NF-e', cliente: 'Alpha Co.', dataEmissao: '2025-10-01' },
];

// --- STYLES (CSS-in-JS) ---
const styles: { [key: string]: StyleObject } = {
    pageContainer: { display: 'flex', width: '100vw', height: '100vh', backgroundColor: '#f0f2f5', fontFamily: `'Segoe UI', sans-serif`, color: '#333' },
    sidebar: { width: '280px', backgroundColor: '#ffffff', padding: '20px', display: 'flex', flexDirection: 'column', borderRight: '1px solid #e0e0e0' },
    sidebarHeader: { marginBottom: '40px' },
    logo: { fontSize: '1.8rem', fontWeight: 'bold', color: '#0d6efd' },
    welcomeMessage: { marginTop: '40px', fontSize: '1.5rem', fontWeight: 'bold' },
    nav: { flex: 1, marginTop: '20px' },
    navList: { listStyle: 'none', padding: 0, margin: 0 },
    navItem: { margin: '5px 0', borderRadius: '8px', fontWeight: 500, display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    navLink: { display: 'block', padding: '15px 20px', textDecoration: 'none', color: 'inherit', borderRadius: '8px' },
    navItemActive: { backgroundColor: '#1a237e', color: 'white' },
    subNavList: { listStyle: 'none', padding: '5px 0 5px 25px', margin: '5px 0 0 0' },
    subNavItem: { margin: '2px 0', borderRadius: '6px', fontWeight: 400, fontSize: '0.95rem' },
    subNavLink: { display: 'block', padding: '10px 15px', textDecoration: 'none', color: 'inherit', borderRadius: '6px' },
    mainContent: { flex: 1, display: 'flex', flexDirection: 'column', padding: '20px 40px', overflowY: 'auto' },
    header: { display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '30px' },
    headerItem: { display: 'flex', alignItems: 'center', marginLeft: '20px', padding: '8px 12px', borderRadius: '8px', backgroundColor: '#e9ecef', fontSize: '0.9rem' },
    content: { backgroundColor: '#ffffff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', flex: 1 },
    contentHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #e9ecef' },
    contentTitle: { fontSize: '2rem', fontWeight: 'bold' },
    actions: { display: 'flex', gap: '10px' },
    headerActionButton: { padding: '10px 20px', border: '1px solid #ced4da', borderRadius: '8px', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 500 },
    tableActions: { marginBottom: '20px' },
    tableActionButton: { padding: '10px 25px', border: 'none', borderRadius: '8px', color: 'white', fontWeight: 'bold', cursor: 'pointer', marginRight: '10px' },
    buttonDisabled: { backgroundColor: '#6c757d', cursor: 'not-allowed' },
    table: { width: '100%', borderCollapse: 'collapse', marginTop: '20px' },
    th: { padding: '12px 15px', textAlign: 'left', borderBottom: '2px solid #dee2e6', color: '#495057', fontWeight: 600, fontSize: '0.9rem' },
    td: { padding: '12px 15px', borderBottom: '1px solid #e9ecef' },
    trHover: { cursor: 'pointer' },
    trSelected: { backgroundColor: '#e7f5ff' },
    checkbox: { width: '18px', height: '18px' },
    statusBadge: { padding: '4px 10px', fontSize: '0.8rem', fontWeight: '600', borderRadius: '12px', color: 'white' },
    logoutButton: { display: 'flex', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', padding: '10px' },
};

function ContasAReceberPage() {
    const [isCadastrosOpen, setIsCadastrosOpen] = useState(false);
    const [contas, _setContas] = useState<Conta[]>(mockData);
    const [selectedRow, setSelectedRow] = useState<number | null>(null);

    const getStatusStyle = (status: Conta['status']): React.CSSProperties => {
        if (status === 'Aberto') return { backgroundColor: '#0d6efd' }; // Blue
        if (status === 'Recebido') return { backgroundColor: '#198754' }; // Green
        if (status === 'Vencido') return { backgroundColor: '#dc3545' }; // Red
        return {};
    };

    return (
        <div style={styles.pageContainer}>
            <aside style={styles.sidebar}>
                <div style={styles.sidebarHeader}><h1 style={styles.logo}>CashFlow</h1></div>
                <h2 style={styles.welcomeMessage}>Bem-Vindo, <br /> Usuário!</h2>
                <nav style={styles.nav}>
                    <ul style={styles.navList}>
                        <li style={styles.navItem}><Link to="/dashboard" style={styles.navLink}>Dashboard</Link></li>
                        <li>
                            <div style={{...styles.navItem, padding: '15px 20px', cursor: 'pointer'}} onClick={() => setIsCadastrosOpen(!isCadastrosOpen)}>
                                <span>Cadastros</span>
                                <ChevronDownIcon />
                            </div>
                            {isCadastrosOpen && (
                                <ul style={styles.subNavList}>
                                    <li style={styles.subNavItem}><Link to="/cadastro_cliente" style={styles.subNavLink}>Clientes</Link></li>
                                    <li style={styles.subNavItem}><Link to="/cadastro_fornecedor" style={styles.subNavLink}>Fornecedores</Link></li>
                                    <li style={styles.subNavItem}><Link to="/cadastro_produto" style={styles.subNavLink}>Produtos</Link></li>
                                </ul>
                            )}
                        </li>
                        <li style={styles.navItem}><Link to="/contas_a_pagar" style={styles.navLink}>Contas a pagar</Link></li>
                        <li style={{...styles.navItem, ...styles.navItemActive}}><Link to="/contas_a_receber" style={styles.navLink}>Contas a receber</Link></li>
                        <li style={styles.navItem}><Link to="/configuracoes" style={styles.navLink}>Configurações</Link></li>
                    </ul>
                </nav>
                <button style={styles.logoutButton}><ArrowLeftIcon /></button>
            </aside>

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
                        <h1 style={styles.contentTitle}>Contas a Receber</h1>
                        <div style={styles.actions}>
                            <button style={styles.headerActionButton}>Exportar</button>
                            <button style={styles.headerActionButton}>Filtro <FilterIcon /></button>
                        </div>
                    </div>
                    
                    <div style={styles.tableActions}>
                        <button style={{...styles.tableActionButton, backgroundColor: '#0d6efd'}}>Incluir</button>
                        <button disabled={!selectedRow} style={{...styles.tableActionButton, ...(!selectedRow ? styles.buttonDisabled : {backgroundColor: '#343a40'})}}>Alterar</button>
                        <button disabled={!selectedRow} style={{...styles.tableActionButton, ...(!selectedRow ? styles.buttonDisabled : {backgroundColor: '#343a40'})}}>Visualizar</button>
                        <button disabled={!selectedRow} style={{...styles.tableActionButton, ...(!selectedRow ? styles.buttonDisabled : {backgroundColor: '#dc3545'})}}>Excluir</button>
                    </div>

                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={{...styles.th, width: '5%'}}></th>
                                <th style={styles.th}>Status</th>
                                <th style={styles.th}>Cliente</th>
                                <th style={styles.th}>Nº Título</th>
                                <th style={styles.th}>Emissão</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contas.map((conta) => {
                                const isSelected = selectedRow === conta.id;
                                return (
                                <tr key={conta.id} onClick={() => setSelectedRow(isSelected ? null : conta.id)} style={isSelected ? {...styles.trHover, ...styles.trSelected} : styles.trHover}>
                                    <td style={styles.td}><input type="radio" style={styles.checkbox} checked={isSelected} readOnly /></td>
                                    <td style={styles.td}><span style={{...styles.statusBadge, ...getStatusStyle(conta.status)}}>{conta.status}</span></td>
                                    <td style={styles.td}>{conta.cliente}</td>
                                    <td style={styles.td}>{conta.numeroTitulo}</td>
                                    <td style={styles.td}>{new Date(conta.dataEmissao).toLocaleDateString('pt-BR')}</td>
                                </tr>
                            )})}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}

export default ContasAReceberPage;
