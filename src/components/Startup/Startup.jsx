import styles from './Startup.module.scss';
import Button from '../../shared/buttons';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

function Startup (props) {
    // luodaan yhteys Google-kirjautumiseen
    const google = new GoogleAuthProvider();

    // käyttäjä valitsee tilin, jolla kirjautuu
    google.setCustomParameters({
        prompt : 'select_account '
    })

    // kytketään Google-kirjautuminen popup-kirjautumiseen
    const signInWithGooglePopup = () => signInWithPopup(props.auth, google);

    // kirjautumisnapin käsittelijä kutsuu auth-palvelun popup-
    // kirjautumiskäsittelijää, joka on kytketty Google-kirjautumiseen
    const signInGoogle = async () => {
        await signInWithGooglePopup();
    }

    return (
        <div className={styles.startup}>
            <h1>Taloudenhallinta</h1>
            <div>Tervetuloa käyttämään taloudenhallintasovellusta,
                 jolla voi seurata omia menoja.
            </div>
            <Button onClick={signInGoogle}>Kirjaudu Google-tunnuksilla</Button>
        </div>
    )
}

export default Startup;