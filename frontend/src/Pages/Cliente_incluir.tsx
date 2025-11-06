import React, { useState, useEffect } from 'react';
// 1. IMPORTAR 'useParams' E 'jwtDecode'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

// --- TIPAGEM ---
type StyleObject = React.CSSProperties;

// 2. ADICIONAR INTERFACE DO TOKEN
interface TokenPayload {
    username: string;
    email: string;
}

// Tipagem para os dados do formulário
type ClienteFormData = {
  codigo: string;
  razaoSocial: string;
  nomeFantasia: string;
  endereco: string;
  bairro: string;
  cidade: string;
  cep: string;
  estado: string;
  cpfCnpj: string;
  telefone: string;
  inscricaoEstadual: string;
  email: string;
  tipoPessoa: string;
  tipo: string;
};

// Tipagem do Cliente (com ID)
type Cliente = ClienteFormData & {
  id: string;
};

// --- ÍCONES SVG ---
const BellIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>;
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const ArrowLeftIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>;
const ChevronDownIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>;

// --- ESTILOS DO COMPONENTE ---
const styles: { [key: string]: StyleObject } = {
    // ... (Seus estilos) ...
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
    
    // --- 3. ESTILO DO BOTÃO DE LOGOUT ATUALIZADO ---
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
    span2: { gridColumn: 'span 2' },
    span3: { gridColumn: 'span 3' },
    span4: { gridColumn: 'span 4' },
    span5: { gridColumn: 'span 5' },
    span6: { gridColumn: 'span 6' },
};

function ClientesIncluirPage() {
    const [isCadastrosOpen, setIsCadastrosOpen] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const isEditMode = !!id;

    const [formData, setFormData] = useState<ClienteFormData>({
      codigo: '', razaoSocial: '', nomeFantasia: '',
      endereco: '', bairro: '', cidade: '',
      cep: '', estado: '', cpfCnpj: '',
      telefone: '', inscricaoEstadual: '',
      email: '', tipoPessoa: '', tipo: '',
    });

    // --- 4. ADICIONAR LÓGICA DO USUÁRIO E LOGOUT ---
    const [user, setUser] = useState({ username: 'Usuário', email: 'carregando...' });

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        navigate('/login');
    };

    // Este useEffect agora faz as duas coisas:
    // 1. Carrega os dados do usuário do token
    // 2. Carrega os dados do cliente (se estiver em modo de edição)
    useEffect(() => {
        // Lógica do Token
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
                handleLogout(); // Desloga se o token for inválido
            }
        } else {
            handleLogout(); // Desloga se não houver token
        }

        // Lógica para carregar dados do formulário (modo de edição)
        if (isEditMode && id) {
            const clientesSalvos = localStorage.getItem('clientes') || '[]';
            const clientes: Cliente[] = JSON.parse(clientesSalvos);
            const clienteParaEditar = clientes.find(c => c.id === id);
            
            if (clienteParaEditar) {
                setFormData(clienteParaEditar);
            } else {
                alert("Cliente não encontrado!");
                navigate('/cadastro_cliente');
            }
        }
    }, [id, isEditMode, navigate]); // Dependências do Effect


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const clientesSalvos = localStorage.getItem('clientes') || '[]';
            const clientes: Cliente[] = JSON.parse(clientesSalvos);

            if (isEditMode) {
                const index = clientes.findIndex(c => c.id === id);
                if (index === -1) throw new Error("Cliente não encontrado");
                const clienteAtualizado: Cliente = { ...formData, id: id! };
                clientes[index] = clienteAtualizado;
                localStorage.setItem('clientes', JSON.stringify(clientes));
                alert("Cliente alterado com sucesso!");
            } else {
                const novoCliente: Cliente = { ...formData, id: crypto.randomUUID() };
                clientes.push(novoCliente);
                localStorage.setItem('clientes', JSON.stringify(clientes));
                alert("Cliente salvo com sucesso!");
            }
            navigate('/cadastro_cliente');
        } catch (error) {
            console.error("Erro ao salvar no localStorage:", error);
            alert("Ocorreu um erro ao salvar o cliente.");
        }
    };

    const handleCancel = () => {
        navigate('/cadastro_cliente');
    };

    return (
        <div style={styles.pageContainer}>
            <aside style={styles.sidebar}>
                 <div style={styles.sidebarHeader}><h1 style={styles.logo}>CashFlow</h1></div>
                 {/* 5. ATUALIZAR MENSAGEM DE BOAS-VINDAS */}
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
                {/* 6. ATUALIZAR BOTÃO DE LOGOUT */}
                <button onClick={handleLogout} style={styles.logoutButton}><ArrowLeftIcon /> <span>Sair</span></button>
            </aside>

            <main style={styles.mainContent}>
                <header style={styles.header}>
                    <div style={styles.headerItem}>Empresa / Filial</div>
                    <div style={styles.headerItem}><BellIcon /></div>
                    {/* 7. ATUALIZAR HEADER COM DADOS DO USUÁRIO */}
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
                                {isEditMode ? 'Clientes - Alterar' : 'Clientes - Incluir'}
                            </h1>
                            <div style={styles.actions}>
                                <button type="button" onClick={handleCancel} style={styles.button}>Cancelar</button>
                                <button type="submit" style={{...styles.button, ...styles.buttonSave}}>Salvar</button>
                            </div>
                        </div>
                        
                        <div style={styles.formGrid}>
                            {/* ... (O resto do seu formulário não muda) ... */}
                            <div style={{...styles.formGroup, ...styles.span2}}>
                                <label style={styles.label} htmlFor="codigo">Código<span style={styles.requiredAsterisk}>*</span></label>
                                <input style={styles.input} type="text" name="codigo" id="codigo" value={formData.codigo} onChange={handleChange} required />
                            </div>
                            <div style={{...styles.formGroup, ...styles.span5}}>
                                <label style={styles.label} htmlFor="razaoSocial">Razão Social<span style={styles.requiredAsterisk}>*</span></label>
                                <input style={styles.input} type="text" name="razaoSocial" id="razaoSocial" value={formData.razaoSocial} onChange={handleChange} required />
                            </div>
                            <div style={{...styles.formGroup, ...styles.span5}}>
                                <label style={styles.label} htmlFor="nomeFantasia">Nome Fantasia</label>
                                <input style={styles.input} type="text" name="nomeFantasia" id="nomeFantasia" value={formData.nomeFantasia} onChange={handleChange} />
                            </div>
                            <div style={{...styles.formGroup, ...styles.span5}}>
                                <label style={styles.label} htmlFor="endereco">Endereço<span style={styles.requiredAsterisk}>*</span></label>
                                <input style={styles.input} type="text" name="endereco" id="endereco" value={formData.endereco} onChange={handleChange} required />
                            </div>
                            <div style={{...styles.formGroup, ...styles.span3}}>
                                <label style={styles.label} htmlFor="bairro">Bairro</label>
                                <input style={styles.input} type="text" name="bairro" id="bairro" value={formData.bairro} onChange={handleChange} />
                            </div>
                            <div style={{...styles.formGroup, ...styles.span4}}>
                                <label style={styles.label} htmlFor="cidade">Cidade<span style={styles.requiredAsterisk}>*</span></label>
                                <input style={styles.input} type="text" name="cidade" id="cidade" value={formData.cidade} onChange={handleChange} required />
                            </div>
                            <div style={{...styles.formGroup, ...styles.span2}}>
                                <label style={styles.label} htmlFor="cep">CEP</label>
                                <input style={styles.input} type="text" name="cep" id="cep" value={formData.cep} onChange={handleChange} />
                            </div>
                            <div style={{...styles.formGroup, ...styles.span2}}>
                                <label style={styles.label} htmlFor="estado">Estado<span style={styles.requiredAsterisk}>*</span></label>
                                <input style={styles.input} type="text" name="estado" id="estado" value={formData.estado} onChange={handleChange} required />
                            </div>
                            <div style={{...styles.formGroup, ...styles.span3}}>
                                <label style={styles.label} htmlFor="cpfCnpj">CPF/CNPJ<span style={styles.requiredAsterisk}>*</span></label>
                                <input style={styles.input} type="text" name="cpfCnpj" id="cpfCnpj" value={formData.cpfCnpj} onChange={handleChange} required />
                            </div>
                            <div style={{...styles.formGroup, ...styles.span2}}>
                                <label style={styles.label} htmlFor="telefone">Telefone</label>
                                <input style={styles.input} type="text" name="telefone" id="telefone" value={formData.telefone} onChange={handleChange} />
                            </div>
                            <div style={{...styles.formGroup, ...styles.span3}}>
                                <label style={styles.label} htmlFor="inscricaoEstadual">Inscrição Estadual</label>
                                <input style={styles.input} type="text" name="inscricaoEstadual" id="inscricaoEstadual" value={formData.inscricaoEstadual} onChange={handleChange} />
                            </div>
                            <div style={{...styles.formGroup, ...styles.span6}}>
                                <label style={styles.label} htmlFor="email">E-mail</label>
                                <input style={styles.input} type="email" name="email" id="email" value={formData.email} onChange={handleChange} />
                            </div>
                            <div style={{...styles.formGroup, ...styles.span3}}>
                                <label style={styles.label} htmlFor="tipoPessoa">Física/Jurídica</label>
                                <input style={styles.input} type="text" name="tipoPessoa" id="tipoPessoa" value={formData.tipoPessoa} onChange={handleChange} />
                            </div>
                            <div style={{...styles.formGroup, ...styles.span3}}>
                                <label style={styles.label} htmlFor="tipo">Tipo</label>
                                <input style={styles.input} type="text" name="tipo" id="tipo" value={formData.tipo} onChange={handleChange} />
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default ClientesIncluirPage;