import React from 'react';
import ReactDOM from 'react-dom/client';
import { 
    createBrowserRouter, 
    RouterProvider, 
    Outlet, // Componente chave para rotas aninhadas
    Navigate  // Componente chave para redirecionar
} from 'react-router-dom';

// 1. Importa suas páginas
import LoginPage from './Pages/LoginPage.tsx'; 
import DashboardPage from './Pages/DashboardPage.tsx';
import ClientesPage from './Pages/Cadastro_cliente.tsx';
import FornecedoresPage from './Pages/Cadastro_fornecedor.tsx';
import ProdutosPage from './Pages/Cadastro_produto.tsx';
import ContasAPagarPage from './Pages/Contas_pagar.tsx';
import ForgotPasswordPage from './Pages/Forgot_password.tsx';
import ContasAReceberPage from './Pages/Contas_receber.tsx';
import ClientesIncluirPage from './Pages/Cliente_incluir.tsx';
import FornecedoresIncluirPage from './Pages/Fornecedores_Incluir.tsx';
import ProdutosIncluirPage from './Pages/Produto_incluir.tsx';
import ContasPagarIncluirPage from './Pages/ContasPagarIncluir.tsx';
import ContasReceberIncluirPage from './Pages/ContasReceberIncluir.tsx';
import ConfiguracoesPage from './Pages/Configuracoes.tsx';

// 2. Componente de Rota Protegida (O "Guarda")
const ProtectedRoute = () => {
    // Verifica se existe um token salvo no localStorage
    const token = localStorage.getItem('authToken');

    if (!token) {
        // Se NÃO houver token, redireciona para a página de login
        return <Navigate to="/login" replace />;
    }

    // Se houver token, renderiza a página filha (Dashboard, Clientes, etc.)
    return <Outlet />;
};

// 3. Componente de Rota Pública (O "Guarda" do Login)
const PublicRoute = () => {
    const token = localStorage.getItem('authToken');
    // Se JÁ TIVER token, redireciona para o dashboard
    return token ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

// 4. Cria o "mapa" de rotas ATUALIZADO
const router = createBrowserRouter([
  // --- Grupo de Rotas Públicas ---
  // (Se o usuário estiver logado, ele é expulso de volta para o /dashboard)
  {
    element: <PublicRoute />,
    children: [
        { path: "/", element: <LoginPage /> },
        { path: "/login", element: <LoginPage /> },
        { path: "/Forgot_pass", element: <ForgotPasswordPage /> }
    ]
  },

  // --- Grupo de Rotas Protegidas ---
  // (Se o usuário NÃO estiver logado, ele é expulso de volta para o /login)
  {
    element: <ProtectedRoute />, 
    children: [
      { path: "/dashboard", element: <DashboardPage /> },
      // Clientes
      { path: "/cadastro_cliente", element: <ClientesPage /> },
      { path: "/cadastro_cliente/novo", element: <ClientesIncluirPage /> },
      { path: "/cadastro_cliente/editar/:id", element: <ClientesIncluirPage /> },
      // Fornecedores
      { path: "/cadastro_fornecedor", element: <FornecedoresPage /> },
      { path: "/cadastro_fornecedor/novo", element: <FornecedoresIncluirPage /> },
      { path: "/cadastro_fornecedor/editar/:id", element: <FornecedoresIncluirPage /> },
      // Produtos
      { path: "/cadastro_produto", element: <ProdutosPage /> },
      { path: "/cadastro_produto/novo", element: <ProdutosIncluirPage /> },
      { path: "/cadastro_produto/editar/:id", element: <ProdutosIncluirPage /> },
      // Contas a Pagar
      { path: "/contas_a_pagar", element: <ContasAPagarPage /> },
      { path: "/contas_a_pagar/novo", element: <ContasPagarIncluirPage /> },
      { path: "/contas_a_pagar/editar/:id", element: <ContasPagarIncluirPage /> },
      // Contas a Receber
      { path: "/contas_a_receber", element: <ContasAReceberPage /> },
      { path: "/contas_a_receber/novo", element: <ContasReceberIncluirPage /> },
      { path: "/contas_a_receber/editar/:id", element: <ContasReceberIncluirPage /> },
      { path: "/configuracoes", element: <ConfiguracoesPage /> }
    ]
  }
]);

// 5. Inicia a aplicação
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);