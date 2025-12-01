import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

// --- TIPAGEM ---
type StyleObject = React.CSSProperties;

interface TokenPayload {
    username: string;
    email: string;
}

// --- ÍCONES SVG ---
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const BellIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>;
const ArrowLeftIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>;
const ChevronDownIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>;
const SettingsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>;
const ListIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>;

// --- ESTILOS ---
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
    
    // Estilos do Sub-Menu (ADICIONADO)
    subNavList: { listStyle: 'none', padding: '5px 0 5px 25px', margin: '5px 0 0 0' },
    subNavItem: { margin: '2px 0', borderRadius: '6px', fontWeight: 400, fontSize: '0.95rem' },
    subNavLink: { display: 'block', padding: '10px 15px', textDecoration: 'none', color: 'inherit', borderRadius: '6px' },

    logoutButton: { 
        display: 'flex', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', 
        padding: '10px', width: '100%', fontFamily: `'Segoe UI', sans-serif`, fontSize: '1rem', 
        color: '#333', gap: '8px', fontWeight: 500, borderRadius: '8px',
    },
    mainContent: { flex: 1, display: 'flex', flexDirection: 'column', padding: '20px 40px', overflowY: 'auto' },
    header: { display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '30px' },
    headerItem: { display: 'flex', alignItems: 'center', marginLeft: '20px', padding: '8px 12px', borderRadius: '8px', backgroundColor: '#e9ecef', fontSize: '0.9rem' },
    content: { backgroundColor: '#ffffff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', flex: 1 },
    contentTitle: { fontSize: '2rem', fontWeight: 'bold', marginBottom: '20px' },
    
    // Estilos Específicos da Página de Configurações
    tabsContainer: { display: 'flex', borderBottom: '1px solid #dee2e6', marginBottom: '30px' },
    tab: { padding: '12px 20px', cursor: 'pointer', fontWeight: 500, borderBottom: '2px solid transparent', color: '#6c757d', display: 'flex', alignItems: 'center', gap: '8px' },
    tabActive: { color: '#0d6efd', borderBottom: '2px solid #0d6efd' },
    
    sectionTitle: { fontSize: '1.2rem', fontWeight: 600, marginBottom: '20px', color: '#333' },
    formGroup: { marginBottom: '20px', maxWidth: '500px' },
    label: { display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#495057', fontWeight: 500 },
    input: { width: '100%', padding: '10px', border: '1px solid #ced4da', borderRadius: '6px', fontSize: '1rem' },
    button: { padding: '10px 20px', backgroundColor: '#0d6efd', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 500 },
    
    categoryItem: { display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #f0f0f0', alignItems: 'center' },
};

function ConfiguracoesPage() {
    const navigate = useNavigate();
    const [user, setUser] = useState({ username: 'Usuário', email: 'carregando...' });
    const [activeTab, setActiveTab] = useState<'perfil' | 'categorias' | 'empresa'>('perfil');
    
    // Estado do Menu Lateral (ADICIONADO)
    const [isCadastrosOpen, setIsCadastrosOpen] = useState(false);

    // Estados para formulários
    const [senhaAtual, setSenhaAtual] = useState('');
    const [novaSenha, setNovaSenha] = useState('');
    const [categorias, setCategorias] = useState(['Aluguel', 'Fornecedores', 'Serviços', 'Impostos', 'Salários']);
    const [novaCategoria, setNovaCategoria] = useState('');

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
                navigate('/login');
            }
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        navigate('/login');
    };

    const handleSavePassword = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Funcionalidade de alterar senha será implementada no backend!');
        setSenhaAtual('');
        setNovaSenha('');
    };

    const handleAddCategoria = () => {
        if (novaCategoria) {
            setCategorias([...categorias, novaCategoria]);
            setNovaCategoria('');
        }
    };

    return (
        <div style={styles.pageContainer}>
            <aside style={styles.sidebar}>
                <div style={styles.sidebarHeader}><h1 style={styles.logo}>CashFlow</h1></div>
                <h2 style={styles.welcomeMessage}>Bem-Vindo, <br /> {user.username}!</h2>
                <nav style={styles.nav}>
                    <ul style={styles.navList}>
                        <li style={styles.navItem}><Link to="/dashboard" style={styles.navLink}>Dashboard</Link></li>
                        {/* MENU CADASTROS COM DROPDOWN (CORRIGIDO) */}
                        <li>
                            <div 
                                style={{...styles.navItem, padding: '15px 20px', cursor: 'pointer'}}
                                onClick={() => setIsCadastrosOpen(!isCadastrosOpen)}
                            >
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
                        <li style={styles.navItem}><Link to="/contas_a_receber" style={styles.navLink}>Contas a receber</Link></li>
                        <li style={{...styles.navItem, ...styles.navItemActive}}><Link to="/configuracoes" style={styles.navLink}>Configurações</Link></li>
                    </ul>
                </nav>
                <button onClick={handleLogout} style={styles.logoutButton}><ArrowLeftIcon /> <span>Sair</span></button>
            </aside>

            <main style={styles.mainContent}>
                <header style={styles.header}>
                    <div style={styles.headerItem}>Empresa / Filial</div>
                    <div style={styles.headerItem}><BellIcon /></div>
                    <div style={styles.headerItem}>
                        <UserIcon />
                        <div style={{marginLeft: '10px'}}>
                            <strong>{user.username}</strong><br/>
                            <small>{user.email}</small>
                        </div>
                    </div>
                </header>

                <div style={styles.content}>
                    <h1 style={styles.contentTitle}>Configurações</h1>

                    {/* ABAS DE NAVEGAÇÃO */}
                    <div style={styles.tabsContainer}>
                        <div 
                            style={activeTab === 'perfil' ? {...styles.tab, ...styles.tabActive} : styles.tab}
                            onClick={() => setActiveTab('perfil')}
                        >
                            <UserIcon /> Perfil
                        </div>
                        <div 
                            style={activeTab === 'categorias' ? {...styles.tab, ...styles.tabActive} : styles.tab}
                            onClick={() => setActiveTab('categorias')}
                        >
                            <ListIcon /> Categorias
                        </div>
                        <div 
                            style={activeTab === 'empresa' ? {...styles.tab, ...styles.tabActive} : styles.tab}
                            onClick={() => setActiveTab('empresa')}
                        >
                            <SettingsIcon /> Empresa
                        </div>
                    </div>

                    {/* CONTEÚDO DAS ABAS */}
                    
                    {/* ABA: PERFIL */}
                    {activeTab === 'perfil' && (
                        <div>
                            <h3 style={styles.sectionTitle}>Meus Dados</h3>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Usuário</label>
                                <input style={{...styles.input, backgroundColor: '#e9ecef'}} type="text" value={user.username} disabled />
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>E-mail</label>
                                <input style={{...styles.input, backgroundColor: '#e9ecef'}} type="text" value={user.email} disabled />
                            </div>

                            <h3 style={{...styles.sectionTitle, marginTop: '40px'}}>Segurança</h3>
                            <form onSubmit={handleSavePassword}>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Senha Atual</label>
                                    <input style={styles.input} type="password" value={senhaAtual} onChange={e => setSenhaAtual(e.target.value)} />
                                </div>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Nova Senha</label>
                                    <input style={styles.input} type="password" value={novaSenha} onChange={e => setNovaSenha(e.target.value)} />
                                </div>
                                <button type="submit" style={styles.button}>Atualizar Senha</button>
                            </form>
                        </div>
                    )}

                    {/* ABA: CATEGORIAS */}
                    {activeTab === 'categorias' && (
                        <div>
                            <h3 style={styles.sectionTitle}>Gerenciar Categorias Financeiras</h3>
                            <p style={{marginBottom: '20px', color: '#666'}}>Defina aqui as opções que aparecerão no campo "Tipo" das contas.</p>
                            
                            <div style={{...styles.formGroup, display: 'flex', gap: '10px'}}>
                                <input 
                                    style={styles.input} 
                                    placeholder="Nova Categoria (ex: Transporte)" 
                                    value={novaCategoria} 
                                    onChange={e => setNovaCategoria(e.target.value)}
                                />
                                <button type="button" onClick={handleAddCategoria} style={styles.button}>Adicionar</button>
                            </div>

                            <div style={{maxWidth: '500px', border: '1px solid #dee2e6', borderRadius: '6px'}}>
                                {categorias.map((cat, index) => (
                                    <div key={index} style={styles.categoryItem}>
                                        <span>{cat}</span>
                                        <span style={{color: '#dc3545', cursor: 'pointer', fontSize: '0.9rem'}}>Remover</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ABA: EMPRESA */}
                    {activeTab === 'empresa' && (
                        <div>
                            <h3 style={styles.sectionTitle}>Dados da Empresa</h3>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Nome Fantasia</label>
                                <input style={styles.input} type="text" defaultValue="Minha Empresa Ltda" />
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>CNPJ</label>
                                <input style={styles.input} type="text" defaultValue="00.000.000/0001-99" />
                            </div>
                            <button style={styles.button}>Salvar Alterações</button>
                        </div>
                    )}

                </div>
            </main>
        </div>
    );
}

export default ConfiguracoesPage;