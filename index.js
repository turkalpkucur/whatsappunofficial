const { Client } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

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
client.on("message", (message) => {
  console.log(`Mesaj geldi:  ${message.body}`);

  // Basit otomatik cevap örneği
//  if (message.body.toLowerCase() === "merhaba") {
    message.reply("Merhaba! CRM demo botundan cevap.");
//  }
});

// CRM’den mesaj göndermek için fonksiyon
function sendMessageToCustomer(number, text) {
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



//905338541810   -- kıbrıs hattım
//38977863796