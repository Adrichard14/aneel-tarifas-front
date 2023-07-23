import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from '../components/layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import IndexPage from '.';
import LoginPage from './login';

export default function MyApp({ Component, pageProps }: any) {
  return (
    typeof window !== 'undefined' ? (
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Component {...pageProps} />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Layout>
      </Router>
    ) : null
  );
}