export function getResetPasswordEmailTemplate(url: string, name: string = "there") {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #f8fafc;
      margin: 0;
      padding: 0;
      color: #0f172a;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    }
    .header {
      background: linear-gradient(135deg, #a855f7 0%, #3b82f6 100%);
      padding: 40px 20px;
      text-align: center;
      color: #ffffff;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }
    .content {
      padding: 40px 32px;
    }
    .content p {
      font-size: 16px;
      line-height: 1.6;
      margin-bottom: 24px;
      color: #334155;
    }
    .button-container {
      text-align: center;
      margin: 32px 0;
    }
    .button {
      display: inline-block;
      background-color: #0f172a;
      color: #ffffff !important;
      font-weight: 600;
      text-decoration: none;
      padding: 14px 28px;
      border-radius: 8px;
      font-size: 16px;
      transition: background-color 0.2s;
    }
    .footer {
      background-color: #f1f5f9;
      padding: 24px;
      text-align: center;
      font-size: 14px;
      color: #64748b;
    }
    .link-fallback {
      font-size: 14px;
      color: #64748b;
      word-break: break-all;
      margin-top: 24px;
      padding-top: 24px;
      border-top: 1px solid #e2e8f0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Password Reset Request</h1>
    </div>
    <div class="content">
      <p>Hi ${name},</p>
      <p>We received a request to reset your password. Click the button below to choose a new one:</p>
      
      <div class="button-container">
        <a href="${url}" class="button">Reset Password</a>
      </div>
      
      <p>If you didn't request a password reset, you can safely ignore this email. Your password will not be changed.</p>
      
      <div class="link-fallback">
        <p>If the button doesn't work, copy and paste this link into your browser:</p>
        <a href="${url}" style="color: #3b82f6;">${url}</a>
      </div>
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} Your App. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;
}
