import axios from "axios";

const LIBRE_TRANSLATE_URL = "https://libretranslate.com/translate";

export const libreTranslate = async (text, targetLang = "hi") => {
  try {
    const response = await axios.post(LIBRE_TRANSLATE_URL, {
      q: text,
      source: "en",
      target: targetLang,
      format: "text"
    });

    return response.data.translatedText;
  } catch (error) {
    console.error("LibreTranslate Error:", error);
    return text;
  }
};