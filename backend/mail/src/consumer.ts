import dotenv from "dotenv";
dotenv.config();
import amqplib from "amqplib";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
if (!process.env.RESEND_API_KEY) {
  console.log("RESEND_API_KEY not defined");
}

export const startSendOTPConsumer = async () => {
  try {
    const connection = await amqplib.connect(process.env.RABBITMQ_URL!);
    // console.log("Host:", process.env.RABBITMQ_HOST);
    // console.log("Password:", process.env.RABBITMQ_PASSWORD);
    // console.log("USername:", process.env.RABBITMQ_USERNAME);
    const channel = await connection.createChannel();
    console.log("✅Rabbit MQ connected");

    const queueName = "send-otp";
    await channel.assertQueue(queueName, { durable: true });
    console.log("Mail service started listening for an OTP email");

    channel.consume(queueName, async (msg) => {
      if (msg) {
        try {
          const { to, subject, body } = JSON.parse(msg.content.toString());

          // Send via HTTP API instead of SMTP
          const { data, error } = await resend.emails.send({
            from: "onboarding@resend.dev", // Free tier requires this exact address
            to: to,
            subject: subject,
            text: body,
          });

          if (error) {
            console.error("Resend API Error:", error);
            return;
          }

          channel.ack(msg);
          console.log(`OTP mail sent successfully to ${to}. ID: ${data?.id}`);
        } catch (error) {
          console.error("Failed to process queue message:", error);
        }
      }
    });
  } catch (error) {
    console.error("Failed to start RabbitMQ consumer:", error);
  }
};
