const welcomeTemplate = (name) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
            .header { background-color: #007bff; color: #fff; padding: 10px; text-align: center; border-radius: 5px 5px 0 0; }
            .content { padding: 20px; }
            .footer { margin-top: 20px; text-align: center; font-size: 0.8em; color: #777; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Welcome to Task Manager!</h1>
            </div>
            <div class="content">
                <p>Hi ${name},</p>
                <p>Congratulations! Your account has been successfully created.</p>
                <p>We are excited to have you on board. You can now start organizing your tasks efficiently.</p>
                <p>If you have any questions, feel free to reply to this email.</p>
                <p>Best regards,<br>The Task Manager Team</p>
            </div>
            <div class="footer">
                <p>&copy; ${new Date().getFullYear()} Task Manager. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;
};

module.exports = welcomeTemplate;
