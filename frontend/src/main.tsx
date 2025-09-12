import React from 'react';
import ReactDOM from 'react-dom/client';
// 1. Importa as ferramentas de roteamento
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// 2. Importa suas páginas (verifique se os caminhos estão corretos)
import LoginPage from './Pages/LoginPage.tsx'; 
import DashboardPage from './Pages/DashboardPage.tsx';

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
]);

// 4. Inicia a aplicação com o sistema de rotas
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);