import Layout from '../components/layout'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function MyApp({ Component, pageProps }: any) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}