import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

// --- TIPAGEM ---
type StyleObject = React.CSSProperties;

interface TokenPayload {
    username: string;
    email: string;
    user_id?: number;
}

// Tipagem para os dados do formulário (Frontend)
type ContaFormData = {
    prefixo: string;
    numeroTitulo: string;
    tipo: string;
    dataEmissao: string;
    fornecedor: string;
    valorTitulo: string;
    vencimento: string;
    status?: 'Aberto' | 'Pago' | 'Vencido';
};

// --- ÍCONES SVG ---
const BellIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>;
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const ArrowLeftIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>;
const ChevronDownIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>;

// --- ESTILOS DO COMPONENTE ---
const styles: { [key: string]: StyleObject } = {
    pageContainer: { display: 'flex', width: '100vw', height: '100vh', backgroundColor: '#f0f2f5', fontFamily: `'Segoe UI', sans-serif`, color: '#333' },
    sidebar: { width: '280px', backgroundColor: '#ffffff', padding: '20px', display: 'flex', flexDirection: 'column', borderRight: '1px solid #e0e0e0' },
    mainContent: { flex: 1, display: 'flex', flexDirection: 'column', padding: '20px 40px', overflowY: 'auto' },
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
    subNavItemActive: { fontWeight: 'bold', color: '#0d6efd', backgroundColor: '#e7f5ff' },
    logoutButton: { 
        display: 'flex', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', 
        padding: '10px', width: '100%', fontFamily: `'Segoe UI', sans-serif`, fontSize: '1rem', 
        color: '#333', gap: '8px', fontWeight: 500, borderRadius: '8px',
    },
    header: { display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '30px' },
    headerItem: { display: 'flex', alignItems: 'center', marginLeft: '20px', padding: '8px 12px', borderRadius: '8px', backgroundColor: '#e9ecef', fontSize: '0.9rem' },
    content: { backgroundColor: '#ffffff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', flex: 1 },
    contentHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', paddingBottom: '20px', borderBottom: '1px solid #e9ecef' },
    contentTitle: { fontSize: '2rem', fontWeight: 'bold' },
    actions: { display: 'flex', gap: '10px' },
    button: { padding: '10px 20px', border: '1px solid #ced4da', borderRadius: '8px', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 500, textDecoration: 'none' },
    buttonSave: { backgroundColor: '#0d6efd', color: 'white', border: 'none' },
    formGrid: { display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '25px', },
    formGroup: { display: 'flex', flexDirection: 'column', },
    label: { marginBottom: '8px', fontSize: '0.9rem', color: '#495057', fontWeight: 500, },
    requiredAsterisk: { color: '#dc3545', marginLeft: '2px', },
    input: { padding: '12px 15px', border: '1px solid #ced4da', borderRadius: '6px', fontSize: '1rem', backgroundColor: '#f8f9fa', },
    span3: { gridColumn: 'span 3' },
    span4: { gridColumn: 'span 4' },
    span12: { gridColumn: 'span 12' },
};

function ContasPagarIncluirPage() {
    const [isCadastrosOpen, setIsCadastrosOpen] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>(); 
    const isEditMode = !!id;
    
    // URL da API
    const API_URL = 'http://127.0.0.1:8000/api/contas-pagar/';

    const [formData, setFormData] = useState<ContaFormData>({
        prefixo: '', numeroTitulo: '', tipo: '', dataEmissao: '',
        fornecedor: '', valorTitulo: '', vencimento: '', status: 'Aberto'
    });

    const [user, setUser] = useState({ username: 'Usuário', email: 'carregando...' });
    const [isLoading, setIsLoading] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        navigate('/login');
    };

    // 1. Carregar Token e Dados da Conta (se edição)
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
                console.error("Token inválido:", error);
                handleLogout();
                return;
            }
        } else {
            handleLogout();
            return;
        }

        // Se estiver em modo de edição, buscar dados na API
        if (isEditMode && id) {
            setIsLoading(true);
            fetch(`${API_URL}${id}/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(async (response) => {
                if (!response.ok) throw new Error('Erro ao buscar conta');
                return response.json();
            })
            .then((data) => {
                // COMO O BACKEND JÁ RETORNA EM CAMELCASE (numeroTitulo, etc), 
                // NÃO PRECISAMOS DE TRADUÇÃO COMPLEXA.
                setFormData({
                    prefixo: data.prefixo,
                    numeroTitulo: data.numeroTitulo, 
                    tipo: data.tipo,
                    dataEmissao: data.dataEmissao,
                    fornecedor: data.fornecedor,
                    valorTitulo: data.valorTitulo,
                    vencimento: data.vencimento,
                    status: data.status
                });
            })
            .catch((error) => {
                console.error("Erro na API:", error);
                alert("Erro ao carregar dados da conta.");
                navigate('/contas_a_pagar');
            })
            .finally(() => setIsLoading(false));
        }
    }, [id, isEditMode, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // 2. Salvar (POST ou PUT na API)
    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const token = localStorage.getItem('authToken');
        if (!token) {
            alert("Sessão expirada");
            handleLogout();
            return;
        }

        // Preparar Payload:
        // Como o seu modelo Django usa nomes em camelCase (numeroTitulo, dataEmissao),
        // enviamos exatamente assim, sem converter para snake_case.
        const payload = {
            prefixo: formData.prefixo,
            numeroTitulo: formData.numeroTitulo, // Igual ao model
            tipo: formData.tipo,
            dataEmissao: formData.dataEmissao,   // Igual ao model
            fornecedor: formData.fornecedor,
            valorTitulo: formData.valorTitulo,   // Igual ao model
            vencimento: formData.vencimento,
            status: isEditMode ? formData.status : 'Aberto'
        };

        const method = isEditMode ? 'PUT' : 'POST';
        const url = isEditMode ? `${API_URL}${id}/` : API_URL;

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                alert(`Conta ${isEditMode ? 'alterada' : 'criada'} com sucesso!`);
                navigate('/contas_a_pagar');
            } else {
                const errorData = await response.json();
                console.error("Erro API:", errorData);
                const errorMsg = typeof errorData === 'object' ? JSON.stringify(errorData) : 'Erro ao salvar.';
                alert(`Erro ao salvar: ${errorMsg}`);
            }
        } catch (error) {
            console.error("Erro de rede:", error);
            alert("Erro de conexão com o servidor.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        navigate('/contas_a_pagar');
    };

    return (
        <div style={styles.pageContainer}>
            <aside style={styles.sidebar}>
                 <div style={styles.sidebarHeader}><h1 style={styles.logo}>CashFlow</h1></div>
                 <h2 style={styles.welcomeMessage}>Bem-Vindo, <br /> {user.username}!</h2>
                <nav style={styles.nav}>
                    <ul style={styles.navList}>
                        <li style={styles.navItem}><Link to="/dashboard" style={styles.navLink}>Dashboard</Link></li>
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
                        <li style={{...styles.navItem, ...styles.navItemActive}}><Link to="/contas_a_pagar" style={styles.navLink}>Contas a pagar</Link></li>
                        <li style={styles.navItem}><Link to="/contas_a_receber" style={styles.navLink}>Contas a receber</Link></li>
                        <li style={styles.navItem}><Link to="/configuracoes" style={styles.navLink}>Configurações</Link></li>
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
                    <form onSubmit={handleSave}>
                        <div style={styles.contentHeader}>
                            <h1 style={styles.contentTitle}>
                                {isEditMode ? 'Contas a Pagar - Alterar' : 'Contas a Pagar - Incluir'}
                            </h1>
                            <div style={styles.actions}>
                                <button type="button" onClick={handleCancel} style={styles.button} disabled={isLoading}>Cancelar</button>
                                <button type="submit" style={{...styles.button, ...styles.buttonSave}} disabled={isLoading}>
                                    {isLoading ? 'Salvando...' : 'Salvar'}
                                </button>
                            </div>
                        </div>
                        
                        <div style={styles.formGrid}>
                            {/* Linha 1 */}
                            <div style={{...styles.formGroup, ...styles.span3}}>
                                <label style={styles.label} htmlFor="prefixo">Prefixo</label>
                                <input style={styles.input} type="text" name="prefixo" id="prefixo" value={formData.prefixo} onChange={handleChange} />
                            </div>
                            <div style={{...styles.formGroup, ...styles.span3}}>
                                <label style={styles.label} htmlFor="numeroTitulo">Número do Título<span style={styles.requiredAsterisk}>*</span></label>
                                <input style={styles.input} type="text" name="numeroTitulo" id="numeroTitulo" value={formData.numeroTitulo} onChange={handleChange} required />
                            </div>
                            <div style={{...styles.formGroup, ...styles.span3}}>
                                <label style={styles.label} htmlFor="tipo">Tipo<span style={styles.requiredAsterisk}>*</span></label>
                                <input style={styles.input} type="text" name="tipo" id="tipo" value={formData.tipo} onChange={handleChange} required />
                            </div>
                            <div style={{...styles.formGroup, ...styles.span3}}>
                                <label style={styles.label} htmlFor="dataEmissao">Data Emissão<span style={styles.requiredAsterisk}>*</span></label>
                                <input style={styles.input} type="date" name="dataEmissao" id="dataEmissao" value={formData.dataEmissao} onChange={handleChange} required />
                            </div>

                            {/* Linha 2 */}
                            <div style={{...styles.formGroup, ...styles.span4}}>
                                <label style={styles.label} htmlFor="fornecedor">Fornecedor<span style={styles.requiredAsterisk}>*</span></label>
                                <input style={styles.input} type="text" name="fornecedor" id="fornecedor" value={formData.fornecedor} onChange={handleChange} required />
                            </div>
                            <div style={{...styles.formGroup, ...styles.span4}}>
                                <label style={styles.label} htmlFor="valorTitulo">Valor Título<span style={styles.requiredAsterisk}>*</span></label>
                                {/* O input type="number" ajuda na UX, mesmo que o backend receba como string */}
                                <input style={styles.input} type="number" step="0.01" name="valorTitulo" id="valorTitulo" value={formData.valorTitulo} onChange={handleChange} required />
                            </div>
                            <div style={{...styles.formGroup, ...styles.span4}}>
                                <label style={styles.label} htmlFor="vencimento">Vencimento<span style={styles.requiredAsterisk}>*</span></label>
                                <input style={styles.input} type="date" name="vencimento" id="vencimento" value={formData.vencimento} onChange={handleChange} required />
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default ContasPagarIncluirPage;