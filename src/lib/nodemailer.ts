// // src/lib/nodemailer.ts
// import nodemailer from "nodemailer"

// export const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com", // Pour Gmail
//   port: 465,
//   secure: true, // true pour 465, false pour 587
//   auth: {
//     user: process.env.EMAIL_USER, // Ton email
//     pass: process.env.EMAIL_PASS // Mot de passe ou app password
//   }
// })

// export const sendOrderEmail = async (orderData: any) => {
//   const mailOptions = {
//     from: `"Brand Store" <${process.env.EMAIL_USER}>`,
//     to: process.env.ADMIN_EMAIL, // l'email de réception (toi)
//     subject: "🛒 Nouvelle commande reçue",
//     html: `
//       <h2>Nouvelle commande reçue !</h2>
//       <p><strong>Nom :</strong> ${orderData.customerName}</p>
//       <p><strong>Email :</strong> ${orderData.customerEmail}</p>
//       <p><strong>Montant total :</strong> ${orderData.total} MAD</p>
//       <p><strong>Produits :</strong></p>
//       <ul>
//         ${orderData.items
//           .map(
//             (item: any) =>
//               `<li>${item.name} - ${item.quantity} × ${item.price} MAD</li>`
//           )
//           .join("")}
//       </ul>
//     `
//   }

//   await transporter.sendMail(mailOptions)
// }

import { Discount } from "@/types/discount"
import nodemailer, { Transporter } from "nodemailer"

interface OrderItem {
  id: string
  name: string
  category: string
  price: number
  quantity: number
  image: string
}

interface OrderData {
  customerName: string
  city: string
  phoneNumber: string
  subtotal: number
  shipping: number
  total: number
  items: OrderItem[]
  status: string
  coupon: Discount | null
}

interface MailOptions {
  from: string
  to: string
  subject: string
  html: string
}

// ✅ Configuration du transporteur Nodemailer
export const transporter: Transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true pour 465, false pour 587
  auth: {
    user: process.env.EMAIL_USER as string,
    pass: process.env.EMAIL_PASS as string
  }
})

// ✅ Fonction pour envoyer un email lorsqu’une commande arrive
export const sendOrderEmail = async (orderData: OrderData): Promise<void> => {
  // Construction de la liste des produits
  const itemsList = orderData.items
    .map(
      (item) => `
        <li style="margin-bottom: 8px;">
          <img src="${item.image}" alt="${
        item.name
      }" width="50" height="50" style="vertical-align: middle; border-radius: 8px; margin-right: 8px;" />
          <strong>${item.name}</strong> (${item.category}) - ${
        item.quantity
      } × ${item.price.toFixed(2)} MAD
        </li>
      `
    )
    .join("")

  // Structure de l’email
  const mailOptions: MailOptions = {
    from: `"Brand Store" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL as string,
    subject: "🛒 Nouvelle commande reçue",
    html: `
      <h2>Nouvelle commande reçue !</h2>
      <p><strong>Nom :</strong> ${orderData.customerName}</p>
      <p><strong>Ville :</strong> ${orderData.city}</p>
      <p><strong>Téléphone :</strong> ${orderData.phoneNumber}</p>
      <hr/>
      <p><strong>Sous-total :</strong> ${orderData.subtotal.toFixed(2)} MAD</p>
      <p><strong>Livraison :</strong> ${orderData.shipping.toFixed(2)} MAD</p>
      <p><strong>Discount :</strong> <b>${orderData.coupon?.name?.ar ?? "--"}/${
      orderData.coupon?.name?.fr ?? "--"
    }</b></p>
      <p><strong>Total :</strong> <b>${orderData.total.toFixed(2)} MAD</b></p>
      <p><strong>Status :</strong> ${orderData.status}</p>
      <hr/>
      <h3>🧾 Détails de la commande :</h3>
      <ul style="list-style: none; padding-left: 0;">${itemsList}</ul>
    `
  }

  await transporter.sendMail(mailOptions)
}
