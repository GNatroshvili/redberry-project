// import React from 'react'
// import styles from "./Button.module.css"

// type Props = {
//   title : any,
// }

// const Button = ( { title } : Props ) => {
//   return (
//     <div>
//       <button className={styles.button}>
//         <img src="/add-icon.svg" alt="plus-icon" />
//         {title}
//       </button>
//     </div>
//   )
// }

// export default Button

import React from 'react';
import styles from "./Button.module.css";
import Link from 'next/link'; 

type Props = {
  title: React.ReactNode; 
  href: string;
};

const Button = ({ title, href }: Props) => {
  return (
    <div>
      <Link href={"/Tasks"} className={styles.link}> 
        <button className={styles.button}>
          <img src="/add-icon.svg" alt="plus-icon" />
          {title}
        </button>
      </Link>
    </div>
  );
};

export default Button;