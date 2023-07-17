const { Schema, model } = require("mongoose");

const clientSchema = new Schema(
    {
        type: {
            type: String,
            enum: ['client', 'supplier'],
            required: true
        },
        name: {
            type: String,
            required: [true, 'Por favor, introduzca un nombre.'],
            trim: true
        },
        lastName: {
            type: String,
            required: [true, 'Por favor, introduzca un apellido.'],
            trim: true
        },
        email: {
            type: String,
            required: [true, 'Email is required.'],
            unique: true,

            trim: true
        },
        dni: {
            type: String,
            required: [true, 'Por favor, introduzca un DNI.']
        },
        address: {
            type: String,
            required: [true, 'Por favor, introduzca una dirección.']
        },
        location: {
            type: String,
            required: [true, 'Por favor, introduzca una localidad.']
        },
        postalCode: {
            type: Number,
            required: [true, 'Por favor, introduzca un código postal.']
        },
        phone1: {
            type: Number,
        },
        phone2: {
            type: Number,
        }
    },
    {
        timestamps: true
    }
);

const Client = model("Client", clientSchema);

module.exports = Client;
