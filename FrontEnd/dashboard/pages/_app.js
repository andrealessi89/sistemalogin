import { AuthProvider } from '../context/AuthContext';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../styles/theme';
import 'react-toastify/dist/ReactToastify.css'; // Importe o CSS do react-toastify
import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider theme={theme}>
            <AuthProvider>
                <Component {...pageProps} />
                <ToastContainer />
            </AuthProvider>
        </ThemeProvider>
    );
}

export default MyApp;
