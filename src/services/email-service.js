class EmailService {

    async sendWelcomeEmail(email, name) {
        const emailData = {
            subject: "¡Bienvenido a MoneyShare!",
            to: email,
            dataTemplate: { name },
            templateName: "registro.html"
        };

        try {
            const response = await this.sendEmail(emailData);
        } catch (error) {
            console.error("Error al enviar el correo:", error);
        }
    }

    async sendEmail(emailData) {
        const response = await fetch("https://send-email-function-ms.azurewebsites.net/api/emailservice", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(emailData)
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const result = await response.text();
        return result;
    }

}

export default EmailService;