import { link } from "../Component/Concert";

import QRCode from 'qrcode';

const generateQRCode = async (link) => {
  try {
    const qrCodeData = await QRCode.toDataURL(link);
    return qrCodeData;
  } catch (error) {
    console.error(error);
  }
};

export default generateQRCode;