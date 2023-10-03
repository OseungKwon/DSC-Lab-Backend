export const dormancyAlertContentBuilder = (name: string) => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>User Account Dormancy Alert</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
          }
  
          .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #fff;
              border-radius: 5px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
  
          h1 {
              color: #333;
          }
  
          p {
              color: #666;
              font-size: 16px;
              line-height: 1.6;
          }
  
          .alert {
              background-color: #007BFF;
              color: white;
              text-align: center;
              padding: 10px;
              font-weight: bold;
          }
  
          .button {
              display: inline-block;
              background-color: #007BFF;
              color: white;
              padding: 10px 20px;
              text-decoration: none;
              border-radius: 5px;
              margin-top: 20px;
          }
  
          .button:hover {
              background-color: #0056b3;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <h1>미활동 계정 알림</h1>
          <p>안녕하세요 ${name}님 홍익대학교 소프트웨어 융합학과입니다.</p>
          <p>계정은 최대 12개월간 보존됩니다. 12개월 이후에는 계정이 삭제됩니다. ${name}님의 계정은 10개월간 활동 없음이 감지되었습니다.</p>
          <p>계정 보존을 하시고 싶은 경우에는 아래 링크를 통해 홈페이지 접속 후 로그인을 하여 활동을 갱신해주시기 바랍니다. 감사합니다.</p>
          <a class="button" href="${process.env.DOMAIN_URL}">홍익대학교 소프트웨어 융합학과 바로가기</a>
      </div>
  </body>
  </html>`;
};

export const dormancyAccountDeleteAlertContentBuilder = (name: string) => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>User Account Dormancy Alert</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
          }
  
          .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #fff;
              border-radius: 5px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
  
          h1 {
              color: #333;
          }
  
          p {
              color: #666;
              font-size: 16px;
              line-height: 1.6;
          }
  
          .alert {
              background-color: #007BFF;
              color: white;
              text-align: center;
              padding: 10px;
              font-weight: bold;
          }
  
          .button {
              display: inline-block;
              background-color: #007BFF;
              color: white;
              padding: 10px 20px;
              text-decoration: none;
              border-radius: 5px;
              margin-top: 20px;
          }
  
          .button:hover {
              background-color: #0056b3;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <h1>미활동 계정 삭제 알림</h1>
          <p>안녕하세요 ${name}님 홍익대학교 소프트웨어 융합학과입니다.</p>
          <p>${name}님의 계정은 12개월간 활동 없음이 감지되었습니다. 정책에 따라 계정이 삭제되었음을 알려드립니다. 감사합니다.</p>
      </div>
  </body>
  </html>`;
};
