'use client'

import { useRouter } from "next/navigation";
import styles from './signOutButton.module.css'

const SignOutButton = ({removeHandler}) => {
    const router = useRouter()
    const Exit = async()=>{
        await removeHandler()
        router.push("/")
    }
    return (
        <div className={styles.buttonContainer}>
           <button onClick={Exit}>Sign out</button>  
        </div>
    );
};

export default SignOutButton;