import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from '../components/layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './login';
import RegisterPage from './register';

export default function MyApp({ Component, pageProps }: any) {
  const [hasWindow, setHasWindow] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);

  return (
    hasWindow ? (
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Component {...pageProps} />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Layout>
      </Router>
    ) : null
  );
}