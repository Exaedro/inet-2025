import { MercadoPagoConfig, Preference } from "mercadopago";

const MERCADOPAGO_ACCESS_TOKEN = ""

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