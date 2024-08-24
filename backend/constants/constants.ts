export const UserRegisterEMAIL = (name: string) => {
  return `<div style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f9f9f9;">
    <div style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #fff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://linqsat.com/assets/logo.png" alt="Linqsat" style="width: 150px;">
        </div>
        <div style="margin-bottom: 20px;">
            <p><strong>Dear ${name},</strong></p>
            <p>We hope this email finds you well. As a valued member of Linqsat, we wanted to reach out and remind you of the incredible opportunities available on our platform.</p>
            <p>Whether you're actively seeking new employment, exploring career advancements, or simply curious about what's out there, we're here to support you every step of the way.</p>
            <p>Here are a few reasons why Linqsat is your ultimate destination for career success:</p>
            <ul>
                <li><strong>Tailored Job Matches:</strong> Our advanced algorithms work tirelessly to match your skills, experience, and preferences with the perfect job openings.</li>
                <li><strong>Wide Range of Industries:</strong> From tech startups to established corporations, we have job listings spanning across various industries to suit your career aspirations.</li>
                <li><strong>User-Friendly Interface:</strong> Our platform is designed with simplicity and efficiency in mind, ensuring a seamless job search experience for you.</li>
            </ul>
            <p>Don't miss out on the chance to take your career to new heights. Log in to Linqsat today and discover the endless possibilities awaiting you.</p>
        </div>
        <div style="text-align: center; margin-top: 20px;">
            <a href="https://linqsat.com/auth/login" target="_blank" style="display: inline-block; padding: 10px 20px; background-color: #7F56D9; color: #fff; text-decoration: none; border-radius: 5px;">Log in to Linqsat</a>
        </div>
        <p>Thank you for choosing Linqsat as your trusted partner in career advancement. We're excited to see you thrive!</p>
        <p><strong>Best regards,<br>Linqsat Team</strong></p>
    </div>
</div>`;
};
