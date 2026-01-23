// "use client"

// import React, { useState } from "react"
// import axios from "axios"

// type ErrorResponse = {
//   message: string
//   field?: "username" | "password" | "confirmPassword"
// }

// export default function ChangeCredentialsForm() {
//   const [username, setUsername] = useState("")
//   const [password, setPassword] = useState("")
//   const [confirmPassword, setConfirmPassword] = useState("")
//   const [success, setSuccess] = useState("")
//   const [error, setError] = useState<ErrorResponse | null>(null)
//   const [loading, setLoading] = useState(false)

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError(null)
//     setSuccess("")
//     setLoading(true)

//     if (password !== confirmPassword) {
//       setError({ message: "Passwords do not match", field: "confirmPassword" })
//       setLoading(false)
//       return
//     }

//     try {
//       const response = await axios.put("/api/user", {
//         username,
//         password
//       })

//       if (response.data.success) {
//         setSuccess("Credentials updated successfully ✅")
//         setUsername("")
//         setPassword("")
//         setConfirmPassword("")
//       } else {
//         setError({ message: response.data.message || "Update failed" })
//       }
//     } catch (err) {
//       //   setError({ message: err.response?.data?.message || "Server error" })
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
//       >
//         <h2 className="text-2xl font-semibold text-center text-yellow-600 mb-6">
//           Change Admin Credentials
//         </h2>

//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">
//             Username
//           </label>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">
//             New Password
//           </label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">
//             Confirm Password
//           </label>
//           <input
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             className={`w-full p-2 border rounded-lg focus:ring-2 focus:outline-none ${
//               error?.field === "confirmPassword"
//                 ? "border-red-500 focus:ring-red-500"
//                 : "focus:ring-yellow-500"
//             }`}
//             required
//           />
//         </div>

//         {error && (
//           <p className="text-red-600 text-sm mb-2 text-center">
//             ⚠️ {error.message}
//           </p>
//         )}
//         {success && (
//           <p className="text-green-600 text-sm mb-2 text-center">
//             ✅ {success}
//           </p>
//         )}

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-yellow-500 text-white font-semibold py-2 rounded-lg hover:bg-yellow-600 transition disabled:opacity-60"
//         >
//           {loading ? "Updating..." : "Update Credentials"}
//         </button>
//       </form>
//     </div>
//   )
// }

// "use client"

// import React, { useState } from "react"
// import axios from "axios"
// import {
//   Eye,
//   EyeOff,
//   Save,
//   Shield,
//   User,
//   Key,
//   CheckCircle,
//   AlertCircle
// } from "lucide-react"
// import { motion, AnimatePresence } from "framer-motion"

// type ErrorResponse = {
//   message: string
//   field?: "username" | "password" | "confirmPassword"
// }

// export default function ChangeCredentialsForm() {
//   const [username, setUsername] = useState("")
//   const [password, setPassword] = useState("")
//   const [confirmPassword, setConfirmPassword] = useState("")
//   const [success, setSuccess] = useState("")
//   const [error, setError] = useState<ErrorResponse | null>(null)
//   const [loading, setLoading] = useState(false)
//   const [showPassword, setShowPassword] = useState(false)
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false)

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError(null)
//     setSuccess("")
//     setLoading(true)

//     if (password !== confirmPassword) {
//       setError({
//         message: "Les mots de passe ne correspondent pas",
//         field: "confirmPassword"
//       })
//       setLoading(false)
//       return
//     }

//     if (password.length < 6) {
//       setError({
//         message: "Le mot de passe doit contenir au moins 6 caractères",
//         field: "password"
//       })
//       setLoading(false)
//       return
//     }

//     try {
//       const response = await axios.put("/api/user", {
//         username,
//         password
//       })

//       if (response.data.success) {
//         setSuccess("Identifiants administrateur mis à jour avec succès ✅")
//         setUsername("")
//         setPassword("")
//         setConfirmPassword("")
//       } else {
//         setError({
//           message: response.data.message || "Échec de la mise à jour"
//         })
//       }
//     } catch (err: any) {
//       setError({
//         message:
//           err.response?.data?.message || "Erreur serveur. Veuillez réessayer."
//       })
//     } finally {
//       setLoading(false)
//     }
//   }

//   const passwordStrength = {
//     length: password.length >= 6,
//     uppercase: /[A-Z]/.test(password),
//     lowercase: /[a-z]/.test(password),
//     number: /[0-9]/.test(password),
//     special: /[^A-Za-z0-9]/.test(password)
//   }

//   const strengthScore = Object.values(passwordStrength).filter(Boolean).length
//   const strengthColor = {
//     0: "bg-gray-200",
//     1: "bg-red-500",
//     2: "bg-orange-500",
//     3: "bg-yellow-500",
//     4: "bg-blue-500",
//     5: "bg-green-500"
//   }[strengthScore]

//   return (
//     <div className="min-h-screen  p-6">
//       <div className="max-w-2xl mx-auto">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center mb-8"
//         >
//           <div className="flex items-center justify-center gap-3 mb-4">
//             <div className="p-3 bg-blue-600 rounded-2xl">
//               <Shield className="w-8 h-8 text-white" />
//             </div>
//             <h1 className="text-3xl font-bold text-gray-900">
//               Sécurité Administrateur
//             </h1>
//           </div>
//           <p className="text-gray-600 text-lg">
//             Modifiez les identifiants d'accès à l'administration
//           </p>
//         </motion.div>

//         {/* Main Card */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.1 }}
//           className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
//         >
//           {/* Card Header */}
//           <div className="bg-gray-100 px-6 py-4">
//             <div className="flex items-center gap-3">
//               <Key className="w-6 h-6 " />
//               <h2 className="text-xl font-semibold ">
//                 Changer les Identifiants
//               </h2>
//             </div>
//           </div>

//           {/* Card Content */}
//           <div className="p-6">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Username Field */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   <div className="flex items-center gap-2">
//                     <User className="w-4 h-4 text-blue-600" />
//                     Nom d'utilisateur
//                   </div>
//                 </label>
//                 <input
//                   type="text"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                   placeholder="Entrez le nouveau nom d'utilisateur"
//                   required
//                 />
//               </div>

//               {/* Password Field */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   <div className="flex items-center gap-2">
//                     <Key className="w-4 h-4 text-blue-600" />
//                     Nouveau mot de passe
//                   </div>
//                 </label>
//                 <div className="relative">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className={`w-full p-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all pr-10 ${
//                       error?.field === "password"
//                         ? "border-red-500 focus:ring-red-500"
//                         : "border-gray-300 focus:ring-blue-500"
//                     }`}
//                     placeholder="Entrez le nouveau mot de passe"
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//                   >
//                     {showPassword ? (
//                       <EyeOff className="w-4 h-4" />
//                     ) : (
//                       <Eye className="w-4 h-4" />
//                     )}
//                   </button>
//                 </div>

//                 {/* Password Strength Indicator */}
//                 {password && (
//                   <motion.div
//                     initial={{ opacity: 0, height: 0 }}
//                     animate={{ opacity: 1, height: "auto" }}
//                     className="mt-3"
//                   >
//                     <div className="flex items-center justify-between mb-2">
//                       <span className="text-xs text-gray-500">
//                         Force du mot de passe:
//                       </span>
//                       <span className="text-xs font-medium text-gray-700">
//                         {strengthScore}/4
//                       </span>
//                     </div>
//                     <div className="w-full bg-gray-200 rounded-full h-2">
//                       <div
//                         className={`h-2 rounded-full transition-all duration-300 ${strengthColor}`}
//                         style={{ width: `${(strengthScore / 4) * 100}%` }}
//                       ></div>
//                     </div>

//                     {/* Password Requirements */}
//                     <div className="grid grid-cols-2 gap-1 mt-3">
//                       <div className="flex items-center gap-2">
//                         <div
//                           className={`w-3 h-3 rounded-full flex items-center justify-center ${
//                             passwordStrength.length
//                               ? "bg-green-500"
//                               : "bg-gray-300"
//                           }`}
//                         >
//                           {passwordStrength.length && (
//                             <CheckCircle className="w-2 h-2 text-white" />
//                           )}
//                         </div>
//                         <span
//                           className={`text-xs ${
//                             passwordStrength.length
//                               ? "text-green-600"
//                               : "text-gray-500"
//                           }`}
//                         >
//                           6+ caractères
//                         </span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <div
//                           className={`w-3 h-3 rounded-full flex items-center justify-center ${
//                             passwordStrength.uppercase
//                               ? "bg-green-500"
//                               : "bg-gray-300"
//                           }`}
//                         >
//                           {passwordStrength.uppercase && (
//                             <CheckCircle className="w-2 h-2 text-white" />
//                           )}
//                         </div>
//                         <span
//                           className={`text-xs ${
//                             passwordStrength.uppercase
//                               ? "text-green-600"
//                               : "text-gray-500"
//                           }`}
//                         >
//                           Majuscule
//                         </span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <div
//                           className={`w-3 h-3 rounded-full flex items-center justify-center ${
//                             passwordStrength.lowercase
//                               ? "bg-green-500"
//                               : "bg-gray-300"
//                           }`}
//                         >
//                           {passwordStrength.lowercase && (
//                             <CheckCircle className="w-2 h-2 text-white" />
//                           )}
//                         </div>
//                         <span
//                           className={`text-xs ${
//                             passwordStrength.lowercase
//                               ? "text-green-600"
//                               : "text-gray-500"
//                           }`}
//                         >
//                           Minuscule
//                         </span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <div
//                           className={`w-3 h-3 rounded-full flex items-center justify-center ${
//                             passwordStrength.number
//                               ? "bg-green-500"
//                               : "bg-gray-300"
//                           }`}
//                         >
//                           {passwordStrength.number && (
//                             <CheckCircle className="w-2 h-2 text-white" />
//                           )}
//                         </div>
//                         <span
//                           className={`text-xs ${
//                             passwordStrength.number
//                               ? "text-green-600"
//                               : "text-gray-500"
//                           }`}
//                         >
//                           Chiffre
//                         </span>
//                       </div>
//                     </div>
//                   </motion.div>
//                 )}
//               </div>

//               {/* Confirm Password Field */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Confirmer le mot de passe
//                 </label>
//                 <div className="relative">
//                   <input
//                     type={showConfirmPassword ? "text" : "password"}
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                     className={`w-full p-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all pr-10 ${
//                       error?.field === "confirmPassword"
//                         ? "border-red-500 focus:ring-red-500"
//                         : "border-gray-300 focus:ring-blue-500"
//                     }`}
//                     placeholder="Confirmez le nouveau mot de passe"
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//                   >
//                     {showConfirmPassword ? (
//                       <EyeOff className="w-4 h-4" />
//                     ) : (
//                       <Eye className="w-4 h-4" />
//                     )}
//                   </button>
//                 </div>
//               </div>

//               {/* Messages d'alerte */}
//               <AnimatePresence>
//                 {error && (
//                   <motion.div
//                     initial={{ opacity: 0, height: 0 }}
//                     animate={{ opacity: 1, height: "auto" }}
//                     exit={{ opacity: 0, height: 0 }}
//                     className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg"
//                   >
//                     <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
//                     <p className="text-red-700 text-sm">{error.message}</p>
//                   </motion.div>
//                 )}

//                 {success && (
//                   <motion.div
//                     initial={{ opacity: 0, height: 0 }}
//                     animate={{ opacity: 1, height: "auto" }}
//                     exit={{ opacity: 0, height: 0 }}
//                     className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg"
//                   >
//                     <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
//                     <p className="text-green-700 text-sm">{success}</p>
//                   </motion.div>
//                 )}
//               </AnimatePresence>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 disabled={loading || !username || !password || !confirmPassword}
//                 className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
//               >
//                 {loading ? (
//                   <>
//                     <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                     Mise à jour en cours...
//                   </>
//                 ) : (
//                   <>
//                     <Save className="w-5 h-5" />
//                     Mettre à jour les identifiants
//                   </>
//                 )}
//               </button>
//             </form>

//             {/* Security Tips */}
//             <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
//               <h3 className="text-sm font-semibold text-blue-900 mb-2 flex items-center gap-2">
//                 <Shield className="w-4 h-4" />
//                 Conseils de sécurité
//               </h3>
//               <ul className="text-xs text-blue-700 space-y-1">
//                 <li>• Utilisez un mot de passe fort et unique</li>
//                 <li>• Évitez les mots de passe courants ou personnels</li>
//                 <li>• Changez régulièrement vos identifiants</li>
//                 <li>• Ne partagez jamais vos accès administrateur</li>
//               </ul>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   )
// }

"use client"

import React, { useState } from "react"
import axios from "axios"
import {
  Eye,
  EyeOff,
  Save,
  Shield,
  User,
  Key,
  CheckCircle,
  AlertCircle,
  Cloud,
  Settings
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type ErrorResponse = {
  message: string
  field?: "username" | "password" | "confirmPassword"
}

type PasswordStrength = {
  length: boolean
  uppercase: boolean
  lowercase: boolean
  number: boolean
  special: boolean
}

export default function ChangeCredentialsForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [success, setSuccess] = useState("")
  const [error, setError] = useState<ErrorResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  // États pour la configuration CORS
  const [corsLoading, setCorsLoading] = useState(false)
  const [corsSuccess, setCorsSuccess] = useState("")
  const [corsError, setCorsError] = useState("")

  const passwordStrength: PasswordStrength = {
    length: password.length >= 6,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password)
  }

  const strengthScore = Object.values(passwordStrength).filter(Boolean).length
  const isPasswordStrong = strengthScore >= 4 // Au moins 4/5 conditions

  const strengthColor = {
    0: "bg-gray-200",
    1: "bg-red-500",
    2: "bg-orange-500",
    3: "bg-yellow-500",
    4: "bg-blue-500",
    5: "bg-green-500"
  }[strengthScore]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess("")
    setLoading(true)

    // Validation des champs requis
    if (!username.trim()) {
      setError({
        message: "Le nom d'utilisateur est requis",
        field: "username"
      })
      setLoading(false)
      return
    }

    if (!password) {
      setError({
        message: "Le mot de passe est requis",
        field: "password"
      })
      setLoading(false)
      return
    }

    if (!confirmPassword) {
      setError({
        message: "Veuillez confirmer le mot de passe",
        field: "confirmPassword"
      })
      setLoading(false)
      return
    }
    console.log("canSubmit", canSubmit)
    console.log("isPasswordStrong", isPasswordStrong)
    // Validation de la force du mot de passe
    if (!isPasswordStrong || !canSubmit) {
      setError({
        message:
          "Le mot de passe n'est pas assez fort. Veuillez respecter toutes les exigences de sécurité.",
        field: "password"
      })
      setLoading(false)
      return
    }

    // Validation de la correspondance des mots de passe
    if (password !== confirmPassword) {
      setError({
        message: "Les mots de passe ne correspondent pas",
        field: "confirmPassword"
      })
      setLoading(false)
      return
    }

    try {
      const response = await axios.put("/api/user", {
        username: username.trim(),
        password
      })

      if (response.data.success) {
        setSuccess("Identifiants administrateur mis à jour avec succès ✅")
        setUsername("")
        setPassword("")
        setConfirmPassword("")
      } else {
        setError({
          message: response.data.message || "Échec de la mise à jour"
        })
      }
    } catch (err: unknown) {
      let errorMessage = "Erreur serveur. Veuillez réessayer."

      if (axios.isAxiosError(err) && err.response?.data?.message) {
        errorMessage = err.response.data.message
      } else if (err instanceof Error) {
        errorMessage = err.message
      }

      setError({
        message: errorMessage
      })
    } finally {
      setLoading(false)
    }
  }

  // Vérifie si le formulaire peut être soumis
  const canSubmit =
    username.trim().length > 0 &&
    password.length > 0 &&
    confirmPassword.length > 0 &&
    isPasswordStrong &&
    password === confirmPassword

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-2xl">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              Sécurité Administrateur
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Modifiez les identifiants d&apos;accès à l&apos;administration
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
        >
          {/* Card Header */}
          <div className="bg-gray-100 px-6 py-4">
            <div className="flex items-center gap-3">
              <Key className="w-6 h-6" />
              <h2 className="text-xl font-semibold">
                Changer les Identifiants
              </h2>
            </div>
          </div>

          {/* Card Content */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-blue-600" />
                    Nom d&apos;utilisateur
                  </div>
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Entrez le nouveau nom d'utilisateur"
                  required
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <Key className="w-4 h-4 text-blue-600" />
                    Nouveau mot de passe
                  </div>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all pr-10 ${
                      error?.field === "password"
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                    placeholder="Entrez le nouveau mot de passe"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {password && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-3"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-500">
                        Force du mot de passe:
                      </span>
                      <span
                        className={`text-xs font-medium ${
                          isPasswordStrong ? "text-green-600" : "text-gray-700"
                        }`}
                      >
                        {strengthScore}/4 {isPasswordStrong && "✓"}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${strengthColor}`}
                        style={{ width: `${(strengthScore / 4) * 100}%` }}
                      ></div>
                    </div>

                    {/* Password Requirements */}
                    <div className="grid grid-cols-2 gap-2 mt-3">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center ${
                            passwordStrength.length
                              ? "bg-green-500"
                              : "bg-gray-300"
                          }`}
                        >
                          {passwordStrength.length && (
                            <CheckCircle className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <span
                          className={`text-sm ${
                            passwordStrength.length
                              ? "text-green-600 font-medium"
                              : "text-gray-500"
                          }`}
                        >
                          6+ caractères
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center ${
                            passwordStrength.uppercase
                              ? "bg-green-500"
                              : "bg-gray-300"
                          }`}
                        >
                          {passwordStrength.uppercase && (
                            <CheckCircle className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <span
                          className={`text-sm ${
                            passwordStrength.uppercase
                              ? "text-green-600 font-medium"
                              : "text-gray-500"
                          }`}
                        >
                          Majuscule
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center ${
                            passwordStrength.lowercase
                              ? "bg-green-500"
                              : "bg-gray-300"
                          }`}
                        >
                          {passwordStrength.lowercase && (
                            <CheckCircle className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <span
                          className={`text-sm ${
                            passwordStrength.lowercase
                              ? "text-green-600 font-medium"
                              : "text-gray-500"
                          }`}
                        >
                          Minuscule
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center ${
                            passwordStrength.number
                              ? "bg-green-500"
                              : "bg-gray-300"
                          }`}
                        >
                          {passwordStrength.number && (
                            <CheckCircle className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <span
                          className={`text-sm ${
                            passwordStrength.number
                              ? "text-green-600 font-medium"
                              : "text-gray-500"
                          }`}
                        >
                          Chiffre
                        </span>
                      </div>
                    </div>

                    {!isPasswordStrong && password.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded-lg"
                      >
                        <p className="text-yellow-700 text-xs text-center">
                          ⚠️ Le mot de passe doit respecter toutes les exigences
                          de sécurité
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all pr-10 ${
                      error?.field === "confirmPassword" ||
                      (confirmPassword && password !== confirmPassword)
                        ? "border-red-500 focus:ring-red-500"
                        : confirmPassword && password === confirmPassword
                        ? "border-green-500 focus:ring-green-500"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                    placeholder="Confirmez le nouveau mot de passe"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {confirmPassword && password !== confirmPassword && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-600 text-xs mt-1"
                  >
                    ⚠️ Les mots de passe ne correspondent pas
                  </motion.p>
                )}
                {confirmPassword &&
                  password === confirmPassword &&
                  isPasswordStrong && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-green-600 text-xs mt-1"
                    >
                      ✓ Les mots de passe correspondent
                    </motion.p>
                  )}
              </div>

              {/* Messages d'alerte */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg"
                  >
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <p className="text-red-700 text-sm">{error.message}</p>
                  </motion.div>
                )}

                {success && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <p className="text-green-700 text-sm">{success}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Mise à jour en cours...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Mettre à jour les identifiants
                  </>
                )}
              </button>
            </form>

            {/* Security Tips */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="text-sm font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Conseils de sécurité
              </h3>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• Le mot de passe doit contenir au moins 6 caractères</li>
                <li>• Inclure des majuscules, minuscules et chiffres</li>
                <li>• Évitez les mots de passe courants ou personnels</li>
                <li>• Changez régulièrement vos identifiants</li>
                <li>• Ne partagez jamais vos accès administrateur</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Configuration CORS Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden mt-6"
        >
          <div className="bg-gray-100 px-6 py-4">
            <div className="flex items-center gap-3">
              <Cloud className="w-6 h-6" />
              <h2 className="text-xl font-semibold">
                Configuration S3 CORS
              </h2>
            </div>
          </div>

          <div className="p-6">
            <p className="text-gray-600 text-sm mb-4">
              Configurez automatiquement CORS sur votre bucket S3 pour permettre les uploads directs depuis le navigateur.
              Cette configuration utilise les variables d&apos;environnement de votre serveur de production.
            </p>

            <AnimatePresence>
              {corsError && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg mb-4"
                >
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <p className="text-red-700 text-sm">{corsError}</p>
                </motion.div>
              )}

              {corsSuccess && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg mb-4"
                >
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-green-700 text-sm font-medium">{corsSuccess}</p>
                    <p className="text-green-600 text-xs mt-1">
                      Les uploads d&apos;images devraient maintenant fonctionner sans erreur CORS.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={async () => {
                setCorsLoading(true)
                setCorsError("")
                setCorsSuccess("")
                
                try {
                  const response = await axios.get("/api/configure-cors")
                  
                  if (response.data.success) {
                    setCorsSuccess(
                      `CORS configuré avec succès sur le bucket: ${response.data.bucket}`
                    )
                  } else {
                    setCorsError(response.data.error || "Erreur lors de la configuration CORS")
                  }
                } catch (err: any) {
                  setCorsError(
                    err.response?.data?.error || 
                    err.message || 
                    "Erreur lors de la configuration CORS"
                  )
                } finally {
                  setCorsLoading(false)
                }
              }}
              disabled={corsLoading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              {corsLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Configuration en cours...
                </>
              ) : (
                <>
                  <Settings className="w-5 h-5" />
                  Configurer CORS automatiquement
                </>
              )}
            </button>

            <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h3 className="text-sm font-semibold text-yellow-900 mb-2 flex items-center gap-2">
                <Cloud className="w-4 h-4" />
                Note importante
              </h3>
              <ul className="text-xs text-yellow-700 space-y-1">
                <li>• Cette action configure CORS sur le bucket S3 actuel (détecté automatiquement)</li>
                <li>• En production, le bucket utilisé est <code className="bg-yellow-100 px-1 rounded">taha-strass-shop</code></li>
                <li>• En développement, le bucket utilisé est <code className="bg-yellow-100 px-1 rounded">strass-shop</code></li>
                <li>• Les origines autorisées incluent localhost:3000 et strass-shop.com</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
