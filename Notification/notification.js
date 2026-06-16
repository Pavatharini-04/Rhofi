const nodemailer = require('nodemailer');

// Configure Nodemailer transporter with Gmail SMTP
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // TLS
    auth: {
        user: 'aswathck28@gmail.com',
        pass: 'dirm xlis lnxe wrdg'
    }
});

// Switch statement to send appropriate email based on type
function sendEmail(type, reciver_email_id, data) {
    switch(type) {
        case 'OTP_VERIFICATION':
            return sentOTPMail(reciver_email_id, data);
        case 'EMAIL_UPDATE_VERIFICATION':
            return sentOTPUpdateMail(reciver_email_id, data);
        case 'PROFILE_UPDATE_CONFIRMATION':
            return sendProfileUpdateConfirmation(reciver_email_id, data);
        case 'TRIAL_USER_ACTIVATION':
            return sentOTPTrialUserUpdateMail(reciver_email_id, data);
        case 'INACTIVE_USER_REMINDER':
            return sendInactiveUserReminder(reciver_email_id, data);
        case 'INACTIVE_USER_LONG_TIME':
            return sendInactiveUserLongTime(reciver_email_id, data);
        case 'ADMIN_HIGH_USAGE':
            return sendAdminHighUsage(reciver_email_id, data);
        case 'NETCOINS_EXPIRY_ALERT':
            return sendNetcoinsExpiryAlert(reciver_email_id, data);
        case 'LOW_RHOFI_COINS_ALERT':
            return sendLowRhofiCoinsAlert(reciver_email_id, data);
        case 'FOREX_PRICE_ALERT':
            return sendForexPriceAlert(reciver_email_id, data);
        case 'SUBSCRIPTION_PAYMENT_PENDING':
            return sendSubscriptionPaymentPending(reciver_email_id, data);
        default:
            throw new Error('Invalid email type');
    }
}

/**
 * =========================================================
 * OTP VERIFICATION MAIL
 * =========================================================
 */
async function sentOTPMail(reciver_email_id, otp) {
    const mailOptions = {
        from: '"Rhofi Financial Technologies" <aswathck28@gmail.com>',
        to: reciver_email_id,
        subject: 'Rhofi Account Verification – Your OTP Code',
        html: `
                <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto; border: 1px solid #eee; border-radius: 8px; padding: 20px;">
                    <div style="text-align: center; margin-bottom: 10px;">
                        <h1 style="color: #0E46A3; margin-bottom: 5px;">Rhofi</h1>
                    </div>
                    <p style="font-size: 16px; text-align: center;">Use the following OTP to sign in your Rhofi account:</p>
                    <h1 style="color: #2e7d32; text-align: center; letter-spacing: 4px;">${otp}</h1>
                    <p style="font-size: 14px; color: #555; text-align: center;">
                        This code will expire in <b>10 minutes</b>.<br/>
                        <span style="color: red;">Do not share</span> this code with anyone for your account's security.
                    </p>
                    <hr />
                    <p style="font-size: 12px; color: #777; text-align: center;">
                        Rhofi Financial Technologies © ${new Date().getFullYear()}<br/>
                        This is an automated message. Please do not reply.
                    </p>
                </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ OTP sent securely to ${reciver_email_id}: ${otp}`);
        return otp;
    } catch (error) {
        console.error('❌ Error sending OTP email:', error);
        throw new Error('Failed to send OTP email');
    }
}

/**
 * =========================================================
 * EMAIL UPDATE OTP
 * =========================================================
 */
async function sentOTPUpdateMail(reciver_email_id, otp) {
    const mailOptions = {
        from: '"Rhofi Financial Technologies" <aswathck28@gmail.com>',
        to: reciver_email_id,
        subject: 'Rhofi Email Verification – Your Verification Code',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto; border: 1px solid #eee; border-radius: 8px; padding: 20px;">
                <div style="text-align: center; margin-bottom: 10px;">
                    <h1 style="color: #0E46A3; margin-bottom: 5px;">Rhofi</h1>
                </div>
                <p style="font-size: 16px; text-align: center;">Verify your email address with the following code:</p>
                <h1 style="color: #2e7d32; text-align: center; letter-spacing: 4px;">${otp}</h1>
                <p style="font-size: 14px; color: #555; text-align: center;">
                    This verification code will expire in <b>10 minutes</b>.<br/>
                    <span style="color: red;">Do not share</span> this code with anyone for your account's security.
                </p>
                <p style="font-size: 14px; color: #555; text-align: center; margin-top: 20px;">
                    If you didn't request this verification, please ignore this email.
                </p>
                <hr />
                <p style="font-size: 12px; color: #777; text-align: center;">
                    Rhofi Financial Technologies © ${new Date().getFullYear()}<br/>
                    This is an automated message. Please do not reply.
                </p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ OTP sent securely to ${reciver_email_id}: ${otp}`);
        return otp;
    } catch (error) {
        console.error('❌ Error sending OTP email:', error);
        throw new Error('Failed to send OTP email');
    }
}

/**
 * =========================================================
 * PROFILE UPDATE CONFIRMATION
 * =========================================================
 */
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
        subject: 'Rhofi Profile Updated Successfully',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto; border: 1px solid #eee; border-radius: 8px; padding: 20px;">
                <div style="text-align: center; margin-bottom: 10px;">
                    <h1 style="color: #0E46A3; margin-bottom: 5px;">Rhofi</h1>
                </div>
                
                <div style="text-align: center; margin: 20px 0;">
                    <div style="width: 60px; height: 60px; background-color: #13A04E; border-radius: 50%; margin: 0 auto; display: flex; align-items: center; justify-content: center;">
                        <span style="color: white; font-size: 30px;">✓</span>
                    </div>
                </div>

                <h2 style="color: #022434; text-align: center; font-size: 20px; margin: 20px 0;">Profile Updated Successfully</h2>
                
                <p style="font-size: 16px; color: #464646; text-align: center; line-height: 24px;">
                    Your profile has been updated successfully. The following information was changed:
                </p>

                <div style="background-color: #F5F5F5; border-radius: 4px; padding: 20px; margin: 20px 0;">
                    <ul style="list-style: none; padding: 0; margin: 0; font-size: 14px;">
                        ${updatedFieldsList}
                    </ul>
                </div>

                <p style="font-size: 14px; color: #555; text-align: center; line-height: 22px;">
                    If you did not make these changes, please contact our support team immediately.
                </p>

                <div style="text-align: center; margin: 30px 0;">
                    <a href="https://rhofi.com/support" 
                       style="background-color: #0E46A3; 
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
                    Rhofi Financial Technologies © ${new Date().getFullYear()}<br/>
                    This is an automated message. Please do not reply.
                </p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Profile update confirmation sent to ${reciver_email_id}`);
        return "Mailed Sent";
    } catch (error) {
        console.error('❌ Error sending Profile Update email:', error);
        throw new Error('Failed to send Profile Update email');
    }
}

/**
 * =========================================================
 * TRIAL USER ACTIVATION
 * =========================================================
 */
async function sentOTPTrialUserUpdateMail(reciver_email_id, otp) {
    const mailOptions = {
        from: '"Rhofi Financial Technologies" <aswathck28@gmail.com>',
        to: reciver_email_id,
        subject: 'Rhofi Account Activation – Verify Your Email',
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto; border: 1px solid #eee; border-radius: 8px; padding: 20px;">
            <div style="text-align: center; margin-bottom: 10px;">
                <h1 style="color: #0E46A3; margin-bottom: 5px;">Rhofi</h1>
            </div>
            
            <div style="text-align: center; margin: 20px 0;">
                <div style="width: 60px; height: 60px; background-color: #E3F2FD; border-radius: 50%; margin: 0 auto; display: flex; align-items: center; justify-content: center;">
                    <span style="font-size: 30px;">🔓</span>
                </div>
            </div>

            <h2 style="color: #022434; text-align: center; font-size: 20px; margin: 20px 0;">
                Activate Your Account
            </h2>

            <p style="font-size: 16px; text-align: center; color: #464646; line-height: 24px;">
                You're one step away from unlocking full access to Rhofi. Use the code below to verify your email and activate your account:
            </p>

            <h1 style="color: #0E46A3; text-align: center; letter-spacing: 6px; font-size: 36px; margin: 30px 0; background-color: #F5F5F5; padding: 20px; border-radius: 8px;">
                ${otp}
            </h1>

            <p style="font-size: 14px; color: #555; text-align: center; line-height: 22px;">
                This verification code will expire in <b>10 minutes</b>.<br/>
                <span style="color: #E00000; font-weight: 500;">Do not share</span> this code with anyone for your account's security.
            </p>

            <div style="background-color: #E3F2FD; border-left: 4px solid #0E46A3; padding: 15px; margin: 20px 0; border-radius: 4px;">
                <p style="font-size: 14px; color: #022434; margin: 0; line-height: 22px;">
                   <b>What you'll unlock:</b><br/>
                    ✓ Full access to all features<br/>
                    ✓ Real-time stock analysis insights<br/>
                    ✓ Watchlist stocks with up-to-date updates<br/>
                    ✓ Edit and update your profile<br/>
                    ✓ Priority customer support<br/>
                    ✓ And much more...
                </p>
            </div>

            <p style="font-size: 14px; color: #555; text-align: center; margin-top: 20px;">
                If you didn't request this activation, please ignore this email or contact our support team.
            </p>

            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            
            <p style="font-size: 12px; color: #777; text-align: center;">
                Rhofi Financial Technologies © ${new Date().getFullYear()}<br/>
                This is an automated message. Please do not reply.
            </p>
        </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ OTP sent securely to ${reciver_email_id}: ${otp}`);
        return otp;
    } catch (error) {
        console.error('❌ Error sending OTP email:', error);
        throw new Error('Failed to send OTP email');
    }
}

/**
 * =========================================================
 * INACTIVE USER REMINDER (2 TEMPLATES)
 * =========================================================
 */
async function sendInactiveUserReminder(reciver_email_id, data) {
    const { userName, loginLink, templateType = 1 } = data;
    
    // Choose template based on templateType
    let htmlTemplate;
    let subject;
    
    if (templateType === 1) {
        subject = `We Miss You, ${userName}! Your Dashboard Awaits`;
        htmlTemplate = `
            <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto; border: 1px solid #eee; border-radius: 8px; padding: 20px;">
                <div style="text-align: center; margin-bottom: 10px;">
                    <h1 style="color: #0E46A3; margin-bottom: 5px;">Rhofi</h1>
                </div>
                
                <p style="font-size: 16px; color: #333; text-align: left;">
                    Hi ${userName},<br/><br/>
                    Your dashboard misses you 💙<br/><br/>
                    Your account is active and ready to go. Log in to continue your progress, check updates, and explore features created just for you.
                </p>

                <div style="text-align: center; margin: 30px 0;">
                    <a href="${loginLink}" 
                       style="background-color: #0E46A3; 
                              color: white; 
                              padding: 12px 30px; 
                              text-decoration: none; 
                              border-radius: 4px; 
                              font-size: 16px;
                              font-weight: 500;
                              display: inline-block;">
                        👉 LOG IN NOW
                    </a>
                </div>

                <div style="text-align: center; margin: 20px 0;">
                    <p style="font-size: 14px; color: #555;">
                        <strong>Login Link:</strong><br/>
                        <a href="${loginLink}" style="color: #0E46A3; word-break: break-all;">${loginLink}</a>
                    </p>
                </div>

                <p style="font-size: 14px; color: #555; text-align: center; line-height: 22px; font-style: italic;">
                    We'll be right here when you return ✨
                </p>

                <hr />
                
                <p style="font-size: 12px; color: #777; text-align: center;">
                    Rhofi Team<br/>
                    Rhofi Financial Technologies © ${new Date().getFullYear()}<br/>
                    This is an automated message. Please do not reply.
                </p>
            </div>
        `;
    } else {
        subject = `${userName}, We Saved Your Spot Just For You`;
        htmlTemplate = `
            <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto; border: 1px solid #eee; border-radius: 8px; padding: 20px;">
                <div style="text-align: center; margin-bottom: 10px;">
                    <h1 style="color: #0E46A3; margin-bottom: 5px;">Rhofi</h1>
                </div>
                
                <p style="font-size: 16px; color: #333; text-align: left;">
                    Hi ${userName},<br/><br/>
                    We saved your spot just for you 😉<br/><br/>
                    Everything is set on your account. A quick login helps you stay connected and continue smoothly without missing anything important.
                </p>

                <div style="text-align: center; margin: 30px 0;">
                    <a href="${loginLink}" 
                       style="background-color: #13A04E; 
                              color: white; 
                              padding: 12px 30px; 
                              text-decoration: none; 
                              border-radius: 4px; 
                              font-size: 16px;
                              font-weight: 500;
                              display: inline-block;">
                        👉 ACCESS YOUR ACCOUNT
                    </a>
                </div>

                <div style="text-align: center; margin: 20px 0;">
                    <p style="font-size: 14px; color: #555;">
                        <strong>Direct Login:</strong><br/>
                        <a href="${loginLink}" style="color: #13A04E; word-break: break-all;">${loginLink}</a>
                    </p>
                </div>

                <p style="font-size: 14px; color: #555; text-align: center; line-height: 22px;">
                    One click brings you back on track 🚀
                </p>

                <hr />
                
                <p style="font-size: 12px; color: #777; text-align: center;">
                    Rhofi team<br/>
                    Rhofi Financial Technologies © ${new Date().getFullYear()}<br/>
                    This is an automated message. Please do not reply.
                </p>
            </div>
        `;
    }
    
    const mailOptions = {
        from: '"Rhofi Financial Technologies" <aswathck28@gmail.com>',
        to: reciver_email_id,
        subject: subject,
        html: htmlTemplate
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Inactive User Reminder (Template ${templateType}) sent to ${reciver_email_id}`);
        return `Reminder ${templateType} Sent`;
    } catch (error) {
        console.error('❌ Error sending Inactive User Reminder:', error);
        throw new Error('Failed to send Inactive User Reminder');
    }
}

/**
 * =========================================================
 * INACTIVE USER LONG TIME (2+ DAYS) - 2 TEMPLATES
 * =========================================================
 */
async function sendInactiveUserLongTime(reciver_email_id, data) {
    const { userName, loginLink, days, templateType = 1 } = data;
    
    // Choose template based on templateType
    let htmlTemplate;
    let subject;
    
    if (templateType === 1) {
        subject = `We Miss You, ${userName}! It's Been A While ⏳`;
        htmlTemplate = `
            <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto; border: 1px solid #eee; border-radius: 8px; padding: 20px;">
                <div style="text-align: center; margin-bottom: 10px;">
                    <h1 style="color: #0E46A3; margin-bottom: 5px;">Rhofi</h1>
                </div>
                
                <p style="font-size: 16px; color: #333; text-align: left;">
                    Hi ${userName},<br/><br/>
                    It's been a while ⏳<br/><br/>
                    You haven't logged in for a few days. Your progress, insights, and latest updates are waiting to help you move forward.
                </p>

                <div style="text-align: center; margin: 30px 0;">
                    <a href="${loginLink}" 
                       style="background-color: #0E46A3; 
                              color: white; 
                              padding: 12px 30px; 
                              text-decoration: none; 
                              border-radius: 4px; 
                              font-size: 16px;
                              font-weight: 500;
                              display: inline-block;">
                        👉 CONTINUE WHERE YOU LEFT OFF
                    </a>
                </div>

                <div style="text-align: center; margin: 20px 0;">
                    <p style="font-size: 14px; color: #555;">
                        <strong>Login Link:</strong><br/>
                        <a href="${loginLink}" style="color: #0E46A3; word-break: break-all;">${loginLink}</a>
                    </p>
                </div>

                <p style="font-size: 14px; color: #555; text-align: center; line-height: 22px;">
                    Your journey continues when you do 🚀
                </p>

                <hr />
                
                <p style="font-size: 12px; color: #777; text-align: center;">
                    Rhofi Team<br/>
                    Rhofi Financial Technologies © ${new Date().getFullYear()}<br/>
                    This is an automated message. Please do not reply.
                </p>
            </div>
        `;
    } else {
        subject = `${userName}, Your Next Step is Waiting 👣`;
        htmlTemplate = `
            <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto; border: 1px solid #eee; border-radius: 8px; padding: 20px;">
                <div style="text-align: center; margin-bottom: 10px;">
                    <h1 style="color: #0E46A3; margin-bottom: 5px;">Rhofi</h1>
                </div>
                
                <p style="font-size: 16px; color: #333; text-align: left;">
                    Hi ${userName},<br/><br/>
                    Your next step is waiting 👣<br/><br/>
                    It's been over ${days} days since your last visit. Log back in to stay updated and keep your momentum going strong.
                </p>

                <div style="text-align: center; margin: 30px 0;">
                    <a href="${loginLink}" 
                       style="background-color: #13A04E; 
                              color: white; 
                              padding: 12px 30px; 
                              text-decoration: none; 
                              border-radius: 4px; 
                              font-size: 16px;
                              font-weight: 500;
                              display: inline-block;">
                        👉 RESUME NOW
                    </a>
                </div>

                <div style="text-align: center; margin: 20px 0;">
                    <p style="font-size: 14px; color: #555;">
                        <strong>Direct Login:</strong><br/>
                        <a href="${loginLink}" style="color: #13A04E; word-break: break-all;">${loginLink}</a>
                    </p>
                </div>

                <p style="font-size: 14px; color: #555; text-align: center; line-height: 22px;">
                    Progress starts with a simple click ✨
                </p>

                <hr />
                
                <p style="font-size: 12px; color: #777; text-align: center;">
                    Rhofi Team<br/>
                    Rhofi Financial Technologies © ${new Date().getFullYear()}<br/>
                    This is an automated message. Please do not reply.
                </p>
            </div>
        `;
    }
    
    const mailOptions = {
        from: '"Rhofi Financial Technologies" <aswathck28@gmail.com>',
        to: reciver_email_id,
        subject: subject,
        html: htmlTemplate
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Inactive User Long Time (Template ${templateType}) sent to ${reciver_email_id}`);
        return `Long Time Reminder ${templateType} Sent`;
    } catch (error) {
        console.error('❌ Error sending Inactive User Long Time Reminder:', error);
        throw new Error('Failed to send Inactive User Long Time Reminder');
    }
}

/**
 * =========================================================
 * ADMIN HIGH USAGE ALERT - 2 TEMPLATES
 * =========================================================
 */
async function sendAdminHighUsage(reciver_email_id, data) {
    const { adminName, adminDashboardLink, currentUserCount, averageUserCount, templateType = 1 } = data;
    
    // Choose template based on templateType
    let htmlTemplate;
    let subject;
    
    if (templateType === 1) {
        subject = `🚨 Platform Activity Higher Than Usual - Admin Alert`;
        htmlTemplate = `
            <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto; border: 1px solid #eee; border-radius: 8px; padding: 20px; border-left: 5px solid #f59e0b;">
                <div style="text-align: center; margin-bottom: 10px;">
                    <h1 style="color: #0E46A3; margin-bottom: 5px;">Rhofi</h1>
                    <p style="color: #64748b; font-size: 14px;">Admin Alert System</p>
                </div>
                
                <h2 style="color: #dc2626; text-align: center; font-size: 20px; margin: 20px 0;">
                    ⚠️ Platform Activity Alert
                </h2>
                
                <p style="font-size: 16px; color: #333; text-align: left;">
                    Hello ${adminName},<br/><br/>
                    Platform activity is higher than usual 📊<br/><br/>
                    We detected an increase in active users beyond normal levels. This may require monitoring to ensure system performance and stability.
                </p>

                <div style="background-color: #fef3c7; border-radius: 8px; padding: 20px; margin: 25px 0; border: 1px solid #fbbf24;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                        <div style="text-align: center; flex: 1;">
                            <div style="font-size: 28px; font-weight: bold; color: #dc2626;">${currentUserCount}</div>
                            <div style="font-size: 12px; color: #57534e;">Current users</div>
                        </div>
                        <div style="font-size: 24px; color: #d97706;">→</div>
                        <div style="text-align: center; flex: 1;">
                            <div style="font-size: 24px; font-weight: bold; color: #059669;">${averageUserCount}</div>
                            <div style="font-size: 12px; color: #57534e;">Normal average</div>
                        </div>
                    </div>
                    <div style="text-align: center; font-size: 13px; color: #92400e;">
                        <strong>Increase: ${Math.round((currentUserCount - averageUserCount) / averageUserCount * 100)}% above normal</strong>
                    </div>
                </div>

                <div style="text-align: center; margin: 30px 0;">
                    <a href="${adminDashboardLink}" 
                       style="background: linear-gradient(to right, #dc2626, #f59e0b); 
                              color: white; 
                              padding: 12px 30px; 
                              text-decoration: none; 
                              border-radius: 4px; 
                              font-size: 16px;
                              font-weight: 500;
                              display: inline-block;">
                        👉 OPEN ADMIN DASHBOARD
                    </a>
                </div>

                <p style="font-size: 14px; color: #555; text-align: center; line-height: 22px; font-style: italic;">
                    Staying informed helps you stay in control 👀
                </p>

                <div style="background-color: #f8fafc; border-radius: 8px; padding: 15px; margin: 20px 0; font-size: 13px; color: #475569;">
                    <p style="margin: 5px 0;"><strong>Recommended actions:</strong></p>
                    <ul style="margin: 10px 0; padding-left: 20px;">
                        <li>Monitor server performance metrics</li>
                        <li>Check error logs and alerts</li>
                        <li>Review resource utilization</li>
                        <li>Verify security monitoring systems</li>
                    </ul>
                </div>

                <hr />
                
                <p style="font-size: 12px; color: #777; text-align: center;">
                    Rhofi Alerts<br/>
                    Rhofi Financial Technologies © ${new Date().getFullYear()}<br/>
                    This is an automated alert message.
                </p>
            </div>
        `;
    } else {
        subject = `📈 User Traffic Alert - Above Normal Threshold`;
        htmlTemplate = `
            <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto; border: 1px solid #eee; border-radius: 8px; padding: 20px; border-left: 5px solid #3b82f6;">
                <div style="text-align: center; margin-bottom: 10px;">
                    <h1 style="color: #0E46A3; margin-bottom: 5px;">Rhofi</h1>
                    <p style="color: #64748b; font-size: 14px;">Admin Alert System</p>
                </div>
                
                <h2 style="color: #1d4ed8; text-align: center; font-size: 20px; margin: 20px 0;">
                    📊 User Traffic Alert
                </h2>
                
                <p style="font-size: 16px; color: #333; text-align: left;">
                    Hi ${adminName},<br/><br/>
                    More users, more activity 🛡️<br/><br/>
                    User traffic has crossed the usual threshold. This could indicate growth or require a quick performance and security review.
                </p>

                <div style="background-color: #dbeafe; border-radius: 8px; padding: 20px; margin: 25px 0; border: 1px solid #60a5fa;">
                    <div style="text-align: center;">
                        <div style="display: inline-block; padding: 10px 20px; background-color: #1d4ed8; color: white; border-radius: 20px; font-weight: bold; margin-bottom: 15px;">
                            TRENDING UP
                        </div>
                        <div style="font-size: 32px; font-weight: bold; color: #1d4ed8; margin: 10px 0;">${currentUserCount}</div>
                        <div style="font-size: 14px; color: #4b5563;">Active Users Currently Online</div>
                        <div style="font-size: 12px; color: #6b7280; margin-top: 10px;">
                            Normal average: ${averageUserCount} users
                        </div>
                    </div>
                </div>

                <div style="text-align: center; margin: 30px 0;">
                    <a href="${adminDashboardLink}" 
                       style="background-color: #1d4ed8; 
                              color: white; 
                              padding: 12px 30px; 
                              text-decoration: none; 
                              border-radius: 4px; 
                              font-size: 16px;
                              font-weight: 500;
                              display: inline-block;">
                        👉 REVIEW DASHBOARD
                    </a>
                </div>

                <p style="font-size: 14px; color: #555; text-align: center; line-height: 22px; font-style: italic;">
                    Monitoring is recommended for smooth operations 👀
                </p>

                <div style="background-color: #f0f9ff; border-radius: 8px; padding: 15px; margin: 20px 0; font-size: 13px; color: #0369a1;">
                    <p style="margin: 5px 0;"><strong>This surge may impact:</strong></p>
                    <ul style="margin: 10px 0; padding-left: 20px;">
                        <li>System performance and response times</li>
                        <li>Resource utilization (CPU, Memory, Database)</li>
                        <li>Security monitoring and threat detection</li>
                        <li>Application stability and error rates</li>
                    </ul>
                </div>

                <hr />
                
                <p style="font-size: 12px; color: #777; text-align: center;">
                    Rhofi Alerts<br/>
                    Rhofi Financial Technologies © ${new Date().getFullYear()}<br/>
                    This is an automated alert message.
                </p>
            </div>
        `;
    }
    
    const mailOptions = {
        from: '"Rhofi Alert System" <aswathck28@gmail.com>',
        to: reciver_email_id,
        subject: subject,
        html: htmlTemplate
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Admin High Usage Alert (Template ${templateType}) sent to ${reciver_email_id}`);
        return `Admin Alert ${templateType} Sent`;
    } catch (error) {
        console.error('❌ Error sending Admin High Usage Alert:', error);
        throw new Error('Failed to send Admin High Usage Alert');
    }
}

/**
 * =========================================================
 * NETCOINS EXPIRY ALERT (2 DAYS BEFORE)
 * =========================================================
 */
async function sendNetcoinsExpiryAlert(reciver_email_id, data) {
    const { userName, netcoinsBalance, expiryDate, useNetcoinsLink, templateType = 1 } = data;
    
    // Format expiry date
    const expiryFormatted = new Date(expiryDate).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    let htmlTemplate;
    let subject;
    
    if (templateType === 1) {
        subject = `⏰ NetCoins Expiry Alert - Action Required`;
        htmlTemplate = `
            <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto; border: 1px solid #eee; border-radius: 8px; padding: 20px; border-left: 5px solid #f59e0b;">
                <div style="text-align: center; margin-bottom: 10px;">
                    <h1 style="color: #0E46A3; margin-bottom: 5px;">Rhofi</h1>
                </div>
                
                <h2 style="color: #dc2626; text-align: center; font-size: 20px; margin: 20px 0;">
                    ⏰ NetCoins Expiry Alert
                </h2>
                
                <p style="font-size: 16px; color: #333; text-align: left;">
                    Hi ${userName},<br/><br/>
                    Your NetCoins are about to expire 💰<br/><br/>
                    Just a heads-up! Some of your NetCoins will expire in 2 days.
                    Use them soon to avoid missing out on the value you've earned.
                </p>

                <div style="background-color: #fef3c7; border-radius: 8px; padding: 20px; margin: 25px 0; border: 1px solid #fbbf24;">
                    <div style="text-align: center;">
                        <div style="font-size: 32px; font-weight: bold; color: #dc2626; margin: 10px 0;">${netcoinsBalance}</div>
                        <div style="font-size: 14px; color: #57534e;">NetCoins Balance</div>
                        <div style="font-size: 12px; color: #92400e; margin-top: 10px;">
                            <strong>Expires on: ${expiryFormatted}</strong>
                        </div>
                    </div>
                </div>

                <div style="text-align: center; margin: 30px 0;">
                    <a href="${useNetcoinsLink}" 
                       style="background-color: #f59e0b; 
                              color: white; 
                              padding: 12px 30px; 
                              text-decoration: none; 
                              border-radius: 4px; 
                              font-size: 16px;
                              font-weight: 500;
                              display: inline-block;">
                        👉 USE NETCOINS NOW
                    </a>
                </div>

                <p style="font-size: 14px; color: #555; text-align: center; line-height: 22px; font-style: italic;">
                    A small action today saves rewards tomorrow ✨
                </p>

                <div style="background-color: #f8fafc; border-radius: 8px; padding: 15px; margin: 20px 0; font-size: 13px; color: #475569;">
                    <p style="margin: 5px 0;"><strong>Ways to use your NetCoins:</strong></p>
                    <ul style="margin: 10px 0; padding-left: 20px;">
                        <li>Redeem for premium features</li>
                        <li>Purchase additional services</li>
                        <li>Get discounts on subscriptions</li>
                        <li>Access exclusive content</li>
                    </ul>
                </div>

                <hr />
                
                <p style="font-size: 12px; color: #777; text-align: center;">
                    Rhofi Team<br/>
                    Rhofi Financial Technologies © ${new Date().getFullYear()}<br/>
                    This is an automated message. Please do not reply.
                </p>
            </div>
        `;
    } else {
        subject = `💰 Your Rewards Are Waiting - NetCoins Expiring Soon`;
        htmlTemplate = `
            <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto; border: 1px solid #eee; border-radius: 8px; padding: 20px; border-left: 5px solid #059669;">
                <div style="text-align: center; margin-bottom: 10px;">
                    <h1 style="color: #0E46A3; margin-bottom: 5px;">Rhofi</h1>
                </div>
                
                <h2 style="color: #059669; text-align: center; font-size: 20px; margin: 20px 0;">
                    💰 NetCoins Expiry Reminder
                </h2>
                
                <p style="font-size: 16px; color: #333; text-align: left;">
                    Hi ${userName},<br/><br/>
                    Your rewards are waiting ⏳<br/><br/>
                    Your NetCoins balance is nearing expiry in 2 days.
                    Redeem them now to continue enjoying benefits without interruption.
                </p>

                <div style="background-color: #d1fae5; border-radius: 8px; padding: 20px; margin: 25px 0; border: 1px solid #10b981;">
                    <div style="text-align: center;">
                        <div style="display: inline-block; padding: 10px 20px; background-color: #059669; color: white; border-radius: 20px; font-weight: bold; margin-bottom: 15px;">
                            EXPIRING SOON
                        </div>
                        <div style="font-size: 32px; font-weight: bold; color: #059669; margin: 10px 0;">${netcoinsBalance}</div>
                        <div style="font-size: 14px; color: #064e3b;">Available NetCoins</div>
                        <div style="font-size: 12px; color: #065f46; margin-top: 10px;">
                            Expiry Date: ${expiryFormatted}
                        </div>
                    </div>
                </div>

                <p style="font-size: 16px; color: #333; text-align: center; line-height: 24px; margin: 20px 0;">
                    Make the most of what you've earned 💙
                </p>

                <div style="text-align: center; margin: 30px 0;">
                    <a href="${useNetcoinsLink}" 
                       style="background-color: #059669; 
                              color: white; 
                              padding: 12px 30px; 
                              text-decoration: none; 
                              border-radius: 4px; 
                              font-size: 16px;
                              font-weight: 500;
                              display: inline-block;">
                        👉 REDEEM NETCOINS
                    </a>
                </div>

                <p style="font-size: 14px; color: #555; text-align: center; line-height: 22px;">
                    Don't let your rewards go to waste. Redeem them now!
                </p>

                <hr />
                
                <p style="font-size: 12px; color: #777; text-align: center;">
                    Rhofi team<br/>
                    Rhofi Financial Technologies © ${new Date().getFullYear()}<br/>
                    This is an automated message. Please do not reply.
                </p>
            </div>
        `;
    }
    
    const mailOptions = {
        from: '"Rhofi Rewards" <aswathck28@gmail.com>',
        to: reciver_email_id,
        subject: subject,
        html: htmlTemplate
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ NetCoins Expiry Alert (Template ${templateType}) sent to ${reciver_email_id}`);
        return `NetCoins Alert ${templateType} Sent`;
    } catch (error) {
        console.error('❌ Error sending NetCoins Expiry Alert:', error);
        throw new Error('Failed to send NetCoins Expiry Alert');
    }
}

/**
 * =========================================================
 * LOW RHOFI COINS ALERT (BALANCE < 100)
 * =========================================================
 */
async function sendLowRhofiCoinsAlert(reciver_email_id, data) {
    const { userName, currentBalance, addCoinsLink, templateType = 1 } = data;
    
    let htmlTemplate;
    let subject;
    
    if (templateType === 1) {
        subject = `⚠️ Low Rhofi Coin Balance Alert`;
        htmlTemplate = `
            <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto; border: 1px solid #eee; border-radius: 8px; padding: 20px; border-left: 5px solid #dc2626;">
                <div style="text-align: center; margin-bottom: 10px;">
                    <h1 style="color: #0E46A3; margin-bottom: 5px;">Rhofi</h1>
                </div>
                
                <h2 style="color: #dc2626; text-align: center; font-size: 20px; margin: 20px 0;">
                    ⚠️ Low Rhofi Coin Balance
                </h2>
                
                <p style="font-size: 16px; color: #333; text-align: left;">
                    Hi ${userName},<br/><br/>
                    Low Rhofi Coin balance detected<br/><br/>
                    Your current Rhofi Coin balance is below 100.
                    This may limit access to certain features or actions.
                </p>

                <div style="background-color: #fee2e2; border-radius: 8px; padding: 20px; margin: 25px 0; border: 1px solid #f87171;">
                    <div style="text-align: center;">
                        <div style="font-size: 32px; font-weight: bold; color: #dc2626; margin: 10px 0;">${currentBalance}</div>
                        <div style="font-size: 14px; color: #7f1d1d;">Current Rhofi Coins Balance</div>
                        <div style="font-size: 12px; color: #b91c1c; margin-top: 10px;">
                            <strong>Minimum required: 100 coins</strong>
                        </div>
                    </div>
                </div>

                <div style="text-align: center; margin: 30px 0;">
                    <a href="${addCoinsLink}" 
                       style="background-color: #dc2626; 
                              color: white; 
                              padding: 12px 30px; 
                              text-decoration: none; 
                              border-radius: 4px; 
                              font-size: 16px;
                              font-weight: 500;
                              display: inline-block;">
                        👉 ADD COINS NOW
                    </a>
                </div>

                <p style="font-size: 14px; color: #555; text-align: center; line-height: 22px; font-style: italic;">
                    Stay prepared and uninterrupted 🚀
                </p>

                <div style="background-color: #f8fafc; border-radius: 8px; padding: 15px; margin: 20px 0; font-size: 13px; color: #475569;">
                    <p style="margin: 5px 0;"><strong>Why maintain minimum balance?</strong></p>
                    <ul style="margin: 10px 0; padding-left: 20px;">
                        <li>Uninterrupted access to premium features</li>
                        <li>Execute trades and transactions smoothly</li>
                        <li>Access real-time market data</li>
                        <li>Receive priority customer support</li>
                    </ul>
                </div>

                <hr />
                
                <p style="font-size: 12px; color: #777; text-align: center;">
                    Rhofi Team<br/>
                    Rhofi Financial Technologies © ${new Date().getFullYear()}<br/>
                    This is an automated message. Please do not reply.
                </p>
            </div>
        `;
    } else {
        subject = `💰 Rhofi Coins Running Low - Top Up Required`;
        htmlTemplate = `
            <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto; border: 1px solid #eee; border-radius: 8px; padding: 20px; border-left: 5px solid #f59e0b;">
                <div style="text-align: center; margin-bottom: 10px;">
                    <h1 style="color: #0E46A3; margin-bottom: 5px;">Rhofi</h1>
                </div>
                
                <h2 style="color: #d97706; text-align: center; font-size: 20px; margin: 20px 0;">
                    ⚠️ Low Balance Alert
                </h2>
                
                <p style="font-size: 16px; color: #333; text-align: left;">
                    Hi ${userName},<br/><br/>
                    You're running low on Rhofi Coins<br/><br/>
                    Your balance has dropped below 100 coins.
                    Top up now to continue using features smoothly without restrictions.
                </p>

                <div style="background-color: #fef3c7; border-radius: 8px; padding: 20px; margin: 25px 0; border: 1px solid #fbbf24;">
                    <div style="text-align: center;">
                        <div style="display: inline-block; padding: 10px 20px; background-color: #f59e0b; color: white; border-radius: 20px; font-weight: bold; margin-bottom: 15px;">
                            LOW BALANCE
                        </div>
                        <div style="font-size: 32px; font-weight: bold; color: #d97706; margin: 10px 0;">${currentBalance}</div>
                        <div style="font-size: 14px; color: #92400e;">Current Coin Balance</div>
                        <div style="font-size: 12px; color: #b45309; margin-top: 10px;">
                            Recommended minimum: 100 coins
                        </div>
                    </div>
                </div>

                <p style="font-size: 16px; color: #333; text-align: center; line-height: 24px; margin: 20px 0;">
                    A quick top-up keeps things moving ✨
                </p>

                <div style="text-align: center; margin: 30px 0;">
                    <a href="${addCoinsLink}" 
                       style="background-color: #f59e0b; 
                              color: white; 
                              padding: 12px 30px; 
                              text-decoration: none; 
                              border-radius: 4px; 
                              font-size: 16px;
                              font-weight: 500;
                              display: inline-block;">
                        👉 RECHARGE COINS
                    </a>
                </div>

                <div style="background-color: #fffbeb; border-radius: 8px; padding: 15px; margin: 20px 0; font-size: 13px; color: #78350f;">
                    <p style="margin: 5px 0;"><strong>Benefits of maintaining balance:</strong></p>
                    <ul style="margin: 10px 0; padding-left: 20px;">
                        <li>Smooth trading experience</li>
                        <li>Access to advanced analytics</li>
                        <li>Real-time notifications</li>
                        <li>Enhanced security features</li>
                    </ul>
                </div>

                <hr />
                
                <p style="font-size: 12px; color: #777; text-align: center;">
                    Rhofi<br/>
                    Rhofi Financial Technologies © ${new Date().getFullYear()}<br/>
                    This is an automated message. Please do not reply.
                </p>
            </div>
        `;
    }
    
    const mailOptions = {
        from: '"Rhofi Wallet" <aswathck28@gmail.com>',
        to: reciver_email_id,
        subject: subject,
        html: htmlTemplate
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Low Rhofi Coins Alert (Template ${templateType}) sent to ${reciver_email_id}`);
        return `Low Coins Alert ${templateType} Sent`;
    } catch (error) {
        console.error('❌ Error sending Low Rhofi Coins Alert:', error);
        throw new Error('Failed to send Low Rhofi Coins Alert');
    }
}

/**
 * =========================================================
 * FOREX PRICE ALERT
 * =========================================================
 */
async function sendForexPriceAlert(reciver_email_id, data) {
    const { 
        userName, 
        currencyPair, 
        country, 
        yesterdayValue, 
        todayValue, 
        difference, 
        percentageChange,
        reviewLink,
        changeType 
    } = data;
    
    const isGrowth = parseFloat(difference) > 0;
    const arrow = isGrowth ? '📈' : '📉';
    const color = isGrowth ? '#059669' : '#dc2626';
    const bgColor = isGrowth ? '#d1fae5' : '#fee2e2';
    const borderColor = isGrowth ? '#10b981' : '#f87171';
    const changeText = isGrowth ? 'Growth' : 'Loss';
    
    const mailOptions = {
        from: '"Rhofi Forex Alerts" <aswathck28@gmail.com>',
        to: reciver_email_id,
        subject: `${arrow} Forex Alert: ${currencyPair} ${changeType === 'higher' ? 'Increased' : 'Decreased'} Significantly`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto; border: 1px solid #eee; border-radius: 8px; padding: 20px; border-left: 5px solid ${color};">
                <div style="text-align: center; margin-bottom: 10px;">
                    <h1 style="color: #0E46A3; margin-bottom: 5px;">Rhofi</h1>
                    <p style="color: #64748b; font-size: 14px;">Forex Market Alert System</p>
                </div>
                
                <h2 style="color: ${color}; text-align: center; font-size: 20px; margin: 20px 0;">
                    ${arrow} Forex Price Alert
                </h2>
                
                <p style="font-size: 16px; color: #333; text-align: left;">
                    Hi ${userName},<br/><br/>
                    More changes in the currency value than yesterday 🛡️<br/><br/>
                    Price of ${country} (${currencyPair}) has changed significantly.
                </p>

                <div style="background-color: ${bgColor}; border-radius: 8px; padding: 20px; margin: 25px 0; border: 1px solid ${borderColor};">
                    <div style="text-align: center;">
                        <div style="display: inline-block; padding: 10px 20px; background-color: ${color}; color: white; border-radius: 20px; font-weight: bold; margin-bottom: 15px;">
                            ${changeType === 'higher' ? 'PRICE INCREASE' : 'PRICE DECREASE'}
                        </div>
                        
                        <div style="display: flex; justify-content: space-between; align-items: center; margin: 15px 0;">
                            <div style="text-align: center; flex: 1;">
                                <div style="font-size: 14px; color: #475569; margin-bottom: 5px;">Yesterday</div>
                                <div style="font-size: 22px; font-weight: bold; color: #64748b;">${yesterdayValue}</div>
                            </div>
                            <div style="font-size: 24px; color: ${color}; font-weight: bold;">→</div>
                            <div style="text-align: center; flex: 1;">
                                <div style="font-size: 14px; color: #475569; margin-bottom: 5px;">Today</div>
                                <div style="font-size: 22px; font-weight: bold; color: ${color};">${todayValue}</div>
                            </div>
                        </div>
                        
                        <div style="margin-top: 15px; padding: 10px; background-color: white; border-radius: 6px;">
                            <div style="font-size: 16px; color: ${color}; font-weight: bold;">
                                Difference: ${difference} (${percentageChange}%)
                            </div>
                            <div style="font-size: 12px; color: #64748b;">Change Type: ${changeText}</div>
                        </div>
                    </div>
                </div>

                <div style="text-align: center; margin: 30px 0;">
                    <a href="${reviewLink}" 
                       style="background-color: ${color}; 
                              color: white; 
                              padding: 12px 30px; 
                              text-decoration: none; 
                              border-radius: 4px; 
                              font-size: 16px;
                              font-weight: 500;
                              display: inline-block;">
                        👉 REVIEW THE ${changeText.toUpperCase()}
                    </a>
                </div>

                <p style="font-size: 14px; color: #555; text-align: center; line-height: 22px; font-style: italic;">
                    Monitoring is recommended for smooth operations 👀
                </p>

                <div style="background-color: #f8fafc; border-radius: 8px; padding: 15px; margin: 20px 0; font-size: 13px; color: #475569;">
                    <p style="margin: 5px 0;"><strong>Recommended actions:</strong></p>
                    <ul style="margin: 10px 0; padding-left: 20px;">
                        <li>Review your currency positions</li>
                        <li>Adjust stop-loss orders if needed</li>
                        <li>Monitor related currency pairs</li>
                        <li>Check economic calendar for news</li>
                    </ul>
                </div>

                <hr />
                
                <p style="font-size: 12px; color: #777; text-align: center;">
                    Rhofi Alerts<br/>
                    Rhofi Financial Technologies © ${new Date().getFullYear()}<br/>
                    This is an automated alert message.
                </p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Forex Price Alert sent to ${reciver_email_id} for ${currencyPair}`);
        return `Forex Alert Sent`;
    } catch (error) {
        console.error('❌ Error sending Forex Price Alert:', error);
        throw new Error('Failed to send Forex Price Alert');
    }
}

/**
 * =========================================================
 * SUBSCRIPTION PAYMENT PENDING ALERT
 * =========================================================
 */
async function sendSubscriptionPaymentPending(reciver_email_id, data) {
    const { userName, subscriptionName, amount, dueDate, paymentLink } = data;
    
    // Format due date
    const dueFormatted = new Date(dueDate).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const mailOptions = {
        from: '"Rhofi Billing" <aswathck28@gmail.com>',
        to: reciver_email_id,
        subject: `⚠️ Payment Pending for ${subscriptionName}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto; border: 1px solid #eee; border-radius: 8px; padding: 20px; border-left: 5px solid #dc2626;">
                <div style="text-align: center; margin-bottom: 10px;">
                    <h1 style="color: #0E46A3; margin-bottom: 5px;">Rhofi</h1>
                </div>
                
                <h2 style="color: #dc2626; text-align: center; font-size: 20px; margin: 20px 0;">
                    ⚠️ Payment Pending
                </h2>
                
                <p style="font-size: 16px; color: #333; text-align: left;">
                    Hi ${userName},<br/><br/>
                    Your payment bill is not paid<br/><br/>
                    Pay your bill to complete your subscription now.
                </p>

                <div style="background-color: #fee2e2; border-radius: 8px; padding: 20px; margin: 25px 0; border: 1px solid #f87171;">
                    <div style="text-align: center;">
                        <div style="font-size: 20px; color: #7f1d1d; margin-bottom: 10px;">${subscriptionName}</div>
                        <div style="font-size: 32px; font-weight: bold; color: #dc2626; margin: 10px 0;">₹${amount}</div>
                        <div style="font-size: 14px; color: #b91c1d;">Payment Due</div>
                        <div style="font-size: 12px; color: #dc2626; margin-top: 10px;">
                            <strong>Due Date: ${dueFormatted}</strong>
                        </div>
                    </div>
                </div>

                <div style="text-align: center; margin: 30px 0;">
                    <a href="${paymentLink}" 
                       style="background-color: #dc2626; 
                              color: white; 
                              padding: 12px 30px; 
                              text-decoration: none; 
                              border-radius: 4px; 
                              font-size: 16px;
                              font-weight: 500;
                              display: inline-block;">
                        👉 COMPLETE YOUR SUBSCRIPTION
                    </a>
                </div>

                <p style="font-size: 14px; color: #555; text-align: center; line-height: 22px; font-style: italic;">
                    A quick payment keeps your services uninterrupted ✨
                </p>

                <div style="background-color: #f8fafc; border-radius: 8px; padding: 15px; margin: 20px 0; font-size: 13px; color: #475569;">
                    <p style="margin: 5px 0;"><strong>What happens if not paid:</strong></p>
                    <ul style="margin: 10px 0; padding-left: 20px;">
                        <li>Service interruption</li>
                        <li>Loss of premium features</li>
                        <li>Data access restrictions</li>
                        <li>Additional late fees may apply</li>
                    </ul>
                </div>

                <hr />
                
                <p style="font-size: 12px; color: #777; text-align: center;">
                    Rhofi Billing Team<br/>
                    Rhofi Financial Technologies © ${new Date().getFullYear()}<br/>
                    This is an automated message. Please do not reply.
                </p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Subscription Payment Pending Alert sent to ${reciver_email_id}`);
        return `Payment Alert Sent`;
    } catch (error) {
        console.error('❌ Error sending Subscription Payment Pending Alert:', error);
        throw new Error('Failed to send Subscription Payment Pending Alert');
    }
}

/**
 * =========================================================
 * TRIAL USER IN-APP NOTIFICATION (FOR API USE)
 * =========================================================
 */
function getTrialUserInAppNotification(templateType = 1) {
    if (templateType === 1) {
        return {
            title: "🌟 Your trial is active",
            message: "Enjoying the experience so far? Sign up now.",
            action: "👉 Sign up now",
            type: "info",
            priority: "medium"
        };
    } else {
        return {
            title: "⏳ Trial Period Active",
            message: "Don't miss out on full features. Upgrade your account now.",
            action: "👉 Upgrade Now",
            type: "warning",
            priority: "high"
        };
    }
}

/**
 * =========================================================
 * WHATSAPP NOTIFICATION FOR ADMIN HIGH USAGE
 * =========================================================
 */
function getAdminWhatsappNotification(templateType = 1, data) {
    const { currentUserCount, averageUserCount, adminDashboardLink } = data;
    
    if (templateType === 1) {
        return {
            message: `🚨 *Rhofi Admin Alert*\n\nWe've observed a sudden increase in active users beyond normal operating levels.\n\n👥 *Current active users:*\n${currentUserCount}\n\n*This surge may impact:*\n• System performance\n• Resource utilization\n• Security monitoring\n\nA quick review is recommended to ensure everything is running smoothly.\n\n👉 *Open Admin Dashboard to review details*\n${adminDashboardLink}\n\n_Rhofi Alert System_`,
            priority: "high",
            type: "alert"
        };
    } else {
        return {
            message: `📈 *Rhofi Platform Alert*\n\nUser traffic has crossed expected thresholds\nPlatform activity is currently higher than usual.\n\n*This could indicate:*\n• Organic growth\n• Peak usage hours\n• Abnormal traffic patterns\n\n*We recommend monitoring:*\n• Server performance\n• Application stability\n• Error logs and alerts\n\n👥 Current users: ${currentUserCount}\n📊 Normal average: ${averageUserCount}\n\n👀 *Review system status here*\n${adminDashboardLink}\n\n_Rhofi Alert System_`,
            priority: "medium",
            type: "info"
        };
    }
}

/**
 * =========================================================
 * WHATSAPP NOTIFICATION FOR NETCOINS EXPIRY
 * =========================================================
 */
function getNetcoinsWhatsappNotification(templateType = 1, data) {
    const { netcoinsBalance, expiryDate, useNetcoinsLink } = data;
    
    if (templateType === 1) {
        return {
            message: `⏰ *NetCoins Expiry Alert*\n\nSome of your NetCoins will expire in 2 days.\n\n💰 *Current Balance:* ${netcoinsBalance} NetCoins\n📅 *Expiry Date:* ${new Date(expiryDate).toLocaleDateString()}\n\nDon't miss out on the rewards you've earned 💰\n\n👉 Use them now.\n\n${useNetcoinsLink}\n\n_Rhofi Rewards Team_`,
            priority: "high",
            type: "alert"
        };
    } else {
        return {
            message: `💰 *Reminder: NetCoins Expiring Soon*\n\nYour NetCoins balance is close to expiry.\n\n📊 *Balance:* ${netcoinsBalance} NetCoins\n⏳ *Expires in:* 2 days\n\nRedeem now to enjoy uninterrupted benefits.\n\n👉 Redeem your NetCoins here:\n${useNetcoinsLink}\n\n_Rhofi Rewards_`,
            priority: "medium",
            type: "reminder"
        };
    }
}

/**
 * =========================================================
 * WHATSAPP NOTIFICATION FOR ORDER EXPIRY
 * =========================================================
 */
function getOrderExpiryWhatsappNotification(templateType = 1, data) {
    const { orderId, orderName, expiryDate, actionLink } = data;
    
    if (templateType === 1) {
        return {
            message: `⏰ *Expiry Alert*\n\nSome of your Orders will expire in 2 days.\n\n📋 *Order:* ${orderName}\n🆔 *Order ID:* ${orderId}\n📅 *Expiry:* ${new Date(expiryDate).toLocaleDateString()}\n\nDon't miss out on the rewards you've earned 💰\n\n👉 Use them now.\n\n${actionLink}\n\n_Rhofi Orders Team_`,
            priority: "high",
            type: "alert"
        };
    } else {
        return {
            message: `💰 *Reminder: Order Expiring Soon*\n\nYour order is close to expiry.\n\n📦 *Order:* ${orderName}\n⏳ *Expires in:* 2 days\n\nRedeem now to enjoy uninterrupted benefits.\n\n👉 Take action here:\n${actionLink}\n\n_Rhofi Orders_`,
            priority: "medium",
            type: "reminder"
        };
    }
}

/**
 * =========================================================
 * WHATSAPP NOTIFICATION FOR NO ORDER UPDATES
 * =========================================================
 */
function getOrderNoUpdateWhatsappNotification(data) {
    const { orderId, orderName, updateLink } = data;
    
    return {
        message: `⚠️ *No update?*\n\nYour order details hadn't been updated.\n\n📋 *Order:* ${orderName}\n🆔 *Order ID:* ${orderId}\n\nUpdate them to get your reward.\n\n👉 Update them NOW:\n${updateLink}\n\n_Rhofi Orders Team_`,
        priority: "medium",
        type: "reminder"
    };
}

/**
 * =========================================================
 * WHATSAPP NOTIFICATION FOR SUBSCRIPTION EXPIRY
 * =========================================================
 */
function getSubscriptionExpiryWhatsappNotification(templateType = 1, data) {
    const { subscriptionName, expiryDate, renewLink } = data;
    
    if (templateType === 1) {
        return {
            message: `⏰ *Subscription Expiry Alert*\n\nSome of your Subscriptions will expire in 2 days.\n\n📋 *Subscription:* ${subscriptionName}\n📅 *Expiry:* ${new Date(expiryDate).toLocaleDateString()}\n\nDon't miss out on the rewards you've earned 💰\n\n👉 Renew now.\n\n${renewLink}\n\n_Rhofi Subscriptions Team_`,
            priority: "high",
            type: "alert"
        };
    } else {
        return {
            message: `💰 *Reminder: Subscription Expiring Soon*\n\nYour subscription is close to expiry.\n\n📦 *Subscription:* ${subscriptionName}\n⏳ *Expires in:* 2 days\n\nRenew now to enjoy uninterrupted benefits.\n\n👉 Renew here:\n${renewLink}\n\n_Rhofi Subscriptions_`,
            priority: "medium",
            type: "reminder"
    };
    }
}

/**
 * =========================================================
 * WHATSAPP NOTIFICATION FOR NO SUBSCRIPTION UPDATES
 * =========================================================
 */
function getSubscriptionNoUpdateWhatsappNotification(data) {
    const { subscriptionName, updateLink } = data;
    
    return {
        message: `⚠️ *No update?*\n\nYour subscription details hadn't been updated.\n\n📋 *Subscription:* ${subscriptionName}\n\nUpdate them to get your reward.\n\n👉 Update them NOW:\n${updateLink}\n\n_Rhofi Subscriptions Team_`,
        priority: "medium",
        type: "reminder"
    };
}

/**
 * =========================================================
 * WHATSAPP NOTIFICATION FOR LTP PRICE ALERT
 * =========================================================
 */
function getLTPPriceAlertWhatsappNotification(data) {
    const { stockName, symbol, closePrice, ltp, difference, percentage, chartLink } = data;
    
    const isPositive = parseFloat(difference) > 0;
    const arrow = isPositive ? '📈' : '📉';
    const trend = isPositive ? 'increased' : 'decreased';
    
    return {
        message: `${arrow} *Price Alert: Significant Deviation Detected*\n\n*Stock:* ${stockName} (${symbol})\n\n💰 *Previous Close:* ₹${closePrice}\n💹 *Current LTP:* ₹${ltp}\n📊 *Change:* ₹${difference} (${percentage}%)\n\nSignificant deviation detected! The price has ${trend} significantly from the previous close.\n\nReview your positions and take necessary action.\n\n🔗 *View Chart/Details*\n${chartLink}\n\n_Rhofi Trading Alerts_`,
        priority: "high",
        type: "alert"
    };
}

/**
 * =========================================================
 * IN-APP NOTIFICATION FOR WATCHLIST
 * =========================================================
 */
function getWatchlistNotificationAlert(data) {
    const { watchlistName } = data;
    
    return {
        title: "🔔 Notification Settings Required",
        message: `Please select Notification for email or whatsapp to get updates on your watchlist "${watchlistName}"`,
        action: "👉 Configure Notifications",
        type: "warning",
        priority: "medium",
        redirectTo: "/watchlist/notifications"
    };
}

// Export all functions
module.exports = {
    sendEmail,
    sentOTPMail,
    sentOTPUpdateMail,
    sendProfileUpdateConfirmation,
    sentOTPTrialUserUpdateMail,
    sendInactiveUserReminder,
    sendInactiveUserLongTime,
    sendAdminHighUsage,
    sendNetcoinsExpiryAlert,
    sendLowRhofiCoinsAlert,
    sendForexPriceAlert,
    sendSubscriptionPaymentPending,
    getTrialUserInAppNotification,
    getAdminWhatsappNotification,
    getNetcoinsWhatsappNotification,
    getOrderExpiryWhatsappNotification,
    getOrderNoUpdateWhatsappNotification,
    getSubscriptionExpiryWhatsappNotification,
    getSubscriptionNoUpdateWhatsappNotification,
    getLTPPriceAlertWhatsappNotification,
    getWatchlistNotificationAlert
};

// =========================================================
// USER SELECTION SWITCH STATEMENT (COMMAND LINE INTERFACE)
// =========================================================
if (require.main === module) {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    console.log('🔧 ==========================================');
    console.log('🔧 Rhofi Comprehensive Notification System');
    console.log('🔧 ==========================================');
    console.log('📧 Sender Email: aswathck28@gmail.com');
    console.log('🔄 Transporter configured with Gmail SMTP');
    console.log('');
    console.log('📋 Available Notification Types:');
    console.log('1️⃣  OTP_VERIFICATION - Account OTP');
    console.log('2️⃣  EMAIL_UPDATE_VERIFICATION - Email Update OTP');
    console.log('3️⃣  PROFILE_UPDATE_CONFIRMATION - Profile Update');
    console.log('4️⃣  TRIAL_USER_ACTIVATION - Trial User Activation');
    console.log('5️⃣  INACTIVE_USER_REMINDER - Inactive User Reminder');
    console.log('6️⃣  INACTIVE_USER_LONG_TIME - 2+ Days Inactive');
    console.log('7️⃣  ADMIN_HIGH_USAGE - Admin Alert for High Traffic');
    console.log('8️⃣  NETCOINS_EXPIRY_ALERT - NetCoins Expiring Soon');
    console.log('9️⃣  LOW_RHOFI_COINS_ALERT - Low Coin Balance');
    console.log('🔟  FOREX_PRICE_ALERT - Forex Price Changes');
    console.log('1️⃣1️⃣  SUBSCRIPTION_PAYMENT_PENDING - Payment Due');
    console.log('1️⃣2️⃣  TEST_ALL - Test all email types');
    console.log('1️⃣3️⃣  Exit');
    console.log('');

    async function mainMenu() {
        console.log('📝 Please select an option:');
        console.log('1. Send OTP Verification Email');
        console.log('2. Send Email Update Verification');
        console.log('3. Send Profile Update Confirmation');
        console.log('4. Send Trial User Activation');
        console.log('5. Send Inactive User Reminder');
        console.log('6. Send 2+ Days Inactive User Reminder');
        console.log('7. Send Admin High Usage Alert');
        console.log('8. Send NetCoins Expiry Alert');
        console.log('9. Send Low Rhofi Coins Alert');
        console.log('10. Send Forex Price Alert');
        console.log('11. Send Subscription Payment Pending');
        console.log('12. Generate Trial In-App Notification');
        console.log('13. Generate Admin WhatsApp Notification');
        console.log('14. Generate NetCoins WhatsApp Notification');
        console.log('15. Generate Order Expiry WhatsApp Notification');
        console.log('16. Generate Order No-Update WhatsApp Notification');
        console.log('17. Generate Subscription Expiry WhatsApp Notification');
        console.log('18. Generate Subscription No-Update WhatsApp Notification');
        console.log('19. Generate LTP Price Alert WhatsApp Notification');
        console.log('20. Generate Watchlist Notification Alert');
        console.log('21. Test All Email Types');
        console.log('22. Exit');
        console.log('');

        readline.question('Enter your choice (1-22): ', async (choice) => {
            const recipient = 'aswathck28@gmail.com'; // Change this to your test email
            
            try {
                switch (choice) {
                    case '1':
                        console.log('\n📤 Sending OTP Verification Email...');
                        const otp1 = await sendEmail('OTP_VERIFICATION', recipient, '123456');
                        console.log(`✅ Success! OTP: ${otp1}`);
                        break;
                        
                    case '2':
                        console.log('\n📤 Sending Email Update Verification...');
                        const otp2 = await sendEmail('EMAIL_UPDATE_VERIFICATION', recipient, '654321');
                        console.log(`✅ Success! OTP: ${otp2}`);
                        break;
                        
                    case '3':
                        console.log('\n📤 Sending Profile Update Confirmation...');
                        const profileData = {
                            email: { old: 'old@gmail.com', new: 'new@gmail.com' },
                            mobile: { old: '9876543210', new: '9123456789' },
                            whatsapp: { old: false, new: true }
                        };
                        const result3 = await sendEmail('PROFILE_UPDATE_CONFIRMATION', recipient, profileData);
                        console.log(`✅ Success! Result: ${result3}`);
                        break;
                        
                    case '4':
                        console.log('\n📤 Sending Trial User Activation...');
                        const otp4 = await sendEmail('TRIAL_USER_ACTIVATION', recipient, '789012');
                        console.log(`✅ Success! OTP: ${otp4}`);
                        break;
                        
                    case '5':
                        console.log('\n📤 Sending Inactive User Reminder...');
                        console.log('Select template type:');
                        console.log('1. Template 1: "We Miss You"');
                        console.log('2. Template 2: "We Saved Your Spot"');
                        
                        readline.question('Enter template choice (1 or 2): ', async (templateChoice) => {
                            const templateType = templateChoice === '2' ? 2 : 1;
                            const reminderData = {
                                userName: 'User',
                                loginLink: 'https://rhofi.com/login',
                                templateType: templateType
                            };
                            const result5 = await sendEmail('INACTIVE_USER_REMINDER', recipient, reminderData);
                            console.log(`✅ Success! Sent Template ${templateType}. Result: ${result5}`);
                            continueAfterSend();
                        });
                        return;
                        
                    case '6':
                        console.log('\n📤 Sending 2+ Days Inactive User Reminder...');
                        console.log('Select template type:');
                        console.log('1. Template 1: "It\'s been a while"');
                        console.log('2. Template 2: "Your next step is waiting"');
                        
                        readline.question('Enter template choice (1 or 2): ', async (templateChoice) => {
                            const templateType = templateChoice === '2' ? 2 : 1;
                            const days = templateType === 2 ? '3' : 'few';
                            const longTimeData = {
                                userName: 'User',
                                loginLink: 'https://rhofi.com/login',
                                days: days,
                                templateType: templateType
                            };
                            const result6 = await sendEmail('INACTIVE_USER_LONG_TIME', recipient, longTimeData);
                            console.log(`✅ Success! Sent Template ${templateType}. Result: ${result6}`);
                            continueAfterSend();
                        });
                        return;
                        
                    case '7':
                        console.log('\n📤 Sending Admin High Usage Alert...');
                        console.log('Select template type:');
                        console.log('1. Template 1: "Platform activity is higher"');
                        console.log('2. Template 2: "More users, more activity"');
                        
                        readline.question('Enter template choice (1 or 2): ', async (templateChoice) => {
                            const templateType = templateChoice === '2' ? 2 : 1;
                            const adminData = {
                                adminName: 'Admin User',
                                adminDashboardLink: 'https://rhofi.com/admin',
                                currentUserCount: 1250,
                                averageUserCount: 850,
                                templateType: templateType
                            };
                            const result7 = await sendEmail('ADMIN_HIGH_USAGE', recipient, adminData);
                            console.log(`✅ Success! Sent Template ${templateType}. Result: ${result7}`);
                            
                            // Also show WhatsApp message
                            const whatsappMsg = getAdminWhatsappNotification(templateType, adminData);
                            console.log('\n📱 WhatsApp Notification Content:');
                            console.log('='.repeat(50));
                            console.log(whatsappMsg.message);
                            console.log('='.repeat(50));
                            
                            continueAfterSend();
                        });
                        return;
                        
                    case '8':
                        console.log('\n📤 Sending NetCoins Expiry Alert...');
                        console.log('Select template type:');
                        console.log('1. Template 1: "NetCoins about to expire"');
                        console.log('2. Template 2: "Rewards are waiting"');
                        
                        readline.question('Enter template choice (1 or 2): ', async (templateChoice) => {
                            const templateType = templateChoice === '2' ? 2 : 1;
                            const expiryDate = new Date();
                            expiryDate.setDate(expiryDate.getDate() + 2);
                            
                            const netcoinsData = {
                                userName: 'User',
                                netcoinsBalance: 1500,
                                expiryDate: expiryDate.toISOString(),
                                useNetcoinsLink: 'https://rhofi.com/redeem-netcoins',
                                templateType: templateType
                            };
                            const result8 = await sendEmail('NETCOINS_EXPIRY_ALERT', recipient, netcoinsData);
                            console.log(`✅ Success! Sent Template ${templateType}. Result: ${result8}`);
                            
                            // Also show WhatsApp message
                            const netcoinsWhatsapp = getNetcoinsWhatsappNotification(templateType, netcoinsData);
                            console.log('\n📱 WhatsApp Notification Content:');
                            console.log('='.repeat(50));
                            console.log(netcoinsWhatsapp.message);
                            console.log('='.repeat(50));
                            
                            continueAfterSend();
                        });
                        return;
                        
                    case '9':
                        console.log('\n📤 Sending Low Rhofi Coins Alert...');
                        console.log('Select template type:');
                        console.log('1. Template 1: "Low Rhofi Coin balance"');
                        console.log('2. Template 2: "Running low on Rhofi Coins"');
                        
                        readline.question('Enter template choice (1 or 2): ', async (templateChoice) => {
                            const templateType = templateChoice === '2' ? 2 : 1;
                            const lowCoinsData = {
                                userName: 'User',
                                currentBalance: 75,
                                addCoinsLink: 'https://rhofi.com/add-coins',
                                templateType: templateType
                            };
                            const result9 = await sendEmail('LOW_RHOFI_COINS_ALERT', recipient, lowCoinsData);
                            console.log(`✅ Success! Sent Template ${templateType}. Result: ${result9}`);
                            continueAfterSend();
                        });
                        return;
                        
                    case '10':
                        console.log('\n📤 Sending Forex Price Alert...');
                        
                        const forexData = {
                            userName: 'User',
                            currencyPair: 'USD/INR',
                            country: 'US Dollar to Indian Rupee',
                            yesterdayValue: '83.45',
                            todayValue: '84.20',
                            difference: '+0.75',
                            percentageChange: '+0.90%',
                            reviewLink: 'https://rhofi.com/forex/usd-inr',
                            changeType: 'higher'
                        };
                        const result10 = await sendEmail('FOREX_PRICE_ALERT', recipient, forexData);
                        console.log(`✅ Success! Forex Alert Sent. Result: ${result10}`);
                        break;
                        
                    case '11':
                        console.log('\n📤 Sending Subscription Payment Pending...');
                        
                        const dueDate = new Date();
                        dueDate.setDate(dueDate.getDate() + 3);
                        
                        const subscriptionData = {
                            userName: 'User',
                            subscriptionName: 'Premium Trading Plan',
                            amount: 2999,
                            dueDate: dueDate.toISOString(),
                            paymentLink: 'https://rhofi.com/payment'
                        };
                        const result11 = await sendEmail('SUBSCRIPTION_PAYMENT_PENDING', recipient, subscriptionData);
                        console.log(`✅ Success! Payment Alert Sent. Result: ${result11}`);
                        break;
                        
                    case '12':
                        console.log('\n📱 Trial User In-App Notification:');
                        console.log('Select template type (1 or 2):');
                        readline.question('Enter template choice: ', (templateChoice) => {
                            const templateType = templateChoice === '2' ? 2 : 1;
                            const notification = getTrialUserInAppNotification(templateType);
                            console.log('\n🎯 In-App Notification Generated:');
                            console.log('='.repeat(50));
                            console.log(`Title: ${notification.title}`);
                            console.log(`Message: ${notification.message}`);
                            console.log(`Action: ${notification.action}`);
                            console.log(`Type: ${notification.type}`);
                            console.log(`Priority: ${notification.priority}`);
                            console.log('='.repeat(50));
                            continueAfterSend();
                        });
                        return;
                        
                    case '13':
                        console.log('\n📱 Admin WhatsApp Notification:');
                        console.log('Select template type (1 or 2):');
                        readline.question('Enter template choice: ', (templateChoice) => {
                            const templateType = templateChoice === '2' ? 2 : 1;
                            const adminData = {
                                currentUserCount: 1250,
                                averageUserCount: 850,
                                adminDashboardLink: 'https://rhofi.com/admin'
                            };
                            const whatsappMsg = getAdminWhatsappNotification(templateType, adminData);
                            console.log('\n📱 WhatsApp Notification Generated:');
                            console.log('='.repeat(50));
                            console.log(whatsappMsg.message);
                            console.log('='.repeat(50));
                            console.log(`Type: ${whatsappMsg.type}`);
                            console.log(`Priority: ${whatsappMsg.priority}`);
                            continueAfterSend();
                        });
                        return;
                        
                    case '14':
                        console.log('\n📱 NetCoins WhatsApp Notification:');
                        console.log('Select template type (1 or 2):');
                        readline.question('Enter template choice: ', (templateChoice) => {
                            const templateType = templateChoice === '2' ? 2 : 1;
                            const expiryDate = new Date();
                            expiryDate.setDate(expiryDate.getDate() + 2);
                            
                            const netcoinsData = {
                                netcoinsBalance: 1500,
                                expiryDate: expiryDate.toISOString(),
                                useNetcoinsLink: 'https://rhofi.com/redeem-netcoins'
                            };
                            const whatsappMsg = getNetcoinsWhatsappNotification(templateType, netcoinsData);
                            console.log('\n📱 WhatsApp Notification Generated:');
                            console.log('='.repeat(50));
                            console.log(whatsappMsg.message);
                            console.log('='.repeat(50));
                            console.log(`Type: ${whatsappMsg.type}`);
                            console.log(`Priority: ${whatsappMsg.priority}`);
                            continueAfterSend();
                        });
                        return;
                        
                    case '15':
                        console.log('\n📱 Order Expiry WhatsApp Notification:');
                        console.log('Select template type (1 or 2):');
                        readline.question('Enter template choice: ', (templateChoice) => {
                            const templateType = templateChoice === '2' ? 2 : 1;
                            const expiryDate = new Date();
                            expiryDate.setDate(expiryDate.getDate() + 2);
                            
                            const orderData = {
                                orderId: 'ORD123456',
                                orderName: 'Limit Buy Order - RELIANCE',
                                expiryDate: expiryDate.toISOString(),
                                actionLink: 'https://rhofi.com/orders/ORD123456'
                            };
                            const whatsappMsg = getOrderExpiryWhatsappNotification(templateType, orderData);
                            console.log('\n📱 WhatsApp Notification Generated:');
                            console.log('='.repeat(50));
                            console.log(whatsappMsg.message);
                            console.log('='.repeat(50));
                            console.log(`Type: ${whatsappMsg.type}`);
                            console.log(`Priority: ${whatsappMsg.priority}`);
                            continueAfterSend();
                        });
                        return;
                        
                    case '16':
                        console.log('\n📱 Order No-Update WhatsApp Notification:');
                        
                        const orderNoUpdateData = {
                            orderId: 'ORD789012',
                            orderName: 'Market Sell Order - TCS',
                            updateLink: 'https://rhofi.com/orders/ORD789012/update'
                        };
                        const orderNoUpdateMsg = getOrderNoUpdateWhatsappNotification(orderNoUpdateData);
                        console.log('\n📱 WhatsApp Notification Generated:');
                        console.log('='.repeat(50));
                        console.log(orderNoUpdateMsg.message);
                        console.log('='.repeat(50));
                        console.log(`Type: ${orderNoUpdateMsg.type}`);
                        console.log(`Priority: ${orderNoUpdateMsg.priority}`);
                        break;
                        
                    case '17':
                        console.log('\n📱 Subscription Expiry WhatsApp Notification:');
                        console.log('Select template type (1 or 2):');
                        readline.question('Enter template choice: ', (templateChoice) => {
                            const templateType = templateChoice === '2' ? 2 : 1;
                            const expiryDate = new Date();
                            expiryDate.setDate(expiryDate.getDate() + 2);
                            
                            const subscriptionExpiryData = {
                                subscriptionName: 'Premium Trading Plan',
                                expiryDate: expiryDate.toISOString(),
                                renewLink: 'https://rhofi.com/subscriptions/renew'
                            };
                            const whatsappMsg = getSubscriptionExpiryWhatsappNotification(templateType, subscriptionExpiryData);
                            console.log('\n📱 WhatsApp Notification Generated:');
                            console.log('='.repeat(50));
                            console.log(whatsappMsg.message);
                            console.log('='.repeat(50));
                            console.log(`Type: ${whatsappMsg.type}`);
                            console.log(`Priority: ${whatsappMsg.priority}`);
                            continueAfterSend();
                        });
                        return;
                        
                    case '18':
                        console.log('\n📱 Subscription No-Update WhatsApp Notification:');
                        
                        const subscriptionNoUpdateData = {
                            subscriptionName: 'Basic Trading Plan',
                            updateLink: 'https://rhofi.com/subscriptions/update'
                        };
                        const subscriptionNoUpdateMsg = getSubscriptionNoUpdateWhatsappNotification(subscriptionNoUpdateData);
                        console.log('\n📱 WhatsApp Notification Generated:');
                        console.log('='.repeat(50));
                        console.log(subscriptionNoUpdateMsg.message);
                        console.log('='.repeat(50));
                        console.log(`Type: ${subscriptionNoUpdateMsg.type}`);
                        console.log(`Priority: ${subscriptionNoUpdateMsg.priority}`);
                        break;
                        
                    case '19':
                        console.log('\n📱 LTP Price Alert WhatsApp Notification:');
                        
                        const ltpData = {
                            stockName: 'Reliance Industries',
                            symbol: 'RELIANCE',
                            closePrice: '2850.50',
                            ltp: '2925.75',
                            difference: '+75.25',
                            percentage: '+2.64%',
                            chartLink: 'https://rhofi.com/stocks/RELIANCE/chart'
                        };
                        const ltpMsg = getLTPPriceAlertWhatsappNotification(ltpData);
                        console.log('\n📱 WhatsApp Notification Generated:');
                        console.log('='.repeat(50));
                        console.log(ltpMsg.message);
                        console.log('='.repeat(50));
                        console.log(`Type: ${ltpMsg.type}`);
                        console.log(`Priority: ${ltpMsg.priority}`);
                        break;
                        
                    case '20':
                        console.log('\n📱 Watchlist Notification Alert:');
                        
                        const watchlistData = {
                            watchlistName: 'Tech Stocks'
                        };
                        const watchlistNotification = getWatchlistNotificationAlert(watchlistData);
                        console.log('\n🎯 In-App Notification Generated:');
                        console.log('='.repeat(50));
                        console.log(`Title: ${watchlistNotification.title}`);
                        console.log(`Message: ${watchlistNotification.message}`);
                        console.log(`Action: ${watchlistNotification.action}`);
                        console.log(`Type: ${watchlistNotification.type}`);
                        console.log(`Priority: ${watchlistNotification.priority}`);
                        console.log(`Redirect: ${watchlistNotification.redirectTo}`);
                        console.log('='.repeat(50));
                        break;
                        
                    case '21':
                        console.log('\n🧪 Testing All Email Types...');
                        
                        const tests = [
                            { name: 'OTP Verification', type: 'OTP_VERIFICATION', data: '111111' },
                            { name: 'Email Update Verification', type: 'EMAIL_UPDATE_VERIFICATION', data: '222222' },
                            { name: 'Profile Update Confirmation', type: 'PROFILE_UPDATE_CONFIRMATION', data: {
                                email: { old: 'testold@gmail.com', new: 'testnew@gmail.com' },
                                mobile: { old: '9111111111', new: '9222222222' }
                            }},
                            { name: 'Trial User Activation', type: 'TRIAL_USER_ACTIVATION', data: '333333' },
                            { name: 'Inactive User Reminder (Template 1)', type: 'INACTIVE_USER_REMINDER', data: {
                                userName: 'Test User',
                                loginLink: 'https://rhofi.com/login',
                                templateType: 1
                            }},
                            { name: 'Inactive User Reminder (Template 2)', type: 'INACTIVE_USER_REMINDER', data: {
                                userName: 'Test User',
                                loginLink: 'https://rhofi.com/login',
                                templateType: 2
                            }},
                            { name: '2+ Days Inactive (Template 1)', type: 'INACTIVE_USER_LONG_TIME', data: {
                                userName: 'Test User',
                                loginLink: 'https://rhofi.com/login',
                                days: '3',
                                templateType: 1
                            }},
                            { name: '2+ Days Inactive (Template 2)', type: 'INACTIVE_USER_LONG_TIME', data: {
                                userName: 'Test User',
                                loginLink: 'https://rhofi.com/login',
                                days: '3',
                                templateType: 2
                            }},
                            { name: 'Admin High Usage (Template 1)', type: 'ADMIN_HIGH_USAGE', data: {
                                adminName: 'Test Admin',
                                adminDashboardLink: 'https://rhofi.com/admin',
                                currentUserCount: 1200,
                                averageUserCount: 800,
                                templateType: 1
                            }},
                            { name: 'Admin High Usage (Template 2)', type: 'ADMIN_HIGH_USAGE', data: {
                                adminName: 'Test Admin',
                                adminDashboardLink: 'https://rhofi.com/admin',
                                currentUserCount: 1200,
                                averageUserCount: 800,
                                templateType: 2
                            }},
                            { name: 'NetCoins Expiry Alert (Template 1)', type: 'NETCOINS_EXPIRY_ALERT', data: {
                                userName: 'Test User',
                                netcoinsBalance: 1500,
                                expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
                                useNetcoinsLink: 'https://rhofi.com/redeem',
                                templateType: 1
                            }},
                            { name: 'Low Rhofi Coins Alert (Template 1)', type: 'LOW_RHOFI_COINS_ALERT', data: {
                                userName: 'Test User',
                                currentBalance: 75,
                                addCoinsLink: 'https://rhofi.com/add-coins',
                                templateType: 1
                            }},
                            { name: 'Forex Price Alert', type: 'FOREX_PRICE_ALERT', data: {
                                userName: 'Test User',
                                currencyPair: 'USD/INR',
                                country: 'US Dollar to Indian Rupee',
                                yesterdayValue: '83.45',
                                todayValue: '84.20',
                                difference: '+0.75',
                                percentageChange: '+0.90%',
                                reviewLink: 'https://rhofi.com/forex',
                                changeType: 'higher'
                            }},
                            { name: 'Subscription Payment Pending', type: 'SUBSCRIPTION_PAYMENT_PENDING', data: {
                                userName: 'Test User',
                                subscriptionName: 'Premium Plan',
                                amount: 2999,
                                dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
                                paymentLink: 'https://rhofi.com/payment'
                            }}
                        ];
                        
                        for (let i = 0; i < tests.length; i++) {
                            console.log(`${i+1}. ${tests[i].name}...`);
                            await sendEmail(tests[i].type, recipient, tests[i].data);
                            if (i < tests.length - 1) {
                                await new Promise(resolve => setTimeout(resolve, 1000));
                            }
                        }
                        
                        console.log('\n🎉 All tests completed!');
                        console.log(`📨 Check your email for all ${tests.length} test emails.`);
                        break;
                        
                    case '22':
                        console.log('\n👋 Exiting... Goodbye!');
                        readline.close();
                        process.exit(0);
                        return;
                        
                    default:
                        console.log('\n❌ Invalid choice! Please enter 1-22.');
                        break;
                }
                
                // Helper function to continue after send
                function continueAfterSend() {
                    console.log('\n📨 Please check your email inbox (and spam folder).');
                    console.log('─────────────────────────────────────────');
                    
                    readline.question('\nDo you want to send another notification? (y/n): ', (answer) => {
                        if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
                            console.log('');
                            mainMenu();
                        } else {
                            console.log('\n👋 Goodbye!');
                            readline.close();
                        }
                    });
                }
                
                if (choice !== '5' && choice !== '6' && choice !== '7' && choice !== '8' && 
                    choice !== '9' && choice !== '12' && choice !== '13' && choice !== '14' && 
                    choice !== '15' && choice !== '17') {
                    continueAfterSend();
                }
                
            } catch (error) {
                console.error('\n❌ Error:', error.message);
                console.error('\nPossible issues:');
                console.error('1. Incorrect email credentials');
                console.error('2. Gmail blocking "less secure apps"');
                console.error('3. App password might be expired');
                console.error('4. Network connection issue');
                console.error('\nSolution:');
                console.error('1. Check if password is correct');
                console.error('2. Enable 2FA and use app password');
                console.error('3. Check Gmail security settings');
                
                readline.question('\nPress Enter to continue...', () => {
                    mainMenu();
                });
            }
        });
    }

    // Start the menu
    mainMenu();
}