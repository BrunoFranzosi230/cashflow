import React, { useState, useEffect } from 'react';
// 1. Importar useNavigate e jwtDecode
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

// Tipagem para os objetos de estilo
type StyleObject = React.CSSProperties;

// 2. Interface para o Token
interface TokenPayload {
    username: string;
    email: string;
}

// 3. DEFINIÇÃO DO TIPO FORNECEDOR (id: number)
type Fornecedor = {
    id: number; // ID do banco de dados
    codigo: string;
    razaoSocial: string;
    cpfCnpj: string;
    telefone: string | null;
    inscricaoEstadual: string | null;
};

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
    // ... (Seus estilos completos aqui) ...
    pageContainer: { display: 'flex', width: '100vw', height: '100vh', backgroundColor: '#f0f2f5', fontFamily: `'Segoe UI', sans-serif`, color: '#333', },
    sidebar: { width: '280px', backgroundColor: '#ffffff', padding: '20px', display: 'flex', flexDirection: 'column', borderRight: '1px solid #e0e0e0', },
    sidebarHeader: { marginBottom: '40px', },
    logo: { fontSize: '1.8rem', fontWeight: 'bold', color: '#0d6efd', },
    welcomeMessage: { marginTop: '40px', fontSize: '1.5rem', fontWeight: 'bold', },
    nav: { flex: 1, marginTop: '20px', },
    navList: { listStyle: 'none', padding: 0, margin: 0, },
    navItem: { margin: '5px 0', borderRadius: '8px', fontWeight: 500, display: 'flex', justifyContent: 'space-between', alignItems: 'center', },
    navLink: { display: 'block', padding: '15px 20px', textDecoration: 'none', color: 'inherit', borderRadius: '8px', },
    navItemActive: { backgroundColor: '#1a237e', color: 'white', },
    subNavList: { listStyle: 'none', padding: '5px 0 5px 25px', margin: '5px 0 0 0', },
    subNavItem: { margin: '2px 0', borderRadius: '6px', fontWeight: 400, fontSize: '0.95rem', },
    subNavLink: { display: 'block', padding: '10px 15px', textDecoration: 'none', color: 'inherit', borderRadius: '6px', },
    subNavItemActive: { fontWeight: 'bold', color: '#0d6efd', backgroundColor: '#e7f5ff' },
    // 4. ESTILO DO BOTÃO DE LOGOUT
    logoutButton: { 
        display: 'flex', 
        alignItems: 'center', 
        background: 'none', 
        border: 'none', 
        cursor: 'pointer', 
        padding: '10px', 
        width: '100%', 
        fontFamily: `'Segoe UI', sans-serif`, 
        fontSize: '1rem', 
        color: '#333', 
        gap: '8px', 
        fontWeight: 500, 
        borderRadius: '8px',
    },
    mainContent: { flex: 1, display: 'flex', flexDirection: 'column', padding: '20px 40px', overflowY: 'auto', },
    header: { display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '30px', },
    headerItem: { display: 'flex', alignItems: 'center', marginLeft: '20px', padding: '8px 12px', borderRadius: '8px', backgroundColor: '#e9ecef', fontSize: '0.9rem', },
    content: { backgroundColor: '#ffffff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', flex: 1, },
    contentHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #e9ecef', },
    contentTitle: { fontSize: '2rem', fontWeight: 'bold', },
    actions: { display: 'flex', gap: '10px', },
    headerActionButton: { padding: '10px 20px', border: '1px solid #ced4da', borderRadius: '8px', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 500, },
    tableActions: { marginBottom: '20px', },
    tableActionButton: { padding: '10px 25px', border: 'none', borderRadius: '8px', color: 'white', fontWeight: 'bold', cursor: 'pointer', marginRight: '10px', },
    buttonDisabled: { backgroundColor: '#6c757d', cursor: 'not-allowed' },
    table: { width: '100%', borderCollapse: 'collapse', marginTop: '20px', },
    th: { padding: '12px 15px', textAlign: 'left', borderBottom: '2px solid #dee2e6', color: '#495057', fontWeight: 600, fontSize: '0.9rem', },
    td: { padding: '12px 15px', borderBottom: '1px solid #e9ecef', },
    trHover: { cursor: 'pointer' },
    trSelected: { backgroundColor: '#e7f5ff' },
    checkbox: { width: '18px', height: '18px', },
    noDataText: { textAlign: 'center', padding: '20px', color: '#6c757d', fontStyle: 'italic' }
};

function FornecedoresPage() {
    const [isCadastrosOpen, setIsCadastrosOpen] = useState(true);
    const [selectedRow, setSelectedRow] = useState<number | null>(null); // ID do DB é number
    const navigate = useNavigate();
    
    const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
    const tableHeaders = ['Código', 'Razão Social', 'CPF/CNPJ', 'Telefone', 'Inscrição Estadual'];
    
    // 5. LÓGICA DE USUÁRIO E LOGOUT
    const [user, setUser] = useState({ username: 'Usuário', email: 'carregando...' });

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        navigate('/login');
    };

    // 6. ATUALIZADO: Buscar dados da API em vez do localStorage
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            try {
                const decodedToken = jwtDecode<TokenPayload>(token);
                setUser({
                    username: decodedToken.username,
                    email: decodedToken.email || 'Nenhum e-mail'
                });
            } catch (error) {
                console.error("Erro ao decodificar o token:", error);
                handleLogout();
            }
        } else {
            handleLogout();
        }

        // Função para buscar fornecedores da API
        const fetchFornecedores = async () => {
            if (!token) return; 

            try {
                const response = await fetch('http://127.0.0.1:8000/api/fornecedores/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                if (response.status === 401) { 
                    handleLogout();
                    return;
                }
                
                const data: Fornecedor[] = await response.json();
                setFornecedores(data);
                
            } catch (error) {
                console.error("Erro ao buscar fornecedores:", error);
            }
        };

        fetchFornecedores();
    }, [navigate]); // Dependência


    const handleIncluirClick = () => {
        navigate('/cadastro_fornecedor/novo');
    };

    const handleAlterarClick = () => {
        if (selectedRow) {
            navigate(`/cadastro_fornecedor/editar/${selectedRow}`);
        } else {
            alert("Por favor, selecione um fornecedor para alterar.");
        }
    };

    // 7. ATUALIZADO: Excluir da API
    const handleExcluirClick = async () => {
        if (!selectedRow) {
            alert("Por favor, selecione um fornecedor para excluir.");
            return;
        }

        if (window.confirm("Tem certeza que deseja excluir este fornecedor?")) {
            const token = localStorage.getItem('authToken');
            if (!token) { handleLogout(); return; }

            try {
                const response = await fetch(`http://127.0.0.1:8000/api/fornecedores/${selectedRow}/`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Falha ao excluir.');
                }
                
                setFornecedores(fornecedores.filter(f => f.id !== selectedRow));
                setSelectedRow(null); 
                
            } catch (error) {
                console.error("Erro ao excluir fornecedor:", error);
                alert("Erro ao excluir fornecedor.");
            }
        }
    };

    return (
        <div style={styles.pageContainer}>
            <aside style={styles.sidebar}>
                <div style={styles.sidebarHeader}><h1 style={styles.logo}>CashFlow</h1></div>
                {/* 8. ATUALIZADO */}
                <h2 style={styles.welcomeMessage}>Bem-Vindo, <br /> {user.username}!</h2>
                <nav style={styles.nav}>
                    <ul style={styles.navList}>
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
                                    <li style={styles.subNavItem}>
                                        <Link to="/cadastro_cliente" style={styles.subNavLink}>Clientes</Link>
                                    </li>
                                    <li style={{...styles.subNavItem, ...styles.subNavItemActive}}>
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
                {/* 9. ATUALIZADO */}
                <button onClick={handleLogout} style={styles.logoutButton}><ArrowLeftIcon /> <span>Sair</span></button>
            </aside>

            <main style={styles.mainContent}>
                <header style={styles.header}>
                    <div style={styles.headerItem}>Empresa / Filial</div>
                    <div style={styles.headerItem}><BellIcon /></div>
                    {/* 10. ATUALIZADO */}
                    <div style={styles.headerItem}>
                        <UserIcon />
                        <div style={{marginLeft: '10px'}}>
                            <strong>{user.username}</strong><br/>
                            <small>{user.email}</small>
                        </div>
                    </div>
                </header>

                <div style={styles.content}>
                    <div style={styles.contentHeader}>
                        <h1 style={styles.contentTitle}>Fornecedores</h1>
                        <div style={styles.actions}>
                            <button style={styles.headerActionButton}>Exportar</button>
                            <button style={styles.headerActionButton}>Filtro <FilterIcon /></button>
                        </div>
                    </div>
                    
                    <div style={styles.tableActions}>
                        <button onClick={handleIncluirClick} style={{...styles.tableActionButton, backgroundColor: '#0d6efd'}}>Incluir</button>
                        <button onClick={handleAlterarClick} disabled={!selectedRow} style={{...styles.tableActionButton, ...(!selectedRow ? styles.buttonDisabled : {backgroundColor: '#343a40'})}}>Alterar</button>
                        <button disabled={!selectedRow} style={{...styles.tableActionButton, ...(!selectedRow ? styles.buttonDisabled : {backgroundColor: '#343a40'})}}>Visualizar</button>
                        <button onClick={handleExcluirClick} disabled={!selectedRow} style={{...styles.tableActionButton, ...(!selectedRow ? styles.buttonDisabled : {backgroundColor: '#dc3545'})}}>Excluir</button>
                    </div>

                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={{...styles.th, width: '5%'}}></th>
                                {tableHeaders.map(header => <th key={header} style={styles.th}>{header}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {fornecedores.length > 0 ? (
                                fornecedores.map((fornecedor) => {
                                    const isSelected = selectedRow === fornecedor.id;
                                    return (
                                        <tr 
                                            key={fornecedor.id} 
                                            onClick={() => setSelectedRow(isSelected ? null : fornecedor.id)} 
                                            style={isSelected ? {...styles.trHover, ...styles.trSelected} : styles.trHover}
                                        >
                                            <td style={styles.td}><input type="radio" style={styles.checkbox} checked={isSelected} readOnly /></td>
                                            <td style={styles.td}>{fornecedor.codigo}</td>
                                            <td style={styles.td}>{fornecedor.razaoSocial}</td>
                                            <td style={styles.td}>{fornecedor.cpfCnpj}</td>
                                            <td style={styles.td}>{fornecedor.telefone}</td>
                                            <td style={styles.td}>{fornecedor.inscricaoEstadual}</td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={tableHeaders.length + 1} style={styles.noDataText}>
                                        Nenhum fornecedor cadastrado.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}

export default FornecedoresPage;