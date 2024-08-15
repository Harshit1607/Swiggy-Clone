
import SibApiV3Sdk from 'sib-api-v3-sdk';

// Configure Brevo API client
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = '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';

const sendOtpEmail = async (email, otp) => {
  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  const sendSmtpEmail = {
    to: [{ email }],
    subject: 'Your OTP Code',
    textContent: `Your OTP code is ${otp}. It will expire in 5 minutes`,
    sender: { email: 'hbareja.07@gmail.com' },
  };

  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('OTP email sent successfully');
  } catch (error) {
    console.error('Error sending OTP email:', error);
  }
};

export default sendOtpEmail