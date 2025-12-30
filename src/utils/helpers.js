export const formatPhoneNumber = (number) => {
  return number.replace(/\D/g, '');
};

export const openWhatsApp = (message = '') => {
  const phone = '+255682843552';
  const url = `https://wa.me/${formatPhoneNumber(phone)}?text=${encodeURIComponent(message)}`;
  return url;
};

export const makeCall = (number) => {
  return `tel:${formatPhoneNumber(number)}`;
};

export const openEmail = (subject = '', body = '') => {
  const email = 'Kinguelectricaltz@gmail.com';
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};