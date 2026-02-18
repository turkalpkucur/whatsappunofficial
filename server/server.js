import { Client } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import axios from "axios";
import https from "https";
import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
// WhatsApp Web client oluştur
const client = new Client({
  puppeteer: {
    headless: false, // tarayıcıyı görünür aç
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
});

// QR kod çıktığında terminalde göster
client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
  console.log("QR kodu telefonundan okut! (WhatsApp uygulaması → Bağlı cihazlar → Cihaz bağla)");
});

// Bağlantı kurulduğunda
client.on("ready", () => {
  console.log("WhatsApp Client hazır!");
});

// Gelen mesajları dinle
client.on("message", async (message) => {
  console.log(`Mesaj geldi:  ${message.body}`);


  ////lead mesaj atacak
  

  // Basit otomatik cevap örneği
//  if (message.body.toLowerCase() === "merhaba") {
    message.reply("Merhaba! CRM demo botundan cevabbbbbbbbbbb");
//  }


////await sendMessageToApi(message.body);
});

// CRM’den mesaj göndermek için fonksiyon
export async function sendMessageToCustomer(number, text) {
  // Eğer @c.us yoksa ekle
  const chatId = number.includes("@c.us") ? number : number + "@c.us";
  client.sendMessage(chatId, text);
}

 
// Client başlat
client.initialize();

 
// setTimeout(() => {
     
//   sendMessageToCustomer(number, text);
// }, 30000);


 

app.post("/send-message", async (req, res) => {
  try {
    const {firstName, lastName, number, text } = req.body;

    if (!number || !text) {
      return res.status(400).json({ error: "number ve text zorunlu" });
    }

    await sendMessageToCustomer(number,text);
    await sendMessageToApi(firstName, lastName,number, text);

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Mesaj gönderilemedi" });
  }
});

async function sendMessageToApi(firstName,lastName,number,messageText) {
  try {
    const response = await axios.post(
      `https://localhost:7191/api/WPMessages/WebhookSendMessageUnofficial?message=${encodeURIComponent(messageText)}&phoneNumber=${encodeURIComponent(number)}&firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}`,
      {}, // body boş
      {
        httpsAgent: new https.Agent({
          rejectUnauthorized: false, // localhost self-signed SSL için
        }),
      }
    );

    console.log("Başarılı:", response.data);
  } catch (error) {
    console.error("Hata:", error.response?.data || error.message);
  }
}

app.listen(5000, () => {
  console.log("Express server 5000 portunda çalışıyor");
});
 