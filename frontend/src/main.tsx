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
    path: "/dashboard", // Quando a URL for /dashboard...
    element: <DashboardPage />, // ...mostre esta página
  },
  {
    path: "/cadastro_cliente",
    element: <ClientesPage />, // Página de cadastro de cliente
  },
   {
    path: "/cadastro_fornecedor",
    element: <FornecedoresPage />, // Página de cadastro de fornecedor
  },
  {
    path: "/cadastro_produto",
    element: <ProdutosPage />, // Página de cadastro de produto
  },
  {
    path: "/contas_a_pagar",
    element: <ContasAPagarPage />, // Página de contas a pagar
  },
]);

// 4. Inicia a aplicação com o sistema de rotas
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);