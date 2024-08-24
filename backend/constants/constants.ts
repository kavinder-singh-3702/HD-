export const UserRegisterEMAIL = (name: string) => {
  return `<div style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f9f9f9;">
      <div style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #fff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
          <div style="text-align: center; margin-bottom: 20px;">
              <img src="https://highwaydelight.com/assets/logo.png" alt="Highway Delight" style="width: 150px;">
          </div>
          <div style="margin-bottom: 20px;">
              <p><strong>Hello ${name},</strong></p>
              <p>Welcome to Highway Delight! We're excited to have you on board.</p>
              <p>Thank you for joining our platform. To get started, you can log in using the button below:</p>
          </div>
          <div style="text-align: center; margin-top: 20px;">
              <a href="https://highwaydelight.com/auth/login" target="_blank" style="display: inline-block; padding: 10px 20px; background-color: #7F56D9; color: #fff; text-decoration: none; border-radius: 5px;">Log in to Your Account</a>
          </div>
          <p>If you have any questions or need assistance, feel free to reach out to our support team. We're here to help!</p>
          <p><strong>Best regards,<br>Highway Delight Team</strong></p>
      </div>
  </div>`;
};
export const emailHTML = (otp: string) => {
  return `<div style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f9f9f9;">
          <div style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #fff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
              <div style="text-align: center; margin-bottom: 20px;">
                  <img src="https://Highway Delight.com/assets/logo.png" alt="Highway Delight" style="width: 150px;">
              </div>
              <div style="margin-bottom: 20px;">
                  <p><strong>Dear User,</strong></p>
                  <p>Your One-Time Password (OTP) for login is:</p>
                  <div style="text-align: center; font-size: 24px; margin-bottom: 20px;">
                      <strong>${otp}</strong>
                  </div>
                  <p>This OTP is valid for a single use and expires in 5 minutes. Please do not share this OTP with anyone for security reasons.</p>
              </div>
              <p>If you didn't request this OTP or need assistance, please contact us immediately.</p>
              <p><strong>Best regards,<br>Highway Delight Team</strong></p>
          </div>
      </div>
    `;
};
