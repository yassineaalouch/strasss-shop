// // // src/lib/nodemailer.ts
// // import nodemailer from "nodemailer"

// // export const transporter = nodemailer.createTransport({
// //   host: "smtp.gmail.com", // Pour Gmail
// //   port: 465,
// //   secure: true, // true pour 465, false pour 587
// //   auth: {
// //     user: process.env.EMAIL_USER, // Ton email
// //     pass: process.env.EMAIL_PASS // Mot de passe ou app password
// //   }
// // })

// // export const sendOrderEmail = async (orderData: any) => {
// //   const mailOptions = {
// //     from: `"Brand Store" <${process.env.EMAIL_USER}>`,
// //     to: process.env.ADMIN_EMAIL, // l'email de réception (toi)
// //     subject: "🛒 Nouvelle commande reçue",
// //     html: `
// //       <h2>Nouvelle commande reçue !</h2>
// //       <p><strong>Nom :</strong> ${orderData.customerName}</p>
// //       <p><strong>Email :</strong> ${orderData.customerEmail}</p>
// //       <p><strong>Montant total :</strong> ${orderData.total} MAD</p>
// //       <p><strong>Produits :</strong></p>
// //       <ul>
// //         ${orderData.items
// //           .map(
// //             (item: any) =>
// //               `<li>${item.name} - ${item.quantity} × ${item.price} MAD</li>`
// //           )
// //           .join("")}
// //       </ul>
// //     `
// //   }

// //   await transporter.sendMail(mailOptions)
// // }

// import { Discount } from "@/types/discount"
// import nodemailer, { Transporter } from "nodemailer"

// interface OrderItem {
//   id: string
//   name: string
//   category: string
//   price: number
//   quantity: number
//   image: string
// }

// interface OrderData {
//   customerName: string
//   customerAddress: string
//   customerPhone: string
//   subtotal: number
//   shipping: number
//   total: number
//   items: OrderItem[]
//   status: string
//   coupon: Discount | null
// }

// interface MailOptions {
//   from: string
//   to: string
//   subject: string
//   html: string
// }

// // ✅ Configuration du transporteur Nodemailer
// export const transporter: Transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 465,
//   secure: true, // true pour 465, false pour 587
//   auth: {
//     user: process.env.EMAIL_USER as string,
//     pass: process.env.EMAIL_PASS as string
//   }
// })

// // ✅ Fonction pour envoyer un email lorsqu’une commande arrive
// export const sendOrderEmail = async (orderData: OrderData): Promise<void> => {
//   // Construction de la liste des produits
//   const itemsList = orderData.items
//     .map(
//       (item) => `
//         <li style="margin-bottom: 8px;">
//           <img src="${item.image}" alt="${
//         item.name
//       }" width="50" height="50" style="vertical-align: middle; border-radius: 8px; margin-right: 8px;" />
//           <strong>${item.name}</strong> (${item.category}) - ${
//         item.quantity
//       } × ${item.price.toFixed(2)} MAD
//         </li>
//       `
//     )
//     .join("")

//   // Structure de l’email
//   const mailOptions: MailOptions = {
//     from: `" Strass Shop" <${process.env.EMAIL_USER}>`,
//     to: process.env.ADMIN_EMAIL as string,
//     subject: "🛒 Nouvelle commande reçue",
//     html: `
//       <h2>Nouvelle commande reçue !</h2>
//       <p><strong>Nom :</strong> ${orderData.customerName}</p>
//       <p><strong>Ville :</strong> ${orderData.customerAddress}</p>
//       <p><strong>Téléphone :</strong> ${orderData.customerPhone}</p>
//       <hr/>
//       <p><strong>Sous-total :</strong> ${orderData.subtotal.toFixed(2)} MAD</p>
//       <p><strong>Livraison :</strong> ${orderData.shipping.toFixed(2)} MAD</p>
//       <p><strong>Discount :</strong> <b>${orderData.coupon?.name?.ar ?? "--"}/${
//       orderData.coupon?.name?.fr ?? "--"
//     }</b></p>
//       <p><strong>Total :</strong> <b>${orderData.total.toFixed(2)} MAD</b></p>
//       <p><strong>Status :</strong> ${orderData.status}</p>
//       <hr/>
//       <h3>🧾 Détails de la commande :</h3>
//       <ul style="list-style: none; padding-left: 0;">${itemsList}</ul>
//     `
//   }

//   await transporter.sendMail(mailOptions)
// }

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
  customerAddress: string
  customerPhone: string
  subtotal: number
  shipping: number
  total: number
  items: OrderItem[]
  status: string
  coupon: { code: string; discountType: string; value: number } | null
}

// Configuration Nodemailer
export const transporter: Transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER as string,
    pass: process.env.EMAIL_PASS as string
  }
})

export const sendOrderEmail = async (orderData: OrderData): Promise<void> => {
  // Liste des produits
  const itemsList = orderData.items
    .map(
      (item) => `
      <tr style="border-bottom:1px solid #eee;">
        <td style="padding:8px;"><img src="${item.image}" alt="${
        item.name
      }" width="50" style="border-radius:6px;" /></td>
        <td style="padding:8px;">${item.name}</td>
        <td style="padding:8px; text-align:center;">${item.quantity}</td>
        <td style="padding:8px; text-align:right;">${item.price.toFixed(
          2
        )} MAD</td>
      </tr>`
    )
    .join("")

  // Coupon info
  // const couponHtml = orderData.coupon
  //   ? `<p><strong>Coupon :</strong> ${orderData.coupon.name?.ar ?? "--"} / ${
  //       orderData.coupon.name?.fr ?? "--"
  //     }
  //      - <strong>Valeur :</strong> ${orderData.coupon.value} ${
  //       orderData.coupon.type === "PERCENTAGE" ? "%" : "MAD"
  //     }
  //      - <strong>Type :</strong> ${
  //        orderData.coupon.type === "percentage" ? "Pourcentage" : "Fixe"
  //      }</p>`
  //   : "<p><strong>Coupon :</strong> Aucun</p>"
  const couponHtml = orderData.coupon
    ? (() => {
        const { code, value, discountType } = orderData.coupon
        let typeText = ""
        let valueText = ""

        switch (discountType) {
          case "PERCENTAGE":
            typeText = "Pourcentage"
            valueText = `${value}%`
            break
          case "BUY_X_GET_Y":
            typeText = "Offre X acheté / Y offert"
            valueText = `${value}` // ou mettre les détails exacts si disponibles
            break
          case "COUPON":
            typeText = "Réduction fixe"
            valueText = `${value} MAD`
            break
          default:
            typeText = "Inconnu"
            valueText = value ? `${value}` : "--"
        }

        return `<p><strong>Coupon :</strong> ${code ?? "--"}
        - <strong>Valeur :</strong> ${valueText} 
        - <strong>Type :</strong> ${typeText}</p>`
      })()
    : "<p><strong>Coupon :</strong> Aucun</p>"

  const mailOptions = {
    from: `"Strass Shop" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL as string,
    subject: `🛒 Nouvelle commande de ${orderData.customerName}`,
    html: `
      <div style="font-family:Arial, sans-serif; color:#333;">
        <h2 style="color:#FBBF24;">Nouvelle commande reçue !</h2>
        <p><strong>Nom :</strong> ${orderData.customerName}</p>
        <p><strong>Ville :</strong> ${orderData.customerAddress}</p>
        <p><strong>Téléphone :</strong> ${orderData.customerPhone}</p>
        <hr style="border:none; border-top:1px solid #eee; margin:10px 0;"/>
        <p><strong>Sous-total :</strong> ${orderData.subtotal.toFixed(
          2
        )} MAD</p>
        <p><strong>Livraison :</strong> ${orderData.shipping.toFixed(2)} MAD</p>
        ${couponHtml}
        <p><strong>Total :</strong> <span style="color:#FBBF24; font-weight:bold;">${orderData.total.toFixed(
          2
        )} MAD</span></p>
        <p><strong>Status :</strong> ${orderData.status}</p>
        <hr style="border:none; border-top:1px solid #eee; margin:10px 0;"/>
        <h3>🧾 Détails des produits :</h3>
        <table style="width:100%; border-collapse:collapse; margin-top:10px;">
          <thead>
            <tr style="background:#FBBF24; color:white;">
              <th style="padding:8px;">Image</th>
              <th style="padding:8px;">Produit</th>
              <th style="padding:8px;">Quantité</th>
              <th style="padding:8px;">Prix</th>
            </tr>
          </thead>
          <tbody>
            ${itemsList}
          </tbody>
        </table>
        <p style="margin-top:20px; font-size:12px; color:#888;">Strass Shop - Merci pour votre confiance !</p>
      </div>
    `
  }

  await transporter.sendMail(mailOptions)
}
