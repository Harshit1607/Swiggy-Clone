import SibApiV3Sdk from 'sib-api-v3-sdk';
import dotenv from 'dotenv'

dotenv.config();

// Configure Brevo API client
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.EMAIL_KEY;

const sendOtpEmail = async (email, otp) => {
  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  const sendSmtpEmail = {
    to: [{ email }],
    subject: 'Your OTP Code',
    textContent: `Your OTP code is ${otp}. It will expire in 5 minutes`,
    sender: { email: process.env.EMAIL },
  };

  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('OTP email sent successfully');
  } catch (error) {
    console.error('Error sending OTP email:', error);
  }
};

export default sendOtpEmail