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
import Profile from './pages/app/Profile.tsx';
import { FocusProvider } from './context/FocusContext.tsx';
import ProtectedRoute from './routes/ProtectedRoute.tsx';
import PublicRoute from './routes/PublicRoute.tsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ForgotPassword from './pages/ForgotPassword.tsx';
import ResetPassword from './pages/ResetPassword.tsx';

const theme: string | null = localStorage.getItem("theme");
if (theme === "dark") {
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
        element: (
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        )
      },
      {
        path: 'forgot-password',
        element: (
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        ),
      },
      {
        path: 'reset-password',
        element: (
          <PublicRoute>
            <ResetPassword />
          </PublicRoute>
        ),
      },
      {
        path: "*",
        element: <NotFound />
      },
    ],
  },
  {
    path: '/app',
    element: (
      <ProtectedRoute>
        <FocusProvider>
          <AppLayout />
        </FocusProvider>
      </ProtectedRoute>
    ),
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
      },
      {
        path: 'profile',
        element: <Profile />
      },
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <DarkModeProvider>
        <RouterProvider router={router} />
      </DarkModeProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
)