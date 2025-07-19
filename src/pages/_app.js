import { GoogleOAuthProvider } from '@react-oauth/google';
import { useEffect, useState } from 'react';
import '@/styles/globals.css';
import '@fontsource/montserrat';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useRouter } from 'next/router';
import AppSidebar from "@/components/custom/sidebar";
import Layout from "@/components/custom/layout";
import { AlertDialogProvider } from '@/components/custom/alert.jsx';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isLoginPage = router.pathname === '/login/login';

  return (
    <GoogleOAuthProvider clientId="847674728805-dm3f6ed36u265kk6lc0alrc2sjml78ea.apps.googleusercontent.com">
      <AlertDialogProvider>
        {isLoginPage ? (
          <Component {...pageProps} />
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </AlertDialogProvider>
    </GoogleOAuthProvider>
  );
}