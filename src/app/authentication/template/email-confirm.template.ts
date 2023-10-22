export const emailConfirmTemplate = (
  endpoint: string,
  name: string,
  id: number,
  code: string,
) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>Email Confirmation</title>
  </head>
  <body style="background-color: #f2f2f2; font-family: Arial, sans-serif; margin: 0; padding: 0;">
  
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
      <tr>
        <td align="center" style="padding: 20px;">
          <table width="600" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
            <tr>
              <td style="padding: 20px;">
                <h1 style="color: #333; font-size: 24px;">이메일 본인인증</h1>
                <p style="color: #555; font-size: 16px;">안녕하세요, ${name}님! 홍익대학교 소프트웨어 융합학과 회원가입 메일 인증입니다. 아래 버튼을 눌러 인증을 진행해 주시기 바랍니다. 해당 링크는 최초 수신 이후 3일간 유효합니다.</p>
                <p><a href="https://${process.env.API_HOST}${endpoint}?uid=${id}&key=${code}" style="background-color: #007BFF; color: #ffffff; text-decoration: none; border-radius: 5px; padding: 10px 20px; display: inline-block; font-size: 16px;">Confirm Email</a></p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  
  </body>
  </html>    
`;
};
