import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import './index.css';
import Landinglayout from './layout/Landinglayout.tsx';
import About from './pages/About.tsx';
import Welcome from './pages/Welcome.tsx';
import Error from './pages/Error.tsx';
import { DarkModeProvider } from './context/DarkModeContext.tsx';
import Guide from './pages/Guide.tsx';
import Contact from './pages/Contact.tsx';
import SignUp from './pages/SignUp.tsx';
import NotFound from './pages/NotFound.tsx';
import AppLayout from './layout/AppLayout.tsx';
import Overview from './pages/app/Overview.tsx';
import Focus from './pages/app/Focus.tsx';
import Tasks from './pages/app/Tasks.tsx';
import Analytics from './pages/app/Analytics.tsx';

const theme: string | null = localStorage.getItem("theme");
if (theme == "dark") {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landinglayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Welcome />
      },
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'guide',
        element: <Guide />
      },
      {
        path: 'contact',
        element: <Contact />
      },
      {
        path: 'signup',
        element: <SignUp />
      },
      {
        path: "*",
        element: <NotFound />
      },

    ],
  },
  {
    path: '/app',
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Overview />
      },
      {
        path: 'focus',
        element: <Focus />
      },
      {
        path: 'tasks',
        element: <Tasks />
      },
      {
        path: 'analytics',
        element: <Analytics />
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
