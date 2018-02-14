import QRCode from 'qrcode'

 
  const generateQR = async text => {
    try {
      let qrUrl = await QRCode.toDataURL(text, { errorCorrectionLevel: 'H' })
      return qrUrl
    } catch (err) {
      console.error(err)
    }
  }

export default generateQR