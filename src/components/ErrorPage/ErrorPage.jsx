import styles from './ErrorPage.module.scss';
import { useRouteError } from 'react-router-dom';

function ErrorPage() {
    const error = useRouteError();
    return (
        <div className={styles.errorpage}>
            <h2>Hups!</h2>
            <p>Tapahtui odottamaton virhe.</p>
            <p>{error.statusText || error.message}</p>
        </div>
    );
}

export default ErrorPage;