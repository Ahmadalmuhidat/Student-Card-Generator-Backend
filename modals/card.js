const { PKPass } = require('passkit-generator');
const mailer = require("../helper/mailer/CardSender")
const fs = require("fs");

module.exports = {
  generateCard: async (req, res) => {
    const {
      StudentID,
      StudentName,
      email
    } = req.body;

    const DigitalPass = await PKPass.from({
      model: "./Student-Card",
      certificates: {
        wwdr: fs.readFileSync('./keys/wwdr.pem'),
        signerCert: fs.readFileSync('./keys/signerCert.pem'),
        signerKey: fs.readFileSync('./keys/signerKey.pem'),
        signerKeyPassphrase: "1234"
      },
    }, {
      organizationName: "KAUST",
      description: "IABFU Digital Card"
    });

    const message = {
      StudentID: StudentID,
      Provider: "TimeWizeAI"
    }

    DigitalPass.setBarcodes({
      "message":  JSON.stringify(message),
      "format": "PKBarcodeFormatQR",
      "messageEncoding": "iso-8859-1"
    })

    DigitalPass.secondaryFields.push({
      label: "Student ID",
      key: "StudentID",
      value: StudentID,
      textAlignment: "PKTextAlignmentLeft"
    })

    DigitalPass.secondaryFields.push({
      key: "StudentName",
      label: "Student Name",
      value: StudentName,
      textAlignment: "PKTextAlignmentRight"
    });

    const buffer = DigitalPass.getAsBuffer();

    mailer.sendEmail(email, StudentName, buffer)
    res.send(true)
  }
}
