export const WHATSAPP_NUMBER = '905425145338';

export function createQuoteMessage({ service, location, details }) {
  const clean = (value) => String(value ?? '').trim();
  const fields = { service: clean(service), location: clean(location), details: clean(details) };
  if (Object.values(fields).some((value) => !value)) {
    throw new Error('Lütfen iş türünü, konumu ve işin detaylarını doldurun.');
  }
  return ['Merhaba Pusat Vinç, vinç hizmeti hakkında bilgi almak istiyorum.', '',
    `İş türü: ${fields.service}`, `Çalışma konumu: ${fields.location}`,
    `İşin detayları: ${fields.details}`].join('\n');
}

export function createQuoteUrl(fields) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(createQuoteMessage(fields))}`;
}
