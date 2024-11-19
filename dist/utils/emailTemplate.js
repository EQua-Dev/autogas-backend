"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generateEmailTemplate = (attendee, conferenceDetails) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #f8f9fa; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .code { font-size: 24px; font-weight: bold; color: #007bff; text-align: center; }
        .details { margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>${conferenceDetails.name}</h1>
        </div>
        <div class="content">
          <p>Dear ${attendee.firstName} ${attendee.lastName},</p>
          <p>Thank you for registering for our conference. Here are your registration details:</p>
          
          <div class="code">
            Your Registration Code: ${attendee.registrationCode}
          </div>

          <div class="details">
            <h3>Conference Details:</h3>
            <p>Date: ${conferenceDetails.date}</p>
            <p>Time: ${conferenceDetails.time}</p>
            <p>Venue: ${conferenceDetails.venue}</p>
            <p>Theme: ${conferenceDetails.theme}</p>
          </div>

          <p>Please keep your registration code safe as you'll need it during the conference.</p>
          
          <p>Best regards,<br>Conference Team</p>
        </div>
      </div>
    </body>
    </html>
  `;
};
exports.default = generateEmailTemplate;
