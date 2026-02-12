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

// Örnek kullanım: CRM’den tetiklenmiş mesaj
setTimeout(() => {
     
  sendMessageToCustomer("38977863796", "selam makedonyalı!");
}, 30000);


app.post("/send-message-to-api", async (req, res) => {
  try {
    const { number, text } = req.body;

    if (!number || !text) {
      return res.status(400).json({ error: "number ve text zorunlu" });
    }

    await sendMessageToApi(text);

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Mesaj gönderilemedi" });
  }
});

app.post("/send-message", async (req, res) => {
  try {
    const { number, text } = req.body;

    if (!number || !text) {
      return res.status(400).json({ error: "number ve text zorunlu" });
    }

    await sendMessageToCustomer(number, text);

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Mesaj gönderilemedi" });
  }
});

async function sendMessageToApi(messageText) {
  try {
    const response = await axios.post(
      `https://localhost:7191/api/WPMessages/sendwhatsappmessage?message=${encodeURIComponent(messageText)}`,
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
//905338541810   -- kıbrıs hattım
//38977863796


/*
Makedonya hattını infotec test ortamında 3. WA numaramız olarak kaydet. 


Buraya bir metdo yaz. Bir mesaj geldiğinde Webhoktan gelmiş gibi hareket et. Önceden bu numara ve bu hat üzerinden lead/sohbet var ise 
devamke yok ise yeni lead ve lead conversation oluştur.
(lead oluşturken mesaj kaydı, histoery kaydı vs vs oluştur)


İkinci metodda ise sen bu müşteriye aPI üzerinden cevap yazan bir API yaz.
-yeni leadconversation oluşturdun ya. Onu ve mesajı parametrea lan bir API yaz.
 Ona cevap yazdığından expressjs api oluştur, onu çağır, ve mesajı buradan gönderen bir foksiyon yaz.




*/

