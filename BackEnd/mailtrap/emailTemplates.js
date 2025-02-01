export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
  <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
</head>
<body style="font-family: 'Press Start 2P', cursive; line-height: 1.6; color: #FFD700; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #000000;">
  <div style="background: linear-gradient(to right, #0000FF, #000088); padding: 20px; text-align: center; border: 4px solid #FFD700;">
    <h1 style="color: #FFD700; margin: 0; font-size: 24px;">VERIFY EMAIL</h1>
  </div>
  <div style="background-color: #000033; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(255,215,0,0.3); border: 4px solid #FFD700; border-top: none;">
    <p>PLAYER 1,</p>
    <p>WELCOME TO SEEMYPROJECT! YOUR VERIFICATION CODE IS:</p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #FF0000;">{verificationCode}</span>
    </div>
    <p>ENTER THIS CODE TO START!</p>
    <p style="color: #FF0000;">WARNING: CODE EXPIRES IN 15 MINUTES!</p>
    <p>IF YOU DIDN'T JOIN OUR ARCADE, GAME OVER!</p>
    <p>POWER UP!<br>PAC-AUTH</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #4444FF; font-size: 0.8em;">
    <p>AUTOMATED MESSAGE - NO CONTINUES!</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Success</title>
  <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
</head>
<body style="font-family: 'Press Start 2P', cursive; line-height: 1.6; color: #FFD700; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #000000;">
  <div style="background: linear-gradient(to right, #0000FF, #000088); padding: 20px; text-align: center; border: 4px solid #FFD700;">
    <h1 style="color: #FFD700; margin: 0; font-size: 24px;">PASSWORD UPGRADED!</h1>
  </div>
  <div style="background-color: #000033; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(255,215,0,0.3); border: 4px solid #FFD700; border-top: none;">
    <p>PLAYER 1,</p>
    <p>LEVEL UP! PASSWORD SUCCESSFULLY CHANGED!</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #FFD700; color: #000000; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        ★
      </div>
    </div>
    <p style="color: #FF0000;">IF THIS WASN'T YOU, CONTACT THE GAME MASTERS!</p>
    <p>BONUS TIPS:</p>
    <ul style="list-style-type: none; padding-left: 0;">
      <li>→ USE A MIGHTY PASSWORD</li>
      <li>→ ACTIVATE SHIELD (2FA)</li>
      <li>→ DON'T SHARE POWER-UPS</li>
    </ul>
    <p>GAME ON!<br>PAC-AUTH</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #4444FF; font-size: 0.8em;">
    <p>AUTOMATED MESSAGE - NO CONTINUES!</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
  <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
</head>
<body style="font-family: 'Press Start 2P', cursive; line-height: 1.6; color: #FFD700; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #000000;">
  <div style="background: linear-gradient(to right, #0000FF, #000088); padding: 20px; text-align: center; border: 4px solid #FFD700;">
    <h1 style="color: #FFD700; margin: 0; font-size: 24px;">PASSWORD RESTART</h1>
  </div>
  <div style="background-color: #000033; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(255,215,0,0.3); border: 4px solid #FFD700; border-top: none;">
    <p>PLAYER 1,</p>
    <p>SOMEONE REQUESTED A PASSWORD RESTART. IF NOT YOU, GAME OVER THIS EMAIL!</p>
    <p>PRESS START TO RESET:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" style="background-color: #FF0000; color: #FFD700; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; border: 2px solid #FFD700;">START RESET</a>
    </div>
    <p style="color: #FF0000;">POWER-UP EXPIRES IN 1 HOUR!</p>
    <p>GAME ON!<br>PAC-AUTH</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #4444FF; font-size: 0.8em;">
    <p>AUTOMATED MESSAGE - NO CONTINUES!</p>
  </div>
</body>
</html>
`;