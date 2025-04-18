// src/utils/translate.js
export const translateText = async (text) => {
  const apiKey = 'AIzaSyDrPW0aNZVzF1AKc6Yt42ezdSZy_bVvflE'; // Replace with your actual API key
  const url = `https://translation.googleapis.com/language/translate/v2`;

  const body = {
    q: text,
    target: 'mr', // Marathi language code
    key: apiKey
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  const data = await response.json();

  if (response.ok) {
    return data.data.translations[0].translatedText;
  } else {
    throw new Error(data.error.message);
  }
};
