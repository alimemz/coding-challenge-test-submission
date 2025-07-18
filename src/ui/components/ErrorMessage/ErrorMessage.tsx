import styles from './ErrorMessage.module.css';

const ErrorMessage: React.FC<{ error?: string }> = ({ error }) => {
   if (!error) return null;

   return (
      <div className={styles.error} role='alert'>
         {error}
      </div>
   );
};

export default ErrorMessage;
