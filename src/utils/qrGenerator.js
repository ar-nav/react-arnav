import QRCode from 'qrcode'

 
  const generateQR = async text => {
    try {
      let qrUrl = await QRCode.toDataURL(text, { errorCorrectionLevel: 'H' })
      console.log('URL RESULT: ', qrUrl)
      return qrUrl
    } catch (err) {
      console.error(err)
    }
  }

export default generateQR