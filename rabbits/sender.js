"use strict"

const amqp = require('amqplib/callback_api');

const send = (EXCHANGE_NAME, message) => {
    amqp.connect(`amqp://localhost`, function(error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function(error1, channel) {
            if (error1) {
                throw error1;
            }
            channel.assertExchange(EXCHANGE_NAME, 'fanout', {
                durable: false
            });
            // publish/kirim message ke receiver
            channel.publish(EXCHANGE_NAME, '', Buffer.from(message));
            console.log(` [x] ${EXCHANGE_NAME} Sent: ${message} `);
            setTimeout(function() {
                //Tutup koneksi ke RabbitMQ setelah selesai menggunakan.
                connection.close();
            }, 500);
        });
    });

}

module.exports = { send }