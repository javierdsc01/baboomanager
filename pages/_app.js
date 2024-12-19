// pages/_app.js
import RootLayout from '@/app/layout2';
import '@/app/globals.css';


function MyApp({ Component, pageProps }) {

    return (
        <RootLayout>
            <Component {...pageProps} />
        </RootLayout>
    );
}

export default MyApp;
