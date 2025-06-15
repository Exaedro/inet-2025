import { MercadoPagoConfig, Preference } from "mercadopago";

const MERCADOPAGO_ACCESS_TOKEN = "APP_USR-6641767894799180-061417-42727984b95194ba923dc9ba6e8631a2-2499178144"

const mercadopago = new MercadoPagoConfig({
    accessToken: MERCADOPAGO_ACCESS_TOKEN,
});

export const submit = async (order) => {
    const preference = await new Preference(mercadopago).create({
        body: {
            items: order
        }
    })

    return preference.init_point
}