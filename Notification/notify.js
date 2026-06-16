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
                        <span style="color: red;">Do not share</span> this code with anyone for your accounts security.
                    </p>
                    <hr />
                    <p style="font-size: 12px; color: #777; text-align: center;">
                        Rhofi Financial Technologies  ${new Date().getFullYear()}<br/>
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
            <div style="font-weight: 500; color: #022434; margin-bottom: 5px;">✨ Email Address</div>
            <div style="font-size: 13px; color: #666;">
                <span style="text-decoration: line-through; color: #999;">${updatedFields.email.old || 'N/A'}</span>
                →
                <span style="color: #13A04E; font-weight: 500;">${updatedFields.email.new}</span>
            </div>
        </li>`;
    }
    
    if (updatedFields.mobile) {
        updatedFieldsList += `<li style="margin: 15px 0; padding: 10px; background: white; border-radius: 4px;">
            <div style="font-weight: 500; color: #022434; margin-bottom: 5px;">📱 Mobile Number</div>
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
        const oldEmoji = updatedFields.whatsapp.old ? '✅' : '🔕';
        const newEmoji = updatedFields.whatsapp.new ? '✅' : '🔕';
        updatedFieldsList += `<li style="margin: 15px 0; padding: 10px; background: white; border-radius: 4px;">
            <div style="font-weight: 500; color: #022434; margin-bottom: 5px;">💬 WhatsApp Notifications</div>
            <div style="font-size: 13px; color: #666;">
                <span style="text-decoration: line-through; color: #999;">${oldEmoji} ${oldStatus}</span>
                →
                <span style="color: #13A04E; font-weight: 500;">${newEmoji} ${newStatus}</span>
            </div>
        </li>`;
    }

    const mailOptions = {
        from: '"Rhofi Financial Technologies" <aswathck28@gmail.com>',
        to: reciver_email_id,
        subject: '✅ Profile Updated Successfully! Your Rhofi Account is Now More Secure',
        html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 520px; margin: auto; border: 1px solid #e8f4ff; border-radius: 12px; padding: 30px; background: linear-gradient(135deg, #ffffff 0%, #f8fbff 100%); box-shadow: 0 10px 30px rgba(14, 70, 163, 0.08);">
                <div style="text-align: center; margin-bottom: 20px;">
                    <div style="display: inline-block; background: linear-gradient(135deg, #0E46A3 0%, #1e88e5 100%); padding: 12px 24px; border-radius: 50px; margin-bottom: 15px;">
                        <h1 style="color: white; margin: 0; font-size: 28px; letter-spacing: 0.5px;">✨ Rhofi</h1>
                    </div>
                    <p style="color: #64748b; font-size: 14px; margin-top: 8px;">Smart Investing, Simplified</p>
                </div>
                
                <div style="text-align: center; margin: 30px 0;">
                    <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #13A04E 0%, #4caf50 100%); border-radius: 50%; margin: 0 auto; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 20px rgba(19, 160, 78, 0.3);">
                        <span style="color: white; font-size: 40px; font-weight: bold;">✓</span>
                    </div>
                </div>

                <h2 style="color: #022434; text-align: center; font-size: 26px; margin: 20px 0; font-weight: 700; letter-spacing: -0.5px;">
                    Your Profile Has Been Successfully Updated! 🎉
                </h2>
                
                <p style="font-size: 16px; color: #464646; text-align: center; line-height: 28px; font-weight: 400;">
                    Fantastic news! Your account information has been securely updated. Here's what we've successfully refreshed for you:
                </p>

                <div style="background: linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%); border-radius: 12px; padding: 25px; margin: 30px 0; border: 1px solid #e0f2fe; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);">
                    <h3 style="color: #0E46A3; text-align: center; font-size: 18px; margin-bottom: 20px; display: flex; align-items: center; justify-content: center; gap: 10px;">
                        <span>📋</span> Updated Information
                    </h3>
                    <ul style="list-style: none; padding: 0; margin: 0; font-size: 15px;">
                        ${updatedFieldsList}
                    </ul>
                </div>

                <div style="background: linear-gradient(135deg, #e3f2fd 0%, #f0f9ff 100%); border-left: 4px solid #0E46A3; padding: 20px; margin: 25px 0; border-radius: 8px;">
                    <p style="font-size: 15px; color: #022434; text-align: center; line-height: 24px; margin: 0;">
                        <span style="font-weight: 600;">💡 Pro Tip:</span> Keeping your information current ensures you never miss important market updates, personalized insights, and exclusive opportunities tailored just for you!
                    </p>
                </div>

                <p style="font-size: 14px; color: #555; text-align: center; line-height: 24px; padding: 15px; background: #fff8e1; border-radius: 8px; border: 1px solid #ffecb3;">
                    <span style="font-weight: 600; color: #d84315;">🔒 Security Alert:</span> If you didn't authorize these changes, please contact our support team immediately. Your security is our top priority.
                </p>

                <div style="text-align: center; margin: 35px 0;">
                    <a href="https://rhofi.com/support" 
                       style="background: linear-gradient(135deg, #0E46A3 0%, #1565c0 100%); 
                              color: white; 
                              padding: 15px 35px; 
                              text-decoration: none; 
                              border-radius: 8px; 
                              font-size: 16px;
                              font-weight: 600;
                              display: inline-block;
                              box-shadow: 0 5px 15px rgba(14, 70, 163, 0.3);
                              transition: all 0.3s ease;">
                        🛡️ Get Immediate Support
                    </a>
                </div>

                <div style="text-align: center; margin: 30px 0;">
                    <p style="font-size: 15px; color: #666; line-height: 24px;">
                        Your journey to smarter investing continues!<br>
                        <span style="font-style: italic; color: #0E46A3;">Stay updated, stay ahead with Rhofi! 💫</span>
                    </p>
                </div>

                <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #e0e0e0, transparent); margin: 30px 0;" />
                
                <div style="text-align: center;">
                    <p style="font-size: 12px; color: #888; line-height: 20px;">
                        <span style="color: #0E46A3; font-weight: 600;">Rhofi Financial Technologies</span> © ${new Date().getFullYear()}<br>
                        Empowering your financial journey with intelligence and innovation<br>
                        📧 <a href="mailto:support@rhofi.com" style="color: #0E46A3; text-decoration: none;">support@rhofi.com</a> | 🌐 <a href="https://rhofi.com" style="color: #0E46A3; text-decoration: none;">rhofi.com</a>
                    </p>
                    <p style="font-size: 11px; color: #aaa; margin-top: 10px;">
                        This is an automated message. Please do not reply directly to this email.<br>
                        For assistance, visit our support portal.
                    </p>
                </div>
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
 * INACTIVE USER REMINDER (2 TEMPLATES)
 * =========================================================
 */
async function sendInactiveUserReminder(reciver_email_id, data) {
    const { userName, loginLink, templateType = 1 } = data;
    
    // Choose template based on templateType
    let htmlTemplate;
    let subject;
    
    if (templateType === 1) {
        subject = `We Miss You, ${userName}! 🌟 Your Personal Dashboard Awaits Your Return`;
        htmlTemplate = `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 520px; margin: auto; border: 1px solid #e8f4ff; border-radius: 12px; padding: 30px; background: linear-gradient(135deg, #ffffff 0%, #f8fbff 100%); box-shadow: 0 10px 30px rgba(14, 70, 163, 0.08);">
                <div style="text-align: center; margin-bottom: 20px;">
                    <div style="display: inline-block; background: linear-gradient(135deg, #0E46A3 0%, #1e88e5 100%); padding: 12px 24px; border-radius: 50px; margin-bottom: 15px;">
                        <h1 style="color: white; margin: 0; font-size: 28px; letter-spacing: 0.5px;">💎 Rhofi</h1>
                    </div>
                </div>
                
                <div style="text-align: center; margin: 25px 0;">
                    <div style="display: inline-block; background: #fff3e0; padding: 15px; border-radius: 50%;">
                        <span style="font-size: 48px;">💙</span>
                    </div>
                </div>
                
                <p style="font-size: 18px; color: #022434; text-align: left; line-height: 32px; padding: 20px; background: #f0f9ff; border-radius: 10px; border-left: 4px solid #0E46A3;">
                    <span style="font-weight: 700;">Hi ${userName},</span><br/><br/>
                    Your personalized dashboard misses your presence! 💙<br/><br/>
                    While you've been away, your account has been diligently maintained and is ready to welcome you back with open arms. There are exciting updates, fresh market insights, and personalized opportunities waiting just for you.
                </p>

                <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e3f2fd 100%); border-radius: 12px; padding: 25px; margin: 30px 0; border: 1px solid #bbdefb;">
                    <h3 style="color: #0E46A3; text-align: center; font-size: 20px; margin-bottom: 20px; display: flex; align-items: center; justify-content: center; gap: 10px;">
                        <span>🚀</span> What Awaits You Inside:
                    </h3>
                    <ul style="list-style: none; padding: 0; margin: 0; font-size: 15px;">
                        <li style="margin: 12px 0; padding: 12px; background: white; border-radius: 8px; display: flex; align-items: center; gap: 12px;">
                            <span style="background: #e8f5e9; padding: 8px; border-radius: 6px; font-size: 20px;">📈</span>
                            <span><strong>Fresh Market Insights:</strong> Latest trends and opportunities curated for your portfolio</span>
                        </li>
                        <li style="margin: 12px 0; padding: 12px; background: white; border-radius: 8px; display: flex; align-items: center; gap: 12px;">
                            <span style="background: #e3f2fd; padding: 8px; border-radius: 6px; font-size: 20px;">🔔</span>
                            <span><strong>Personalized Alerts:</strong> Notifications about your favorite stocks and sectors</span>
                        </li>
                        <li style="margin: 12px 0; padding: 12px; background: white; border-radius: 8px; display: flex; align-items: center; gap: 12px;">
                            <span style="background: #f3e5f5; padding: 8px; border-radius: 6px; font-size: 20px;">💡</span>
                            <span><strong>Smart Recommendations:</strong> AI-powered suggestions based on your investment style</span>
                        </li>
                    </ul>
                </div>

                <div style="text-align: center; margin: 40px 0;">
                    <a href="${loginLink}" 
                       style="background: linear-gradient(135deg, #0E46A3 0%, #1565c0 100%); 
                              color: white; 
                              padding: 18px 45px; 
                              text-decoration: none; 
                              border-radius: 10px; 
                              font-size: 18px;
                              font-weight: 700;
                              display: inline-flex;
                              align-items: center;
                              gap: 15px;
                              box-shadow: 0 8px 20px rgba(14, 70, 163, 0.4);
                              transition: all 0.3s ease;">
                        <span style="font-size: 24px;">👉</span> 
                        <span>RESUME YOUR JOURNEY NOW</span>
                    </a>
                </div>

                <div style="text-align: center; margin: 20px 0; padding: 15px; background: #fff8e1; border-radius: 8px; border: 1px dashed #ffb74d;">
                    <p style="font-size: 14px; color: #5d4037;">
                        <strong>Quick Access Link:</strong><br/>
                        <a href="${loginLink}" style="color: #0E46A3; word-break: break-all; text-decoration: none; font-weight: 500;">${loginLink}</a>
                    </p>
                </div>

                <p style="font-size: 16px; color: #555; text-align: center; line-height: 28px; font-style: italic; padding: 20px; background: #f9fbe7; border-radius: 10px;">
                    "The best time to invest was yesterday. The second best time is now."<br/>
                    <span style="font-weight: 600; color: #0E46A3;">We'll be right here when you return to continue your success story! ✨</span>
                </p>

                <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #e0e0e0, transparent); margin: 30px 0;" />
                
                <div style="text-align: center;">
                    <p style="font-size: 12px; color: #888; line-height: 20px;">
                        <span style="color: #0E46A3; font-weight: 600;">Rhofi Team</span><br/>
                        <span style="color: #666;">Dedicated to your financial growth and success</span><br/>
                        Rhofi Financial Technologies © ${new Date().getFullYear()}
                    </p>
                    <p style="font-size: 11px; color: #aaa; margin-top: 10px;">
                        This is an automated message. Your journey matters to us! 💫
                    </p>
                </div>
            </div>
        `;
    } else {
        subject = `${userName}, Your VIP Seat is Reserved! 🎯 Exclusive Updates Await Your Return`;
        htmlTemplate = `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 520px; margin: auto; border: 1px solid #e8f5e9; border-radius: 12px; padding: 30px; background: linear-gradient(135deg, #ffffff 0%, #f1f8e9 100%); box-shadow: 0 10px 30px rgba(19, 160, 78, 0.08);">
                <div style="text-align: center; margin-bottom: 20px;">
                    <div style="display: inline-block; background: linear-gradient(135deg, #13A04E 0%, #4caf50 100%); padding: 12px 24px; border-radius: 50px; margin-bottom: 15px;">
                        <h1 style="color: white; margin: 0; font-size: 28px; letter-spacing: 0.5px;">🌟 Rhofi</h1>
                    </div>
                </div>
                
                <div style="text-align: center; margin: 25px 0;">
                    <div style="display: inline-block; background: #e8f5e9; padding: 15px; border-radius: 50%;">
                        <span style="font-size: 48px;">😉</span>
                    </div>
                </div>
                
                <p style="font-size: 18px; color: #022434; text-align: left; line-height: 32px; padding: 20px; background: #f1f8e9; border-radius: 10px; border-left: 4px solid #13A04E;">
                    <span style="font-weight: 700;">Hi ${userName},</span><br/><br/>
                    We've saved your VIP spot just for you! 🎯<br/><br/>
                    While the markets never sleep, we've been carefully curating opportunities and insights specifically tailored to your investment profile. Everything is perfectly set up and waiting for your expert touch.
                </p>

                <div style="background: linear-gradient(135deg, #f1f8e9 0%, #e8f5e9 100%); border-radius: 12px; padding: 25px; margin: 30px 0; border: 1px solid #c8e6c9;">
                    <h3 style="color: #13A04E; text-align: center; font-size: 20px; margin-bottom: 20px; display: flex; align-items: center; justify-content: center; gap: 10px;">
                        <span>💎</span> Your Exclusive Perks Are Active:
                    </h3>
                    <ul style="list-style: none; padding: 0; margin: 0; font-size: 15px;">
                        <li style="margin: 12px 0; padding: 12px; background: white; border-radius: 8px; display: flex; align-items: center; gap: 12px;">
                            <span style="background: #f3e5f5; padding: 8px; border-radius: 6px; font-size: 20px;">📊</span>
                            <span><strong>Portfolio Analysis:</strong> Detailed performance metrics and growth projections</span>
                        </li>
                        <li style="margin: 12px 0; padding: 12px; background: white; border-radius: 8px; display: flex; align-items: center; gap: 12px;">
                            <span style="background: #e8f4ff; padding: 8px; border-radius: 6px; font-size: 20px;">🎯</span>
                            <span><strong>Personalized Watchlists:</strong> Curated stocks matching your investment strategy</span>
                        </li>
                        <li style="margin: 12px 0; padding: 12px; background: white; border-radius: 8px; display: flex; align-items: center; gap: 12px;">
                            <span style="background: #fff3e0; padding: 8px; border-radius: 6px; font-size: 20px;">🚀</span>
                            <span><strong>Market Intelligence:</strong> Real-time insights and trend analysis</span>
                        </li>
                    </ul>
                </div>

                <div style="text-align: center; margin: 40px 0;">
                    <a href="${loginLink}" 
                       style="background: linear-gradient(135deg, #13A04E 0%, #43a047 100%); 
                              color: white; 
                              padding: 18px 45px; 
                              text-decoration: none; 
                              border-radius: 10px; 
                              font-size: 18px;
                              font-weight: 700;
                              display: inline-flex;
                              align-items: center;
                              gap: 15px;
                              box-shadow: 0 8px 20px rgba(19, 160, 78, 0.4);
                              transition: all 0.3s ease;">
                        <span style="font-size: 24px;">👉</span> 
                        <span>UNLOCK YOUR EXCLUSIVE ACCESS</span>
                    </a>
                </div>

                <div style="text-align: center; margin: 20px 0; padding: 15px; background: #e8f5e9; border-radius: 8px; border: 1px dashed #66bb6a;">
                    <p style="font-size: 14px; color: #2e7d32;">
                        <strong>Your Personal Gateway:</strong><br/>
                        <a href="${loginLink}" style="color: #13A04E; word-break: break-all; text-decoration: none; font-weight: 500;">${loginLink}</a>
                    </p>
                </div>

                <p style="font-size: 16px; color: #555; text-align: center; line-height: 28px; padding: 20px; background: #f9fbe7; border-radius: 10px; font-style: italic;">
                    "Opportunity does not knock, it presents itself when you beat down the door."<br/>
                    <span style="font-weight: 600; color: #13A04E;">One click is all it takes to resume your path to financial mastery! 🚀</span>
                </p>

                <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #c8e6c9, transparent); margin: 30px 0;" />
                
                <div style="text-align: center;">
                    <p style="font-size: 12px; color: #888; line-height: 20px;">
                        <span style="color: #13A04E; font-weight: 600;">Rhofi Elite Team</span><br/>
                        <span style="color: #666;">Committed to your investment excellence</span><br/>
                        Rhofi Financial Technologies © ${new Date().getFullYear()}
                    </p>
                    <p style="font-size: 11px; color: #aaa; margin-top: 10px;">
                        Your success journey continues with just one click! 💫
                    </p>
                </div>
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
        subject = `We Miss Your Brilliance, ${userName}! ⏳ Your Financial Journey Awaits Your Return`;
        htmlTemplate = `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 520px; margin: auto; border: 1px solid #fff3e0; border-radius: 12px; padding: 30px; background: linear-gradient(135deg, #ffffff 0%, #fff8e1 100%); box-shadow: 0 10px 30px rgba(255, 167, 38, 0.08);">
                <div style="text-align: center; margin-bottom: 20px;">
                    <div style="display: inline-block; background: linear-gradient(135deg, #ff9800 0%, #ffb74d 100%); padding: 12px 24px; border-radius: 50px; margin-bottom: 15px;">
                        <h1 style="color: white; margin: 0; font-size: 28px; letter-spacing: 0.5px;">⏳ Rhofi</h1>
                    </div>
                </div>
                
                <div style="text-align: center; margin: 25px 0;">
                    <div style="display: inline-block; background: #fff3e0; padding: 20px; border-radius: 50%; position: relative;">
                        <span style="font-size: 48px;">⏳</span>
                        <div style="position: absolute; top: -5px; right: -5px; background: #ff9800; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold;">${days}</div>
                    </div>
                </div>
                
                <p style="font-size: 18px; color: #5d4037; text-align: left; line-height: 32px; padding: 20px; background: #fff8e1; border-radius: 10px; border-left: 4px solid #ff9800;">
                    <span style="font-weight: 700;">Hello ${userName},</span><br/><br/>
                    Time flies, but great opportunities wait for the right moment! ⏳<br/><br/>
                    We've noticed it's been ${days} days since your last visit. During this time, the markets have been active with incredible opportunities, and we've been diligently preparing insights specifically for your investment style.
                </p>

                <div style="background: linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%); border-radius: 12px; padding: 25px; margin: 30px 0; border: 1px solid #ffcc80;">
                    <h3 style="color: #ff9800; text-align: center; font-size: 20px; margin-bottom: 20px; display: flex; align-items: center; justify-content: center; gap: 10px;">
                        <span>💫</span> What You've Been Missing:
                    </h3>
                    <ul style="list-style: none; padding: 0; margin: 0; font-size: 15px;">
                        <li style="margin: 12px 0; padding: 12px; background: white; border-radius: 8px; display: flex; align-items: center; gap: 12px;">
                            <span style="background: #e8f4ff; padding: 8px; border-radius: 6px; font-size: 20px;">🌊</span>
                            <span><strong>Market Movements:</strong> Significant trends and shifts in your sectors of interest</span>
                        </li>
                        <li style="margin: 12px 0; padding: 12px; background: white; border-radius: 8px; display: flex; align-items: center; gap: 12px;">
                            <span style="background: #f3e5f5; padding: 8px; border-radius: 6px; font-size: 20px;">📊</span>
                            <span><strong>Portfolio Updates:</strong> Performance analysis and rebalancing suggestions</span>
                        </li>
                        <li style="margin: 12px 0; padding: 12px; background: white; border-radius: 8px; display: flex; align-items: center; gap: 12px;">
                            <span style="background: #e8f5e9; padding: 8px; border-radius: 6px; font-size: 20px;">🚀</span>
                            <span><strong>Emerging Opportunities:</strong> New investment avenues perfect for your strategy</span>
                        </li>
                    </ul>
                </div>

                <div style="text-align: center; margin: 40px 0;">
                    <a href="${loginLink}" 
                       style="background: linear-gradient(135deg, #ff9800 0%, #ff8f00 100%); 
                              color: white; 
                              padding: 18px 45px; 
                              text-decoration: none; 
                              border-radius: 10px; 
                              font-size: 18px;
                              font-weight: 700;
                              display: inline-flex;
                              align-items: center;
                              gap: 15px;
                              box-shadow: 0 8px 20px rgba(255, 152, 0, 0.4);
                              transition: all 0.3s ease;">
                        <span style="font-size: 24px;">👉</span> 
                        <span>RECLAIM YOUR FINANCIAL MOMENTUM</span>
                    </a>
                </div>

                <div style="text-align: center; margin: 20px 0; padding: 15px; background: #fff3e0; border-radius: 8px; border: 1px dashed #ffb74d;">
                    <p style="font-size: 14px; color: #ef6c00;">
                        <strong>Your Comeback Link:</strong><br/>
                        <a href="${loginLink}" style="color: #ff9800; word-break: break-all; text-decoration: none; font-weight: 500;">${loginLink}</a>
                    </p>
                </div>

                <p style="font-size: 16px; color: #5d4037; text-align: center; line-height: 28px; padding: 20px; background: #fffde7; border-radius: 10px; font-style: italic;">
                    "The stock market is a device for transferring money from the impatient to the patient."<br/>
                    <span style="font-weight: 600; color: #ff9800;">Your patience is about to pay off - the perfect moment to continue is NOW! 💫</span>
                </p>

                <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #ffcc80, transparent); margin: 30px 0;" />
                
                <div style="text-align: center;">
                    <p style="font-size: 12px; color: #888; line-height: 20px;">
                        <span style="color: #ff9800; font-weight: 600;">Rhofi Timing Team</span><br/>
                        <span style="color: #666;">Helping you seize the right moments in markets</span><br/>
                        Rhofi Financial Technologies © ${new Date().getFullYear()}
                    </p>
                    <p style="font-size: 11px; color: #aaa; margin-top: 10px;">
                        Your financial journey continues with perfect timing! ⏱️
                    </p>
                </div>
            </div>
        `;
    } else {
        subject = `${userName}, Your Next Master Move Awaits! 👣 Perfect Timing for Your Comeback`;
        htmlTemplate = `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 520px; margin: auto; border: 1px solid #e0f7fa; border-radius: 12px; padding: 30px; background: linear-gradient(135deg, #ffffff 0%, #e0f7fa 100%); box-shadow: 0 10px 30px rgba(0, 172, 193, 0.08);">
                <div style="text-align: center; margin-bottom: 20px;">
                    <div style="display: inline-block; background: linear-gradient(135deg, #00acc1 0%, #26c6da 100%); padding: 12px 24px; border-radius: 50px; margin-bottom: 15px;">
                        <h1 style="color: white; margin: 0; font-size: 28px; letter-spacing: 0.5px;">👣 Rhofi</h1>
                    </div>
                </div>
                
                <div style="text-align: center; margin: 25px 0;">
                    <div style="display: inline-block; background: #e0f7fa; padding: 20px; border-radius: 50%;">
                        <span style="font-size: 48px;">👣</span>
                    </div>
                    <div style="margin-top: 15px; padding: 10px 20px; background: #26c6da; color: white; border-radius: 20px; display: inline-block; font-weight: bold;">
                        ${days} DAYS STRONGER
                    </div>
                </div>
                
                <p style="font-size: 18px; color: #006064; text-align: left; line-height: 32px; padding: 20px; background: #e0f7fa; border-radius: 10px; border-left: 4px solid #00acc1;">
                    <span style="font-weight: 700;">Hi ${userName},</span><br/><br/>
                    Your next strategic move is waiting for your genius touch! 👣<br/><br/>
                    Over ${days} days have passed since your last brilliant analysis. The markets have evolved, new patterns have emerged, and the stage is perfectly set for your informed return.
                </p>

                <div style="background: linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%); border-radius: 12px; padding: 25px; margin: 30px 0; border: 1px solid #80deea;">
                    <h3 style="color: #006064; text-align: center; font-size: 20px; margin-bottom: 20px; display: flex; align-items: center; justify-content: center; gap: 10px;">
                        <span>🎯</span> Strategic Advantages Waiting:
                    </h3>
                    <ul style="list-style: none; padding: 0; margin: 0; font-size: 15px;">
                        <li style="margin: 12px 0; padding: 12px; background: white; border-radius: 8px; display: flex; align-items: center; gap: 12px;">
                            <span style="background: #fff3e0; padding: 8px; border-radius: 6px; font-size: 20px;">📈</span>
                            <span><strong>Trend Analysis:</strong> Clear market directions for smarter decisions</span>
                        </li>
                        <li style="margin: 12px 0; padding: 12px; background: white; border-radius: 8px; display: flex; align-items: center; gap: 12px;">
                            <span style="background: #f3e5f5; padding: 8px; border-radius: 6px; font-size: 20px;">💎</span>
                            <span><strong>Value Opportunities:</strong> Undervalued gems in your sectors</span>
                        </li>
                        <li style="margin: 12px 0; padding: 12px; background: white; border-radius: 8px; display: flex; align-items: center; gap: 12px;">
                            <span style="background: #e8f5e9; padding: 8px; border-radius: 6px; font-size: 20px;">⚡</span>
                            <span><strong>Quick Insights:</strong> Bite-sized analysis for immediate action</span>
                        </li>
                    </ul>
                </div>

                <div style="text-align: center; margin: 40px 0;">
                    <a href="${loginLink}" 
                       style="background: linear-gradient(135deg, #00acc1 0%, #0097a7 100%); 
                              color: white; 
                              padding: 18px 45px; 
                              text-decoration: none; 
                              border-radius: 10px; 
                              font-size: 18px;
                              font-weight: 700;
                              display: inline-flex;
                              align-items: center;
                              gap: 15px;
                              box-shadow: 0 8px 20px rgba(0, 172, 193, 0.4);
                              transition: all 0.3s ease;">
                        <span style="font-size: 24px;">👉</span> 
                        <span>MAKE YOUR MASTER MOVE NOW</span>
                    </a>
                </div>

                <div style="text-align: center; margin: 20px 0; padding: 15px; background: #e0f7fa; border-radius: 8px; border: 1px dashed #4dd0e1;">
                    <p style="font-size: 14px; color: #00838f;">
                        <strong>Your Strategic Portal:</strong><br/>
                        <a href="${loginLink}" style="color: #00acc1; word-break: break-all; text-decoration: none; font-weight: 500;">${loginLink}</a>
                    </p>
                </div>

                <p style="font-size: 16px; color: #006064; text-align: center; line-height: 28px; padding: 20px; background: #e8f5e9; border-radius: 10px; font-style: italic;">
                    "In investing, what is comfortable is rarely profitable."<br/>
                    <span style="font-weight: 600; color: #00acc1;">Your comfort zone ends where extraordinary returns begin! ✨</span>
                </p>

                <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #80deea, transparent); margin: 30px 0;" />
                
                <div style="text-align: center;">
                    <p style="font-size: 12px; color: #888; line-height: 20px;">
                        <span style="color: #00acc1; font-weight: 600;">Rhofi Strategy Team</span><br/>
                        <span style="color: #666;">Empowering your strategic investment decisions</span><br/>
                        Rhofi Financial Technologies © ${new Date().getFullYear()}
                    </p>
                    <p style="font-size: 11px; color: #aaa; margin-top: 10px;">
                        Your next brilliant decision starts with a single click! 🧠
                    </p>
                </div>
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
        subject = `⏰ Golden Opportunity Alert! Your ${netcoinsBalance} NetCoins Expire Soon - Act Now!`;
        htmlTemplate = `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 520px; margin: auto; border: 1px solid #fff3e0; border-radius: 12px; padding: 30px; background: linear-gradient(135deg, #ffffff 0%, #fff8e1 100%); box-shadow: 0 10px 30px rgba(255, 167, 38, 0.1);">
                <div style="text-align: center; margin-bottom: 20px;">
                    <div style="display: inline-block; background: linear-gradient(135deg, #ff9800 0%, #ffb74d 100%); padding: 12px 24px; border-radius: 50px; margin-bottom: 15px;">
                        <h1 style="color: white; margin: 0; font-size: 28px; letter-spacing: 0.5px;">💰 Rhofi Rewards</h1>
                    </div>
                </div>
                
                <div style="text-align: center; margin: 25px 0;">
                    <div style="position: relative; display: inline-block;">
                        <div style="width: 100px; height: 100px; background: linear-gradient(135deg, #ff9800 0%, #ffc107 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 25px rgba(255, 152, 0, 0.3);">
                            <span style="font-size: 42px; color: white;">⏰</span>
                        </div>
                        <div style="position: absolute; top: -10px; right: -10px; background: #d84315; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold; box-shadow: 0 4px 10px rgba(216, 67, 21, 0.3);">
                            2
                        </div>
                    </div>
                </div>
                
                <p style="font-size: 18px; color: #5d4037; text-align: left; line-height: 32px; padding: 20px; background: #fff8e1; border-radius: 10px; border-left: 4px solid #ff9800;">
                    <span style="font-weight: 700;">Attention ${userName}!</span><br/><br/>
                    <span style="color: #d84315; font-weight: 700;">✨ TIME-SENSITIVE OPPORTUNITY ALERT ✨</span><br/><br/>
                    Your hard-earned NetCoins are about to embark on a new adventure, and they want to take YOU along for the ride! In just 2 days, these valuable rewards will transform from digital gold to missed opportunities.
                </p>

                <div style="background: linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%); border-radius: 12px; padding: 25px; margin: 30px 0; border: 2px solid #ffb74d; position: relative;">
                    <div style="position: absolute; top: -15px; left: 50%; transform: translateX(-50%); background: #ff9800; color: white; padding: 8px 20px; border-radius: 20px; font-weight: bold; font-size: 14px; box-shadow: 0 4px 10px rgba(255, 152, 0, 0.3);">
                        🎯 YOUR TREASURE CHEST
                    </div>
                    
                    <div style="text-align: center;">
                        <div style="font-size: 56px; font-weight: 800; color: #d84315; margin: 15px 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.1);">
                            ${netcoinsBalance}
                        </div>
                        <div style="font-size: 18px; color: #5d4037; font-weight: 600; margin-bottom: 10px;">
                            💎 NetCoins Awaiting Your Command
                        </div>
                        <div style="font-size: 14px; color: #ff6f00; background: white; padding: 10px; border-radius: 8px; display: inline-block; margin-top: 15px; border: 1px dashed #ff9800;">
                            <span style="font-weight: 700;">⏳ Final Countdown:</span> ${expiryFormatted}
                        </div>
                    </div>
                </div>

                <div style="background: #f9fbe7; border-radius: 10px; padding: 20px; margin: 25px 0; border: 1px solid #d4e157;">
                    <h3 style="color: #827717; text-align: center; font-size: 18px; margin-bottom: 15px; display: flex; align-items: center; justify-content: center; gap: 10px;">
                        <span>💡</span> Your Rewards, Your Choices:
                    </h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 15px;">
                        <div style="background: white; padding: 15px; border-radius: 8px; text-align: center; border: 1px solid #c8e6c9;">
                            <span style="font-size: 24px;">🌟</span>
                            <div style="font-size: 13px; color: #2e7d32; margin-top: 8px; font-weight: 600;">Premium Features</div>
                        </div>
                        <div style="background: white; padding: 15px; border-radius: 8px; text-align: center; border: 1px solid #bbdefb;">
                            <span style="font-size: 24px;">📊</span>
                            <div style="font-size: 13px; color: #1565c0; margin-top: 8px; font-weight: 600;">Advanced Analytics</div>
                        </div>
                        <div style="background: white; padding: 15px; border-radius: 8px; text-align: center; border: 1px solid #f8bbd0;">
                            <span style="font-size: 24px;">🎁</span>
                            <div style="font-size: 13px; color: #880e4f; margin-top: 8px; font-weight: 600;">Exclusive Content</div>
                        </div>
                        <div style="background: white; padding: 15px; border-radius: 8px; text-align: center; border: 1px solid #d1c4e9;">
                            <span style="font-size: 24px;">💎</span>
                            <div style="font-size: 13px; color: #4527a0; margin-top: 8px; font-weight: 600;">VIP Services</div>
                        </div>
                    </div>
                </div>

                <div style="text-align: center; margin: 40px 0;">
                    <a href="${useNetcoinsLink}" 
                       style="background: linear-gradient(135deg, #ff9800 0%, #f57c00 100%); 
                              color: white; 
                              padding: 20px 50px; 
                              text-decoration: none; 
                              border-radius: 12px; 
                              font-size: 20px;
                              font-weight: 800;
                              display: inline-flex;
                              align-items: center;
                              gap: 20px;
                              box-shadow: 0 10px 25px rgba(255, 152, 0, 0.4);
                              transition: all 0.3s ease;
                              letter-spacing: 0.5px;">
                        <span style="font-size: 28px;">🚀</span> 
                        <span>CLAIM YOUR REWARDS NOW!</span>
                    </a>
                </div>

                <div style="background: #ffebee; border-radius: 10px; padding: 20px; margin: 25px 0; border: 2px solid #ef9a9a;">
                    <p style="font-size: 15px; color: #c62828; text-align: center; line-height: 24px; margin: 0;">
                        <span style="font-weight: 700; font-size: 18px;">⚠️ URGENT REMINDER:</span><br/>
                        Don't let your digital wealth vanish into thin air! Every NetCoin represents your dedication and achievements. Transform them into real value before they become beautiful memories.
                    </p>
                </div>

                <p style="font-size: 16px; color: #5d4037; text-align: center; line-height: 28px; padding: 20px; background: #fffde7; border-radius: 10px; font-style: italic;">
                    "Opportunity is like a sunrise. If you wait too long, you miss it."<br/>
                    <span style="font-weight: 700; color: #ff9800;">Your sunrise moment is RIGHT NOW - seize it! ☀️</span>
                </p>

                <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #ffcc80, transparent); margin: 30px 0;" />
                
                <div style="text-align: center;">
                    <p style="font-size: 12px; color: #888; line-height: 20px;">
                        <span style="color: #ff9800; font-weight: 600;">Rhofi Rewards Division</span><br/>
                        <span style="color: #666;">Celebrating your achievements, empowering your journey</span><br/>
                        Rhofi Financial Technologies © ${new Date().getFullYear()}
                    </p>
                    <p style="font-size: 11px; color: #aaa; margin-top: 10px;">
                        Your rewards, your rules, your moment! 💫
                    </p>
                </div>
            </div>
        `;
    } else {
        subject = `💰 Your ${netcoinsBalance} NetCoins Are Calling! Don't Let This Treasure Slip Away`;
        htmlTemplate = `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 520px; margin: auto; border: 1px solid #e8f5e9; border-radius: 12px; padding: 30px; background: linear-gradient(135deg, #ffffff 0%, #f1f8e9 100%); box-shadow: 0 10px 30px rgba(76, 175, 80, 0.1);">
                <div style="text-align: center; margin-bottom: 20px;">
                    <div style="display: inline-block; background: linear-gradient(135deg, #4caf50 0%, #66bb6a 100%); padding: 12px 24px; border-radius: 50px; margin-bottom: 15px;">
                        <h1 style="color: white; margin: 0; font-size: 28px; letter-spacing: 0.5px;">💎 Rhofi Treasure</h1>
                    </div>
                </div>
                
                <div style="text-align: center; margin: 25px 0;">
                    <div style="position: relative; display: inline-block;">
                        <div style="width: 100px; height: 100px; background: linear-gradient(135deg, #4caf50 0%, #81c784 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 25px rgba(76, 175, 80, 0.3);">
                            <span style="font-size: 42px; color: white;">💰</span>
                        </div>
                        <div style="position: absolute; top: -10px; right: -10px; background: #388e3c; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold; box-shadow: 0 4px 10px rgba(56, 142, 60, 0.3);">
                            2
                        </div>
                    </div>
                </div>
                
                <p style="font-size: 18px; color: #1b5e20; text-align: left; line-height: 32px; padding: 20px; background: #e8f5e9; border-radius: 10px; border-left: 4px solid #4caf50;">
                    <span style="font-weight: 700;">Greetings ${userName},</span><br/><br/>
                    <span style="color: #2e7d32; font-weight: 700;">🎁 YOUR PERSONAL TREASURE AWAITS REDEMPTION! 🎁</span><br/><br/>
                    Imagine a treasure chest filled with ${netcoinsBalance} golden opportunities, each one representing your dedication and success. This chest is about to close forever in just 48 hours. The key? Your immediate action!
                </p>

                <div style="background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%); border-radius: 12px; padding: 25px; margin: 30px 0; border: 2px solid #81c784; position: relative;">
                    <div style="position: absolute; top: -15px; left: 50%; transform: translateX(-50%); background: #4caf50; color: white; padding: 8px 20px; border-radius: 20px; font-weight: bold; font-size: 14px; box-shadow: 0 4px 10px rgba(76, 175, 80, 0.3);">
                        🏆 YOUR ACHIEVEMENT VAULT
                    </div>
                    
                    <div style="text-align: center;">
                        <div style="font-size: 56px; font-weight: 800; color: #1b5e20; margin: 15px 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.1);">
                            ${netcoinsBalance}
                        </div>
                        <div style="font-size: 18px; color: #2e7d32; font-weight: 600; margin-bottom: 10px; display: flex; align-items: center; justify-content: center; gap: 10px;">
                            <span>💫</span> Shining NetCoins
                        </div>
                        <div style="font-size: 14px; color: #388e3c; background: white; padding: 10px; border-radius: 8px; display: inline-block; margin-top: 15px; border: 1px dashed #4caf50;">
                            <span style="font-weight: 700;">⏰ Treasure Lock Date:</span> ${expiryFormatted}
                        </div>
                    </div>
                </div>

                <div style="background: #f1f8e9; border-radius: 10px; padding: 20px; margin: 25px 0; border: 1px solid #c5e1a5;">
                    <h3 style="color: #33691e; text-align: center; font-size: 18px; margin-bottom: 15px; display: flex; align-items: center; justify-content: center; gap: 10px;">
                        <span>🎯</span> Transform Your Treasure Into:
                    </h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 15px;">
                        <div style="background: white; padding: 15px; border-radius: 8px; text-align: center; border: 2px solid #4caf50; box-shadow: 0 4px 8px rgba(76, 175, 80, 0.1);">
                            <span style="font-size: 24px;">🚀</span>
                            <div style="font-size: 13px; color: #1b5e20; margin-top: 8px; font-weight: 700;">Premium Upgrades</div>
                        </div>
                        <div style="background: white; padding: 15px; border-radius: 8px; text-align: center; border: 2px solid #2196f3; box-shadow: 0 4px 8px rgba(33, 150, 243, 0.1);">
                            <span style="font-size: 24px;">📈</span>
                            <div style="font-size: 13px; color: #0d47a1; margin-top: 8px; font-weight: 700;">Market Insights</div>
                        </div>
                        <div style="background: white; padding: 15px; border-radius: 8px; text-align: center; border: 2px solid #ff9800; box-shadow: 0 4px 8px rgba(255, 152, 0, 0.1);">
                            <span style="font-size: 24px;">🎁</span>
                            <div style="font-size: 13px; color: #e65100; margin-top: 8px; font-weight: 700;">Exclusive Rewards</div>
                        </div>
                        <div style="background: white; padding: 15px; border-radius: 8px; text-align: center; border: 2px solid #9c27b0; box-shadow: 0 4px 8px rgba(156, 39, 176, 0.1);">
                            <span style="font-size: 24px;">💎</span>
                            <div style="font-size: 13px; color: #4a148c; margin-top: 8px; font-weight: 700;">VIP Access</div>
                        </div>
                    </div>
                </div>

                <div style="text-align: center; margin: 40px 0;">
                    <a href="${useNetcoinsLink}" 
                       style="background: linear-gradient(135deg, #4caf50 0%, #388e3c 100%); 
                              color: white; 
                              padding: 20px 50px; 
                              text-decoration: none; 
                              border-radius: 12px; 
                              font-size: 20px;
                              font-weight: 800;
                              display: inline-flex;
                              align-items: center;
                              gap: 20px;
                              box-shadow: 0 10px 25px rgba(76, 175, 80, 0.4);
                              transition: all 0.3s ease;
                              letter-spacing: 0.5px;">
                        <span style="font-size: 28px;">💎</span> 
                        <span>REDEEM YOUR FORTUNE NOW!</span>
                    </a>
                </div>

                <div style="background: #fff3e0; border-radius: 10px; padding: 20px; margin: 25px 0; border: 2px solid #ffb74d;">
                    <p style="font-size: 15px; color: #ef6c00; text-align: center; line-height: 24px; margin: 0;">
                        <span style="font-weight: 700; font-size: 18px;">💡 PRO TIP:</span><br/>
                        These NetCoins aren't just numbers - they're your investment in yourself! Each one can unlock features that could potentially multiply your returns and enhance your trading journey exponentially.
                    </p>
                </div>

                <p style="font-size: 16px; color: #1b5e20; text-align: center; line-height: 28px; padding: 20px; background: #f9fbe7; border-radius: 10px; font-style: italic;">
                    "The best investment you can make is in yourself."<br/>
                    <span style="font-weight: 700; color: #4caf50;">Your NetCoins are that investment - claim your returns! 🌱</span>
                </p>

                <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #a5d6a7, transparent); margin: 30px 0;" />
                
                <div style="text-align: center;">
                    <p style="font-size: 12px; color: #888; line-height: 20px;">
                        <span style="color: #4caf50; font-weight: 600;">Rhofi Wealth Guardians</span><br/>
                        <span style="color: #666;">Nurturing your rewards, growing your success</span><br/>
                        Rhofi Financial Technologies © ${new Date().getFullYear()}
                    </p>
                    <p style="font-size: 11px; color: #aaa; margin-top: 10px;">
                        Your treasure, your timing, your triumph! 🏆
                    </p>
                </div>
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
        subject = `⚡ Power Boost Needed! Your Rhofi Coins Are Running Low - Refuel for Unstoppable Trading!`;
        htmlTemplate = `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 520px; margin: auto; border: 1px solid #ffebee; border-radius: 12px; padding: 30px; background: linear-gradient(135deg, #ffffff 0%, #ffebee 100%); box-shadow: 0 10px 30px rgba(220, 38, 38, 0.08);">
                <div style="text-align: center; margin-bottom: 20px;">
                    <div style="display: inline-block; background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%); padding: 12px 24px; border-radius: 50px; margin-bottom: 15px;">
                        <h1 style="color: white; margin: 0; font-size: 28px; letter-spacing: 0.5px;">⚡ Rhofi Power</h1>
                    </div>
                </div>
                
                <div style="text-align: center; margin: 25px 0;">
                    <div style="position: relative; display: inline-block;">
                        <div style="width: 100px; height: 100px; background: linear-gradient(135deg, #dc2626 0%, #f87171 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 25px rgba(220, 38, 38, 0.3);">
                            <span style="font-size: 42px; color: white;">⚠️</span>
                        </div>
                        <div style="position: absolute; top: -10px; right: -10px; background: #7f1d1d; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold; box-shadow: 0 4px 10px rgba(127, 29, 29, 0.3);">
                            ${currentBalance}
                        </div>
                    </div>
                </div>
                
                <p style="font-size: 18px; color: #7f1d1d; text-align: left; line-height: 32px; padding: 20px; background: #ffebee; border-radius: 10px; border-left: 4px solid #dc2626;">
                    <span style="font-weight: 700;">Heads Up ${userName}!</span><br/><br/>
                    <span style="color: #b91c1c; font-weight: 700;">🚨 TRADING FUEL ALERT - YOUR ENGINE NEEDS REFUELING! 🚨</span><br/><br/>
                    Your trading engine is running on reserves! With only ${currentBalance} Rhofi Coins remaining, you're below the optimal 100-coin threshold for seamless, powerful trading experiences.
                </p>

                <div style="background: linear-gradient(135deg, #ffebee 0%, #fecaca 100%); border-radius: 12px; padding: 25px; margin: 30px 0; border: 2px solid #f87171; position: relative;">
                    <div style="position: absolute; top: -15px; left: 50%; transform: translateX(-50%); background: #dc2626; color: white; padding: 8px 20px; border-radius: 20px; font-weight: bold; font-size: 14px; box-shadow: 0 4px 10px rgba(220, 38, 38, 0.3);">
                        ⚡ YOUR CURRENT POWER STATUS
                    </div>
                    
                    <div style="text-align: center;">
                        <div style="display: flex; align-items: center; justify-content: center; gap: 30px; margin: 20px 0;">
                            <div style="text-align: center;">
                                <div style="font-size: 48px; font-weight: 800; color: #dc2626; text-shadow: 2px 2px 4px rgba(0,0,0,0.1);">
                                    ${currentBalance}
                                </div>
                                <div style="font-size: 14px; color: #7f1d1d; font-weight: 600; margin-top: 5px;">
                                    Current Balance
                                </div>
                            </div>
                            <div style="font-size: 36px; color: #dc2626; font-weight: bold;">→</div>
                            <div style="text-align: center;">
                                <div style="font-size: 48px; font-weight: 800; color: #059669; text-shadow: 2px 2px 4px rgba(0,0,0,0.1);">
                                    100+
                                </div>
                                <div style="font-size: 14px; color: #065f46; font-weight: 600; margin-top: 5px;">
                                    Optimal Level
                                </div>
                            </div>
                        </div>
                        
                        <div style="width: 80%; height: 20px; background: #fecaca; border-radius: 10px; margin: 20px auto; overflow: hidden;">
                            <div style="width: ${Math.min(currentBalance, 100)}%; height: 100%; background: linear-gradient(90deg, #dc2626 0%, #ef4444 100%); border-radius: 10px;"></div>
                        </div>
                        
                        <div style="font-size: 14px; color: #b91c1c; background: white; padding: 10px; border-radius: 8px; display: inline-block; margin-top: 15px; border: 1px dashed #dc2626;">
                            <span style="font-weight: 700;">🎯 Target:</span> Reach 100+ coins for peak performance!
                        </div>
                    </div>
                </div>

                <div style="background: #fffbeb; border-radius: 10px; padding: 20px; margin: 25px 0; border: 1px solid #fbbf24;">
                    <h3 style="color: #92400e; text-align: center; font-size: 18px; margin-bottom: 15px; display: flex; align-items: center; justify-content: center; gap: 10px;">
                        <span>💎</span> Why Maintain Optimal Power?
                    </h3>
                    <div style="display: grid; grid-template-columns: 1fr; gap: 12px; margin-top: 15px;">
                        <div style="background: white; padding: 15px; border-radius: 8px; display: flex; align-items: center; gap: 15px; border-left: 4px solid #dc2626;">
                            <span style="font-size: 24px; color: #dc2626;">🚀</span>
                            <div>
                                <div style="font-size: 14px; color: #7f1d1d; font-weight: 700;">Lightning-Fast Trades</div>
                                <div style="font-size: 12px; color: #b91c1c;">Execute trades instantly without delays</div>
                            </div>
                        </div>
                        <div style="background: white; padding: 15px; border-radius: 8px; display: flex; align-items: center; gap: 15px; border-left: 4px solid #0E46A3;">
                            <span style="font-size: 24px; color: #0E46A3;">📊</span>
                            <div>
                                <div style="font-size: 14px; color: #022434; font-weight: 700;">Premium Analytics</div>
                                <div style="font-size: 12px; color: #0E46A3;">Access advanced market insights</div>
                            </div>
                        </div>
                        <div style="background: white; padding: 15px; border-radius: 8px; display: flex; align-items: center; gap: 15px; border-left: 4px solid #13A04E;">
                            <span style="font-size: 24px; color: #13A04E;">🔔</span>
                            <div>
                                <div style="font-size: 14px; color: #022434; font-weight: 700;">Priority Alerts</div>
                                <div style="font-size: 12px; color: #13A04E;">Get instant notifications on opportunities</div>
                            </div>
                        </div>
                        <div style="background: white; padding: 15px; border-radius: 8px; display: flex; align-items: center; gap: 15px; border-left: 4px solid #f59e0b;">
                            <span style="font-size: 24px; color: #f59e0b;">💎</span>
                            <div>
                                <div style="font-size: 14px; color: #92400e; font-weight: 700;">VIP Features</div>
                                <div style="font-size: 12px; color: #d97706;">Unlock exclusive trading tools</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style="text-align: center; margin: 40px 0;">
                    <a href="${addCoinsLink}" 
                       style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); 
                              color: white; 
                              padding: 20px 50px; 
                              text-decoration: none; 
                              border-radius: 12px; 
                              font-size: 20px;
                              font-weight: 800;
                              display: inline-flex;
                              align-items: center;
                              gap: 20px;
                              box-shadow: 0 10px 25px rgba(220, 38, 38, 0.4);
                              transition: all 0.3s ease;
                              letter-spacing: 0.5px;">
                        <span style="font-size: 28px;">⚡</span> 
                        <span>BOOST YOUR TRADING POWER!</span>
                    </a>
                </div>

                <div style="background: #e0f7fa; border-radius: 10px; padding: 20px; margin: 25px 0; border: 2px solid #26c6da;">
                    <p style="font-size: 15px; color: #006064; text-align: center; line-height: 24px; margin: 0;">
                        <span style="font-weight: 700; font-size: 18px;">💡 SMART INVESTOR INSIGHT:</span><br/>
                        Think of Rhofi Coins as your trading fuel. Just as a race car needs premium fuel for peak performance, your trading journey needs sufficient coins for optimal results. Every coin you add could be the key to your next winning trade!
                    </p>
                </div>

                <p style="font-size: 16px; color: #7f1d1d; text-align: center; line-height: 28px; padding: 20px; background: #ffebee; border-radius: 10px; font-style: italic;">
                    "In trading, preparation meets opportunity."<br/>
                    <span style="font-weight: 700; color: #dc2626;">Prepare your arsenal now for the opportunities ahead! 🎯</span>
                </p>

                <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #fca5a5, transparent); margin: 30px 0;" />
                
                <div style="text-align: center;">
                    <p style="font-size: 12px; color: #888; line-height: 20px;">
                        <span style="color: #dc2626; font-weight: 600;">Rhofi Power Team</span><br/>
                        <span style="color: #666;">Fueling your trading success, empowering your decisions</span><br/>
                        Rhofi Financial Technologies © ${new Date().getFullYear()}
                    </p>
                    <p style="font-size: 11px; color: #aaa; margin-top: 10px;">
                        Power up, trade smarter, win bigger! 🚀
                    </p>
                </div>
            </div>
        `;
    } else {
        subject = `💎 Trading Fuel Running Low! Refill Your ${currentBalance} Rhofi Coins for Premium Performance`;
        htmlTemplate = `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 520px; margin: auto; border: 1px solid #fffbeb; border-radius: 12px; padding: 30px; background: linear-gradient(135deg, #ffffff 0%, #fffbeb 100%); box-shadow: 0 10px 30px rgba(245, 158, 11, 0.08);">
                <div style="text-align: center; margin-bottom: 20px;">
                    <div style="display: inline-block; background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%); padding: 12px 24px; border-radius: 50px; margin-bottom: 15px;">
                        <h1 style="color: white; margin: 0; font-size: 28px; letter-spacing: 0.5px;">💎 Rhofi Energy</h1>
                    </div>
                </div>
                
                <div style="text-align: center; margin: 25px 0;">
                    <div style="position: relative; display: inline-block;">
                        <div style="width: 100px; height: 100px; background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 25px rgba(245, 158, 11, 0.3);">
                            <span style="font-size: 42px; color: white;">🔋</span>
                        </div>
                        <div style="position: absolute; top: -10px; right: -10px; background: #92400e; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold; box-shadow: 0 4px 10px rgba(146, 64, 14, 0.3);">
                            ${currentBalance}%
                        </div>
                    </div>
                </div>
                
                <p style="font-size: 18px; color: #92400e; text-align: left; line-height: 32px; padding: 20px; background: #fffbeb; border-radius: 10px; border-left: 4px solid #f59e0b;">
                    <span style="font-weight: 700;">Hello ${userName},</span><br/><br/>
                    <span style="color: #b45309; font-weight: 700;">🔋 ENERGY LEVEL CRITICAL - TIME FOR A POWER BOOST! 🔋</span><br/><br/>
                    Your trading engine is operating at ${currentBalance}% capacity! To maintain the premium, uninterrupted experience you deserve, we recommend boosting to at least 100 Rhofi Coins.
                </p>

                <div style="background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%); border-radius: 12px; padding: 25px; margin: 30px 0; border: 2px solid #fbbf24; position: relative;">
                    <div style="position: absolute; top: -15px; left: 50%; transform: translateX(-50%); background: #f59e0b; color: white; padding: 8px 20px; border-radius: 20px; font-weight: bold; font-size: 14px; box-shadow: 0 4px 10px rgba(245, 158, 11, 0.3);">
                        🎯 YOUR ENERGY DASHBOARD
                    </div>
                    
                    <div style="text-align: center;">
                        <div style="font-size: 56px; font-weight: 800; color: #d97706; margin: 15px 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.1);">
                            ${currentBalance}
                        </div>
                        <div style="font-size: 18px; color: #92400e; font-weight: 600; margin-bottom: 20px; display: flex; align-items: center; justify-content: center; gap: 10px;">
                            <span>⚡</span> Current Trading Energy
                        </div>
                        
                        <div style="background: white; padding: 15px; border-radius: 10px; border: 2px solid #fbbf24; display: inline-block; margin-top: 10px;">
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <div style="width: 20px; height: 20px; background: #dc2626; border-radius: 50%;"></div>
                                <div style="font-size: 14px; color: #7f1d1d; font-weight: 600;">Critical: Below 50</div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 10px; margin-top: 8px;">
                                <div style="width: 20px; height: 20px; background: #f59e0b; border-radius: 50%;"></div>
                                <div style="font-size: 14px; color: #92400e; font-weight: 600;">Optimal: 100+</div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 10px; margin-top: 8px;">
                                <div style="width: 20px; height: 20px; background: #13A04E; border-radius: 50%;"></div>
                                <div style="font-size: 14px; color: #065f46; font-weight: 600;">Premium: 500+</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style="background: #f0f9ff; border-radius: 10px; padding: 20px; margin: 25px 0; border: 1px solid #7dd3fc;">
                    <h3 style="color: #0369a1; text-align: center; font-size: 18px; margin-bottom: 15px; display: flex; align-items: center; justify-content: center; gap: 10px;">
                        <span>🚀</span> Boost Your Trading Superpowers:
                    </h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 15px;">
                        <div style="background: white; padding: 15px; border-radius: 8px; text-align: center; border: 2px solid #0E46A3; position: relative;">
                            <span style="font-size: 24px; color: #0E46A3;">⚡</span>
                            <div style="font-size: 13px; color: #022434; font-weight: 700; margin-top: 8px;">Instant Execution</div>
                        </div>
                        <div style="background: white; padding: 15px; border-radius: 8px; text-align: center; border: 2px solid #13A04E; position: relative;">
                            <span style="font-size: 24px; color: #13A04E;">📊</span>
                            <div style="font-size: 13px; color: #022434; font-weight: 700; margin-top: 8px;">Advanced Analytics</div>
                        </div>
                        <div style="background: white; padding: 15px; border-radius: 8px; text-align: center; border: 2px solid #f59e0b; position: relative;">
                            <span style="font-size: 24px; color: #f59e0b;">🔔</span>
                            <div style="font-size: 13px; color: #78350f; font-weight: 700; margin-top: 8px;">Smart Alerts</div>
                        </div>
                        <div style="background: white; padding: 15px; border-radius: 8px; text-align: center; border: 2px solid #8b5cf6; position: relative;">
                            <span style="font-size: 24px; color: #8b5cf6;">💎</span>
                            <div style="font-size: 13px; color: #5b21b6; font-weight: 700; margin-top: 8px;">VIP Features</div>
                        </div>
                    </div>
                </div>

                <div style="text-align: center; margin: 40px 0;">
                    <a href="${addCoinsLink}" 
                       style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); 
                              color: white; 
                              padding: 20px 50px; 
                              text-decoration: none; 
                              border-radius: 12px; 
                              font-size: 20px;
                              font-weight: 800;
                              display: inline-flex;
                              align-items: center;
                              gap: 20px;
                              box-shadow: 0 10px 25px rgba(245, 158, 11, 0.4);
                              transition: all 0.3s ease;
                              letter-spacing: 0.5px;">
                        <span style="font-size: 28px;">💎</span> 
                        <span>ENERGIZE YOUR PORTFOLIO!</span>
                    </a>
                </div>

                <div style="background: #fce7f3; border-radius: 10px; padding: 20px; margin: 25px 0; border: 2px solid #f472b6;">
                    <p style="font-size: 15px; color: #831843; text-align: center; line-height: 24px; margin: 0;">
                        <span style="font-weight: 700; font-size: 18px;">🌟 GOLDEN OPPORTUNITY:</span><br/>
                        Every Rhofi Coin you add is like adding a supercharger to your trading engine. More coins mean faster decisions, better insights, and premium features that could help you spot opportunities others might miss!
                    </p>
                </div>

                <p style="font-size: 16px; color: #92400e; text-align: center; line-height: 28px; padding: 20px; background: #fffbeb; border-radius: 10px; font-style: italic;">
                    "The stock market is filled with individuals who know the price of everything, but the value of nothing."<br/>
                    <span style="font-weight: 700; color: #f59e0b;">Value your trading power - fuel it for maximum returns! ⚡</span>
                </p>

                <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #fde68a, transparent); margin: 30px 0;" />
                
                <div style="text-align: center;">
                    <p style="font-size: 12px; color: #888; line-height: 20px;">
                        <span style="color: #f59e0b; font-weight: 600;">Rhofi Energy Squad</span><br/>
                        <span style="color: #666;">Powering your trades, illuminating your path</span><br/>
                        Rhofi Financial Technologies © ${new Date().getFullYear()}
                    </p>
                    <p style="font-size: 11px; color: #aaa; margin-top: 10px;">
                        Charge up, trade up, level up! 🚀
                    </p>
                </div>
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
    console.log('4️⃣  INACTIVE_USER_REMINDER - Inactive User Reminder');
    console.log('5️⃣  INACTIVE_USER_LONG_TIME - 2+ Days Inactive');
    console.log('6️⃣  ADMIN_HIGH_USAGE - Admin Alert for High Traffic');
    console.log('7️⃣  NETCOINS_EXPIRY_ALERT - NetCoins Expiring Soon');
    console.log('8️⃣  LOW_RHOFI_COINS_ALERT - Low Coin Balance');
    console.log('9️⃣  FOREX_PRICE_ALERT - Forex Price Changes');
    console.log('🔟  SUBSCRIPTION_PAYMENT_PENDING - Payment Due');
    console.log('1️⃣1️⃣  TEST_ALL - Test all email types');
    console.log('1️⃣2️⃣  Exit');
    console.log('');

    async function mainMenu() {
        console.log('📝 Please select an option:');
        console.log('1. Send OTP Verification Email');
        console.log('2. Send Email Update Verification');
        console.log('3. Send Profile Update Confirmation');
        console.log('4. Send Inactive User Reminder');
        console.log('5. Send 2+ Days Inactive User Reminder');
        console.log('6. Send Admin High Usage Alert');
        console.log('7. Send NetCoins Expiry Alert');
        console.log('8. Send Low Rhofi Coins Alert');
        console.log('9. Send Forex Price Alert');
        console.log('10. Send Subscription Payment Pending');
        console.log('11. Generate Trial In-App Notification');
        console.log('12. Generate Admin WhatsApp Notification');
        console.log('13. Generate NetCoins WhatsApp Notification');
        console.log('14. Generate Order Expiry WhatsApp Notification');
        console.log('15. Generate Order No-Update WhatsApp Notification');
        console.log('16. Generate Subscription Expiry WhatsApp Notification');
        console.log('17. Generate Subscription No-Update WhatsApp Notification');
        console.log('18. Generate LTP Price Alert WhatsApp Notification');
        console.log('19. Generate Watchlist Notification Alert');
        console.log('20. Test All Email Types');
        console.log('21. Exit');
        console.log('');

        readline.question('Enter your choice (1-21): ', async (choice) => {
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
                        
                    case '5':
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
                        
                    case '6':
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
                        
                    case '7':
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
                        
                    case '8':
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
                        
                    case '9':
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
                        
                    case '10':
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
                        
                    case '11':
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
                        
                    case '12':
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
                        
                    case '13':
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
                        
                    case '14':
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
                        
                    case '15':
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
                        
                    case '16':
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
                        
                    case '17':
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
                        
                    case '18':
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
                        
                    case '19':
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
                        
                    case '20':
                        console.log('\n🧪 Testing All Email Types...');
                        
                        const tests = [
                            { name: 'OTP Verification', type: 'OTP_VERIFICATION', data: '111111' },
                            { name: 'Email Update Verification', type: 'EMAIL_UPDATE_VERIFICATION', data: '222222' },
                            { name: 'Profile Update Confirmation', type: 'PROFILE_UPDATE_CONFIRMATION', data: {
                                email: { old: 'testold@gmail.com', new: 'testnew@gmail.com' },
                                mobile: { old: '9111111111', new: '9222222222' }
                            }},
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
                        
                    case '21':
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