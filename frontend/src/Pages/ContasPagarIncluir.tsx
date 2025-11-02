import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

// --- TIPAGEM ---
type StyleObject = React.CSSProperties;

// Tipagem para os dados do formulário
type ContaFormData = {
  prefixo: string;
  numeroTitulo: string;
  tipo: string;
  dataEmissao: string;
  fornecedor: string;
  valorTitulo: string;
  vencimento: string;
};

// Tipagem da Conta (com ID e Status)
type Conta = ContaFormData & {
  id: string;
  status: 'Aberto' | 'Pago' | 'Vencido'; // Status correto
};

// --- ÍCONES SVG ---
const BellIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>;
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const ArrowLeftIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>;
const ChevronDownIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>;

// --- ESTILOS DO COMPONENTE ---
const styles: { [key: string]: StyleObject } = {
    // Layout Principal
    pageContainer: { display: 'flex', width: '100vw', height: '100vh', backgroundColor: '#f0f2f5', fontFamily: `'Segoe UI', sans-serif`, color: '#333' },
    sidebar: { width: '280px', backgroundColor: '#ffffff', padding: '20px', display: 'flex', flexDirection: 'column', borderRight: '1px solid #e0e0e0' },
    mainContent: { flex: 1, display: 'flex', flexDirection: 'column', padding: '20px 40px', overflowY: 'auto' },
    
    // Sidebar
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
    logoutButton: { display: 'flex', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', padding: '10px' },
    
    // Header Principal
    header: { display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '30px' },
    headerItem: { display: 'flex', alignItems: 'center', marginLeft: '20px', padding: '8px 12px', borderRadius: '8px', backgroundColor: '#e9ecef', fontSize: '0.9rem' },
    
    // Conteúdo (Formulário)
    content: { backgroundColor: '#ffffff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', flex: 1 },
    contentHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', paddingBottom: '20px', borderBottom: '1px solid #e9ecef' },
    contentTitle: { fontSize: '2rem', fontWeight: 'bold' },
    actions: { display: 'flex', gap: '10px' },
    button: { padding: '10px 20px', border: '1px solid #ced4da', borderRadius: '8px', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 500, textDecoration: 'none' },
    buttonSave: { backgroundColor: '#0d6efd', color: 'white', border: 'none' },
    
    // Grid do Formulário
    formGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gap: '25px',
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        marginBottom: '8px',
        fontSize: '0.9rem',
        color: '#495057',
        fontWeight: 500,
    },
    requiredAsterisk: {
        color: '#dc3545',
        marginLeft: '2px',
    },
    input: {
        padding: '12px 15px',
        border: '1px solid #ced4da',
        borderRadius: '6px',
        fontSize: '1rem',
        backgroundColor: '#f8f9fa',
    },
    // Spans do Grid
    span3: { gridColumn: 'span 3' },
    span4: { gridColumn: 'span 4' },
    span12: { gridColumn: 'span 12' },
};

function ContasPagarIncluirPage() {
    const [isCadastrosOpen, setIsCadastrosOpen] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const isEditMode = !!id;
    const storageKey = 'contas_a_pagar';

    const [formData, setFormData] = useState<ContaFormData>({
      prefixo: '',
      numeroTitulo: '',
      tipo: '',
      dataEmissao: '',
      fornecedor: '',
      valorTitulo: '',
      vencimento: '',
    });

    // Carrega dados para edição
    useEffect(() => {
        if (isEditMode && id) {
            const contasSalvas = localStorage.getItem(storageKey) || '[]';
            const contas: Conta[] = JSON.parse(contasSalvas);
            const contaParaEditar = contas.find(c => c.id === id);
            
            if (contaParaEditar) {
                setFormData(contaParaEditar);
            } else {
                alert("Conta não encontrada!");
                navigate('/contas_a_pagar');
            }
        }
    }, [id, isEditMode, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Salva (Inclui ou Altera)
    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            const contasSalvas = localStorage.getItem(storageKey) || '[]';
            const contas: Conta[] = JSON.parse(contasSalvas);

            if (isEditMode) {
                // Alterar
                const index = contas.findIndex(c => c.id === id);
                if (index === -1) throw new Error("Conta não encontrada");
                
                // Mantém o status original ao editar
                const statusOriginal = contas[index].status;
                const contaAtualizada: Conta = { ...formData, id: id!, status: statusOriginal };
                contas[index] = contaAtualizada;
                
                localStorage.setItem(storageKey, JSON.stringify(contas));
                alert("Conta alterada com sucesso!");

            } else {
                // Incluir
                const novaConta: Conta = {
                    ...formData,
                    id: crypto.randomUUID(),
                    status: 'Aberto' // Define o status padrão
                };
                contas.push(novaConta);
                localStorage.setItem(storageKey, JSON.stringify(contas));
                alert("Conta salva com sucesso!");
            }
            
            navigate('/contas_a_pagar');

        } catch (error) {
            console.error("Erro ao salvar no localStorage:", error);
            alert("Ocorreu um erro ao salvar a conta.");
        }
    };

    const handleCancel = () => {
        navigate('/contas_a_pagar');
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
                        {/* Item Ativo Atualizado */}
                        <li style={{...styles.navItem, ...styles.navItemActive}}><Link to="/contas-a-pagar" style={styles.navLink}>Contas a pagar</Link></li>
                        <li style={styles.navItem}><Link to="/contas-a-receber" style={styles.navLink}>Contas a receber</Link></li>
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
                    <form onSubmit={handleSave}>
                        <div style={styles.contentHeader}>
                            <h1 style={styles.contentTitle}>
                                {isEditMode ? 'Contas a Pagar - Alterar' : 'Contas a Pagar - Incluir'}
                            </h1>
                            <div style={styles.actions}>
                                <button type="button" onClick={handleCancel} style={styles.button}>Cancelar</button>
                                <button type="submit" style={{...styles.button, ...styles.buttonSave}}>Salvar</button>
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
                                <input style={styles.input} type="text" name="valorTitulo" id="valorTitulo" value={formData.valorTitulo} onChange={handleChange} required />
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