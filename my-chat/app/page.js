import checkPermission from '@/utils/checkUserAccessbility';
import styles from './page.module.css'
import Register from '@/components/templates/Register';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const RegisterPage = async() => {
   const user = await checkPermission(cookies)
   if(user){
    redirect("/chat")
   }
   
   

  return (
    <div className={styles.mainContainer}>
      <Register />
    </div>
  );
};

export default RegisterPage;

