import React, { useState, useEffect } from 'react';
import '../App.css'; // Import the CSS file

function Languages() {
  const [language, setLanguage] = useState('Welcome');
  const [fade, setFade] = useState(true);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const languages = ['Bienvenida', 'Välkommen', '欢迎欢迎', '환영합니다', 'Bem-vindo', '환영합니다', 'Welcome'];
    let i = 0;
    const intervalId = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setVisible(false);
        setLanguage(languages[i]);
        setVisible(true);
        setFade(true);
        i = (i + 1) % languages.length;
      }, 500); // Wait for the fade out before changing the text
    }, 3000); // Change every 2 seconds

    return () => clearInterval(intervalId); // This is to clear the interval when the component unmounts
  }, []);

  return (
    <h1 className={`text-9xl text-[#313639] -mb-24 ${fade ? 'fade' : 'fade-out'}`} style={{ visibility: visible ? 'visible' : 'hidden' }}>{language}</h1>
  );
}

export default Languages;