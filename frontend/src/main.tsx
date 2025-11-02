import React from 'react';
import ReactDOM from 'react-dom/client';
// 1. Importa as ferramentas de roteamento
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// 2. Importa suas páginas (verifique se os caminhos estão corretos)
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

// 3. Cria o "mapa" de rotas
const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />, // A página inicial será o login
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/Forgot_pass",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/dashboard", // Quando a URL for /dashboard...
    element: <DashboardPage />, // ...mostre esta página
  },
  {
    path: "/cadastro_cliente",
    element: <ClientesPage />, // Página de cadastro de cliente
  },
  {
    path: "/cadastro_cliente/novo",
    element: <ClientesIncluirPage />, // Página para incluir novo cliente
  },
  {
    path: "/cadastro_cliente/editar/:id", 
    element: <ClientesIncluirPage />,
  },
  {
    path: "/cadastro_fornecedor",
    element: <FornecedoresPage />, // Página de cadastro de fornecedor
  },
  {
    path: "/cadastro_fornecedor/novo",
    element: <FornecedoresIncluirPage />,
  },
  {
    path: "/cadastro_fornecedor/editar/:id",
    element: <FornecedoresIncluirPage />,
  },
  {
    path: "/cadastro_produto",
    element: <ProdutosPage />, // Página de cadastro de produto
  },

  {
    path: "/cadastro_produto/novo",
    element: <ProdutosIncluirPage />,
  },
  {
    path: "/cadastro_produto/editar/:id",
    element: <ProdutosIncluirPage />,
  },
  {
    path: "/contas_a_pagar",
    element: <ContasAPagarPage />, // Página de contas a pagar
  },
  {
    path: "/contas_a_pagar/novo",
    element: <ContasPagarIncluirPage />,
  },
  {
    path: "/contas_a_pagar/editar/:id",
    element: <ContasPagarIncluirPage />,
  },
  {
    path: "/contas_a_receber",
    element: <ContasAReceberPage />, // Página de contas a receber
  },
  {
    path: "/contas_a_receber/novo",
    element: <ContasReceberIncluirPage />,
  },
  {
    path: "/contas_a_receber/editar/:id",
    element: <ContasReceberIncluirPage />,
  },
]);

// 4. Inicia a aplicação com o sistema de rotas
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);