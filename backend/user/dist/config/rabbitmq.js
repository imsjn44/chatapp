import amqplib from "amqplib";
let channel;
export const connectRabbitMQ = async () => {
    try {
        const connection = await amqplib.connect({
            protocol: "amqp",
            hostname: process.env.RABBITMQ_HOST,
            username: process.env.RABBITMQ_USERNAME,
            password: process.env.RABBITMQ_PASSWORD,
        });
        channel = await connection.createChannel();
        console.log("✅Rabbit MQ connected");
    }
    catch (error) {
        console.log("Failed to connect to rabbitmq", error);
    }
};
