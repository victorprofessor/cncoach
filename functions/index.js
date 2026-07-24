const { onCall, HttpsError } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const textToSpeech = require("@google-cloud/text-to-speech");

// Autentica sozinho pela service account da função (ADC). Sem chave de API.
const client = new textToSpeech.TextToSpeechClient();

exports.synthesizeSpeech = onCall(
  {
    region: "southamerica-east1",
    memory: "256MiB",
    timeoutSeconds: 30,
  },
  async (request) => {
    if (!request.auth) {
      throw new HttpsError("unauthenticated", "Precisa estar logado.");
    }

    const { text, voice, languageCode, speakingRate, pitch } =
      request.data || {};

    if (!text || typeof text !== "string" || !text.trim()) {
      throw new HttpsError("invalid-argument", "Texto vazio.");
    }
    if (text.length > 5000) {
      throw new HttpsError("invalid-argument", "Texto muito longo.");
    }

    try {
      const [response] = await client.synthesizeSpeech({
        input: { text },
        voice: {
          languageCode: languageCode || "pt-BR",
          name: voice || "pt-BR-Wavenet-B",
        },
        audioConfig: {
          audioEncoding: "MP3",
          speakingRate: speakingRate ?? 1.0,
          pitch: pitch ?? 0.0,
        },
      });

      const audioBase64 = Buffer.from(response.audioContent).toString("base64");
      return { audioContent: audioBase64 };
    } catch (err) {
      logger.error("Erro no TTS", err);
      throw new HttpsError("internal", "Erro ao gerar áudio.");
    }
  }
);