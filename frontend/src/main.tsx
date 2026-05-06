import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import './index.css';
import AppLayout from './layout/AppLayout.tsx';
import About from './pages/About.tsx';
import Welcome from './pages/Welcome.tsx';
import Error from './pages/Error.tsx';
import { DarkModeProvider } from './context/DarkModeContext.tsx';

const theme: string | null = localStorage.getItem("theme");
if (theme == "dark") {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Welcome />
      },
      {
        path: 'about',
        element: <About />
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DarkModeProvider>
      <RouterProvider router={router} />
    </DarkModeProvider>
  </StrictMode>,
)
