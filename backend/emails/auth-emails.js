const successReg = (email, name, locale) => {
	if (locale === "ru-RU") {
		return {
			to: email,
			from: process.env.EMAIL_FROM,
			subject: "Успешная регистрация",
			html: `
      <h1>Мы рады приветствовать Вас!</h1>
      <p>Ваша регистрация прошла успешно</p>
      <p>Ваш Email - ${email}</p>
      <p>Ваше имя - ${name}</p>
      <hr/>
      <a href='${process.env.BASE_URL}'>Bright's Pilates</a>
      `,
		};
	} else if (locale === "en-US") {
		return {
			to: email,
			from: process.env.EMAIL_FROM,
			subject: "Successful registration",
			html: `
      <h1>Welcome!</h1>
      <p>Your account was successful created</p>
      <p>Your Email - ${email}</p>
      <p>Your name - ${name}</p>
      <hr/>
      <a href='${process.env.BASE_URL}'>Bright's Pilates</a>
      `,
		};
	} else {
		return {
			to: email,
			from: process.env.EMAIL_FROM,
			subject: "Successful registration",
			html: `
      <h1>Welcome!</h1>
      <p>Your account was successful created</p>
      <p>Your Email - ${email}</p>
      <p>Your name - ${name}</p>
      <hr/>
      <a href='${process.env.BASE_URL}'>Bright's Pilates</a>
      `,
		};
	}
};

const resetPass = (email, token, locale) => {
	//console.log(`LOCALE: `, locale);//!
	if (locale === "ru-RU") {
		return {
			to: email,
			from: process.env.EMAIL_FROM,
			subject: "Изменение пароля",
			html: `
    <h1>Вы хотите поменять свой пароль?</h1>
    <p>Если нет, проигнорируйте это письмо</p>
    <p>Или для изменения пароля нажмите на ссылку ниже:</p>
    <p><a href="${process.env.BASE_URL}/auth/new/password/${token}">Create new password</a></p>
    <hr/>
    <a href='${process.env.BASE_URL}'>Bright's Pilates</a>
    `,
		};
	} else if (locale === "en-US") {
		return {
			to: email,
			from: process.env.EMAIL_FROM,
			subject: "Reset password",
			html: `
  <h1>Do yuo want change your password?</h1>
  <p>If not, ignore this message</p>
  <p>Or, click this link below:</p>
  <p><a href="${process.env.BASE_URL}/auth/new/password/${token}">Создать новый пароль</a></p>
  <hr/>
  <a href='${process.env.BASE_URL}'>Shop</a>
  `,
		};
	} else {
		return {
			to: email,
			from: process.env.EMAIL_FROM,
			subject: "Successful registration",
			html: `
      <h1>Welcome!</h1>
      <p>Your account was successful created</p>
      <p>Your Email - ${email}</p>
      <p>Your name - ${name}</p>
      <hr/>
      <a href='${process.env.BASE_URL}'>Bright's Pilates</a>
      `,
		};
	}
};

module.exports = { successReg, resetPass };
