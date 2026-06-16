const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kathirpava542@gmail.com',   // sender email
        pass: 'yeen rhev ruur lisc'         // gmail app password
    }
});

// Sample updated fields
const updatedFields = {
    email: { old: 'olduser@gmail.com', new: 'newuser@gmail.com' },
    mobile: { old: '9876543210', new: '9123456789' },
    whatsapp: { old: false, new: true }
};

async function sendProfileUpdateConfirmation(reciver_email_id, updatedFields) {
    // Build the updated fields list with values
    let updatedFieldsList = '';
    
    if (updatedFields.email) {
        updatedFieldsList += `<li style="margin: 15px 0; padding: 10px; background: white; border-radius: 4px;">
            <div style="font-weight: 500; color: #022434; margin-bottom: 5px;">Email Address</div>
            <div style="font-size: 13px; color: #666;">
                <span style="text-decoration: line-through; color: #999;">${updatedFields.email.old || 'N/A'}</span>
                →
                <span style="color: #13A04E; font-weight: 500;">${updatedFields.email.new}</span>
            </div>
        </li>`;
    }
    
    if (updatedFields.mobile) {
        updatedFieldsList += `<li style="margin: 15px 0; padding: 10px; background: white; border-radius: 4px;">
            <div style="font-weight: 500; color: #022434; margin-bottom: 5px;">Mobile Number</div>
            <div style="font-size: 13px; color: #666;">
                <span style="text-decoration: line-through; color: #999;">+91 ${updatedFields.mobile.old || 'N/A'}</span>
                →
                <span style="color: #13A04E; font-weight: 500;">+91 ${updatedFields.mobile.new}</span>
            </div>
        </li>`;
    }
    
    if (updatedFields.whatsapp !== undefined) {
        const oldStatus = updatedFields.whatsapp.old ? 'Enabled' : 'Disabled';
        const newStatus = updatedFields.whatsapp.new ? 'Enabled' : 'Disabled';
        updatedFieldsList += `<li style="margin: 15px 0; padding: 10px; background: white; border-radius: 4px;">
            <div style="font-weight: 500; color: #022434; margin-bottom: 5px;">WhatsApp Preferences</div>
            <div style="font-size: 13px; color: #666;">
                <span style="text-decoration: line-through; color: #999;">${oldStatus}</span>
                →
                <span style="color: #13A04E; font-weight: 500;">${newStatus}</span>
            </div>
        </li>`;
    }

    const mailOptions = {
        from: '"Rhofi Financial Technologies" <aswathck28@gmail.com>',
        to: reciver_email_id,
        subject: 'Your Rhofi Profile Has Been Updated',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto; border: 1px solid #eee; border-radius: 8px; padding: 20px;">
                
                <div style="text-align: center; margin-bottom: 10px;">
                    <h1 style="color: #0E46A3; margin-bottom: 5px;">Rhofi</h1>
                </div>
                
                <!-- Improved Security Icon -->
                <div style="text-align: center; margin: 22px 0;">
                    <div style="
                        width: 64px;
                        height: 64px;
                        background: linear-gradient(135deg, #0E46A3, #13A04E);
                        border-radius: 50%;
                        margin: 0 auto;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        box-shadow: 0 6px 14px rgba(0,0,0,0.15);
                    ">
                        <span style="color: white; font-size: 30px;">🛡️</span>
                    </div>
                </div>

                <h2 style="color: #022434; text-align: center; font-size: 20px; margin: 18px 0;">
                    Profile Update Confirmed
                </h2>
                
                <p style="font-size: 15px; color: #464646; text-align: center; line-height: 24px;">
                    This is a confirmation to let you know that recent changes were
                    successfully made to your <strong>Rhofi account</strong>.
                    We’re committed to keeping you informed about important account activity.
                </p>

                <div style="background-color: #F5F5F5; border-radius: 4px; padding: 20px; margin: 20px 0;">
                    <ul style="list-style: none; padding: 0; margin: 0; font-size: 14px;">
                        ${updatedFieldsList}
                    </ul>
                </div>

                <p style="font-size: 14px; color: #555; text-align: center; line-height: 22px;">
                    If you made these updates, no further action is required.
                    If anything looks unfamiliar, please contact our support team immediately
                    so we can help secure your account.
                </p>

                <div style="text-align: center; margin: 28px 0;">
                    <a href="https://rhofi.com/support" 
                       style="
                              background-color: #0E46A3; 
                              color: white; 
                              padding: 10px 24px; 
                              text-decoration: none; 
                              border-radius: 4px; 
                              font-size: 14px;
                              font-weight: 500;
                              display: inline-block;">
                        Contact Support
                    </a>
                </div>

                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
                
                <p style="font-size: 12px; color: #777; text-align: center;">
                    © ${new Date().getFullYear()} Rhofi Financial Technologies<br/>
                    This message was sent to help protect your account. Please do not reply.
                </p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Profile update confirmation sent to ${reciver_email_id}`);
        return "Mail Sent";
    } catch (error) {
        console.error('❌ Error sending Profile Update email:', error);
        throw new Error('Failed to send Profile Update email');
    }
}
// ===============================
// TEST CALL – DO NOT USE IN PROD
// ===============================
sendProfileUpdateConfirmation(
    'kathirpava542@gmail.com',   // 👈 replace with your email to test
    updatedFields
)
.then(res => {
    console.log('Result:', res);
})
.catch(err => {
    console.error('Error:', err.message);
});

