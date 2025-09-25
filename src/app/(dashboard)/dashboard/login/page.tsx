// "use client"
// import React, { useState, ChangeEvent } from "react"
// import {
//   Eye,
//   EyeOff,
//   Lock,
//   User,
//   Shield,
//   AlertCircle,
//   CheckCircle
// } from "lucide-react"

// // Types TypeScript
// interface FormData {
//   username: string
//   password: string
// }

// interface FormErrors {
//   username?: string
//   password?: string
//   general?: string
// }

// interface ValidationResult {
//   isValid: boolean
//   errors: FormErrors
// }

// // Types pour les props des composants
// interface InputFieldProps {
//   type: "text" | "password"
//   value: string
//   onChange: (value: string) => void
//   placeholder: string
//   icon: React.ElementType
//   error?: string
//   disabled: boolean
//   showPasswordToggle?: boolean
//   onTogglePassword?: () => void
//   showPassword?: boolean
// }

// interface ErrorMessageProps {
//   message: string
//   type: "error" | "warning" | "info"
// }

// interface LoadingSpinnerProps {
//   size?: "sm" | "md" | "lg"
//   className?: string
// }

// // Constantes de configuration
// const CONFIG = {
//   MAX_LOGIN_ATTEMPTS: 3,
//   BLOCK_DURATION_MS: 5 * 60 * 1000, // 5 minutes
//   MIN_USERNAME_LENGTH: 3,
//   MIN_PASSWORD_LENGTH: 6,
//   DEMO_CREDENTIALS: {
//     username: "admin",
//     password: "password123"
//   }
// } as const

// // Composant Spinner de chargement
// const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
//   size = "md",
//   className = ""
// }) => {
//   const sizeClasses = {
//     sm: "w-4 h-4",
//     md: "w-6 h-6",
//     lg: "w-8 h-8"
//   }

//   return (
//     <div
//       className={`border-2 border-white/30 border-t-white rounded-full animate-spin ${sizeClasses[size]} ${className}`}
//       role="status"
//       aria-label="Chargement"
//     />
//   )
// }

// // Composant Message d'erreur
// const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, type }) => {
//   const typeStyles = {
//     error: "bg-red-500/20 border-red-400/30 text-red-300",
//     warning: "bg-yellow-500/20 border-yellow-400/30 text-yellow-300",
//     info: "bg-blue-500/20 border-blue-400/30 text-blue-300"
//   }

//   const iconColor = {
//     error: "text-red-400",
//     warning: "text-yellow-400",
//     info: "text-blue-400"
//   }

//   return (
//     <div
//       className={`mb-6 p-4 border rounded-xl flex items-start ${typeStyles[type]}`}
//     >
//       <AlertCircle
//         size={20}
//         className={`mr-3 mt-0.5 flex-shrink-0 ${iconColor[type]}`}
//       />
//       <span className="text-sm">{message}</span>
//     </div>
//   )
// }

// // Composant Champ d'entrée
// const InputField: React.FC<InputFieldProps> = ({
//   type,
//   value,
//   onChange,
//   placeholder,
//   icon: Icon,
//   error,
//   disabled,
//   showPasswordToggle = false,
//   onTogglePassword,
//   showPassword = false
// }) => {
//   const inputType = type === "password" && showPassword ? "text" : type

//   return (
//     <div>
//       <div className="relative">
//         <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
//           <Icon size={20} className="text-gray-400" />
//         </div>
//         <input
//           type={inputType}
//           value={value}
//           onChange={(e: ChangeEvent<HTMLInputElement>) =>
//             onChange(e.target.value)
//           }
//           className={`w-full pl-12 pr-${
//             showPasswordToggle ? "12" : "4"
//           } py-4 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
//             error
//               ? "border-red-400 focus:ring-red-400/50"
//               : "border-white/20 focus:border-purple-400 focus:ring-purple-400/50"
//           }`}
//           placeholder={placeholder}
//           disabled={disabled}
//           autoComplete={type === "password" ? "current-password" : "username"}
//         />
//         {showPasswordToggle && onTogglePassword && (
//           <button
//             type="button"
//             onClick={onTogglePassword}
//             className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-300 transition-colors"
//             disabled={disabled}
//             aria-label={
//               showPassword
//                 ? "Masquer le mot de passe"
//                 : "Afficher le mot de passe"
//             }
//           >
//             {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//           </button>
//         )}
//       </div>
//       {error && (
//         <p className="mt-2 text-red-400 text-sm flex items-center">
//           <AlertCircle size={14} className="mr-1" />
//           {error}
//         </p>
//       )}
//     </div>
//   )
// }

// // Composant principal
// const AdminLoginPage: React.FC = () => {
//   // États avec types précis
//   const [formData, setFormData] = useState<FormData>({
//     username: "",
//     password: ""
//   })

//   const [showPassword, setShowPassword] = useState<boolean>(false)
//   const [isLoading, setIsLoading] = useState<boolean>(false)
//   const [errors, setErrors] = useState<FormErrors>({})
//   const [loginAttempts, setLoginAttempts] = useState<number>(0)
//   const [isBlocked, setIsBlocked] = useState<boolean>(false)
//   const [blockTimer, setBlockTimer] = useState<NodeJS.Timeout | null>(null)

//   // Gestionnaire de changement typé
//   const handleChange = (field: keyof FormData, value: string): void => {
//     setFormData((prev) => ({ ...prev, [field]: value }))

//     // Effacer l'erreur quand l'utilisateur commence à taper
//     if (errors[field]) {
//       setErrors((prev) => ({ ...prev, [field]: undefined }))
//     }
//   }

//   // Validation du formulaire avec types
//   const validateForm = (): ValidationResult => {
//     const newErrors: FormErrors = {}

//     if (!formData.username.trim()) {
//       newErrors.username = "Le nom d'utilisateur est requis"
//     } else if (formData.username.length < CONFIG.MIN_USERNAME_LENGTH) {
//       newErrors.username = `Le nom d'utilisateur doit contenir au moins ${CONFIG.MIN_USERNAME_LENGTH} caractères`
//     }

//     if (!formData.password) {
//       newErrors.password = "Le mot de passe est requis"
//     } else if (formData.password.length < CONFIG.MIN_PASSWORD_LENGTH) {
//       newErrors.password = `Le mot de passe doit contenir au moins ${CONFIG.MIN_PASSWORD_LENGTH} caractères`
//     }

//     setErrors(newErrors)
//     return {
//       isValid: Object.keys(newErrors).length === 0,
//       errors: newErrors
//     }
//   }

//   // Fonction de blocage avec timer
//   const blockAccount = (): void => {
//     setIsBlocked(true)
//     if (blockTimer) {
//       clearTimeout(blockTimer)
//     }

//     const timer = setTimeout(() => {
//       setIsBlocked(false)
//       setLoginAttempts(0)
//     }, CONFIG.BLOCK_DURATION_MS)

//     setBlockTimer(timer)
//   }

//   // Gestionnaire de soumission typé
//   const handleSubmit = async (): Promise<void> => {
//     if (isBlocked) {
//       alert(
//         "Compte temporairement bloqué. Veuillez réessayer dans quelques minutes."
//       )
//       return
//     }

//     const validation = validateForm()
//     if (!validation.isValid) return

//     setIsLoading(true)

//     try {
//       // Simulation d'une authentification avec délai
//       await new Promise<void>((resolve) => setTimeout(resolve, 2000))

//       // Vérification des identifiants
//       const isValidCredentials =
//         formData.username === CONFIG.DEMO_CREDENTIALS.username &&
//         formData.password === CONFIG.DEMO_CREDENTIALS.password

//       if (isValidCredentials) {
//         alert("Connexion réussie ! Redirection vers le dashboard...")
//         setLoginAttempts(0)
//         setErrors({})
//         // Ici vous pourriez rediriger vers le dashboard
//         // router.push('/admin/dashboard');
//       } else {
//         const newAttempts = loginAttempts + 1
//         setLoginAttempts(newAttempts)

//         if (newAttempts >= CONFIG.MAX_LOGIN_ATTEMPTS) {
//           blockAccount()
//           setErrors({
//             general: `Trop de tentatives échouées. Compte bloqué pendant ${
//               CONFIG.BLOCK_DURATION_MS / 60000
//             } minutes.`
//           })
//         } else {
//           setErrors({
//             general: `Identifiants incorrects. Tentative ${newAttempts}/${CONFIG.MAX_LOGIN_ATTEMPTS}`
//           })
//         }
//       }
//     } catch (error) {
//       console.error("Erreur lors de la connexion:", error)
//       setErrors({ general: "Erreur de connexion. Veuillez réessayer." })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   // Cleanup du timer au démontage
//   React.useEffect(() => {
//     return () => {
//       if (blockTimer) {
//         clearTimeout(blockTimer)
//       }
//     }
//   }, [blockTimer])

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
//       {/* Éléments décoratifs animés */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
//         <div
//           className="absolute top-3/4 right-1/4 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
//           style={{ animationDelay: "1000ms" }}
//         ></div>
//         <div className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl animate-bounce"></div>
//       </div>

//       <div className="relative z-10 w-full max-w-md">
//         {/* Card principale */}
//         <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
//           {/* Header */}
//           <div className="relative px-8 pt-8 pb-6 text-center">
//             <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
//               <Shield size={32} className="text-white" />
//             </div>
//             <h1 className="text-3xl font-bold text-white mb-2">
//               Connexion Admin
//             </h1>
//             <p className="text-gray-300">
//               Accédez au tableau de bord administrateur
//             </p>

//             {/* Indicateur de sécurité */}
//             <div className="inline-flex items-center mt-4 px-4 py-2 bg-green-500/20 border border-green-400/30 rounded-full">
//               <Lock size={14} className="text-green-400 mr-2" />
//               <span className="text-green-400 text-sm font-medium">
//                 Connexion sécurisée
//               </span>
//             </div>
//           </div>

//           {/* Formulaire */}
//           <div className="px-8 pb-8">
//             {errors.general && (
//               <ErrorMessage message={errors.general} type="error" />
//             )}

//             <div className="space-y-6">
//               {/* Champ nom d'utilisateur */}
//               <div>
//                 <label className="block text-gray-300 text-sm font-semibold mb-3">
//                   Nom d&apos;utilisateur
//                 </label>
//                 <InputField
//                   type="text"
//                   value={formData.username}
//                   onChange={(value) => handleChange("username", value)}
//                   placeholder="Entrez votre nom d'utilisateur"
//                   icon={User}
//                   error={errors.username}
//                   disabled={isLoading || isBlocked}
//                 />
//               </div>

//               {/* Champ mot de passe */}
//               <div>
//                 <label className="block text-gray-300 text-sm font-semibold mb-3">
//                   Mot de passe
//                 </label>
//                 <InputField
//                   type="password"
//                   value={formData.password}
//                   onChange={(value) => handleChange("password", value)}
//                   placeholder="Entrez votre mot de passe"
//                   icon={Lock}
//                   error={errors.password}
//                   disabled={isLoading || isBlocked}
//                   showPasswordToggle={true}
//                   onTogglePassword={() => setShowPassword(!showPassword)}
//                   showPassword={showPassword}
//                 />
//               </div>

//               {/* Indicateur de tentatives */}
//               {loginAttempts > 0 && !isBlocked && (
//                 <div className="flex items-center justify-center p-3 bg-yellow-500/20 border border-yellow-400/30 rounded-xl">
//                   <AlertCircle size={16} className="text-yellow-400 mr-2" />
//                   <span className="text-yellow-300 text-sm">
//                     Tentatives échouées: {loginAttempts}/
//                     {CONFIG.MAX_LOGIN_ATTEMPTS}
//                   </span>
//                 </div>
//               )}

//               {/* Bouton de connexion */}
//               <button
//                 type="button"
//                 onClick={handleSubmit}
//                 disabled={isLoading || isBlocked}
//                 className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 transform ${
//                   isLoading || isBlocked
//                     ? "bg-gray-600 text-gray-400 cursor-not-allowed"
//                     : "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 hover:scale-105 shadow-lg hover:shadow-xl"
//                 }`}
//                 aria-label="Se connecter au panneau d'administration"
//               >
//                 {isLoading ? (
//                   <div className="flex items-center justify-center">
//                     <LoadingSpinner size="md" className="mr-3" />
//                     Connexion en cours...
//                   </div>
//                 ) : isBlocked ? (
//                   <div className="flex items-center justify-center">
//                     <Lock size={20} className="mr-2" />
//                     Compte bloqué
//                   </div>
//                 ) : (
//                   <div className="flex items-center justify-center">
//                     <Shield size={20} className="mr-2" />
//                     Se connecter
//                   </div>
//                 )}
//               </button>
//             </div>

//             {/* Informations de test */}
//             <div className="mt-8 p-4 bg-blue-500/20 border border-blue-400/30 rounded-xl">
//               <div className="flex items-start">
//                 <CheckCircle
//                   size={16}
//                   className="text-blue-400 mr-2 mt-0.5 flex-shrink-0"
//                 />
//                 <div>
//                   <p className="text-blue-300 text-sm font-semibold mb-1">
//                     Compte de test :
//                   </p>
//                   <p className="text-blue-200 text-xs">
//                     <span className="font-mono">
//                       {CONFIG.DEMO_CREDENTIALS.username}
//                     </span>{" "}
//                     /{" "}
//                     <span className="font-mono">
//                       {CONFIG.DEMO_CREDENTIALS.password}
//                     </span>
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Footer */}
//             <div className="mt-8 text-center">
//               <p className="text-gray-400 text-xs">
//                 © 2025 STRASS SHOP - Panneau d&apos;administration sécurisé
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AdminLoginPage
"use client"
import React, { useState, ChangeEvent } from "react"
import { Eye, EyeOff, Lock, User, Shield, AlertCircle } from "lucide-react"
import Image from "next/image"

// Types TypeScript
interface FormData {
  username: string
  password: string
}

interface FormErrors {
  username?: string
  password?: string
  general?: string
}

interface ValidationResult {
  isValid: boolean
  errors: FormErrors
}

interface InputFieldProps {
  type: "text" | "password"
  value: string
  onChange: (value: string) => void
  placeholder: string
  icon: React.ElementType
  error?: string
  disabled: boolean
  showPasswordToggle?: boolean
  onTogglePassword?: () => void
  showPassword?: boolean
}

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

// Configuration
const CONFIG = {
  MAX_LOGIN_ATTEMPTS: 3,
  BLOCK_DURATION_MS: 5 * 60 * 1000,
  MIN_USERNAME_LENGTH: 3,
  MIN_PASSWORD_LENGTH: 6,
  DEMO_CREDENTIALS: {
    username: "admin",
    password: "password123"
  }
} as const

// Composant Spinner
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  className = ""
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  }

  return (
    <div
      className={`border-2 border-white/30 border-t-white rounded-full animate-spin ${sizeClasses[size]} ${className}`}
      role="status"
      aria-label="Chargement"
    />
  )
}

// Composant Champ d'entrée
const InputField: React.FC<InputFieldProps> = ({
  type,
  value,
  onChange,
  placeholder,
  icon: Icon,
  error,
  disabled,
  showPasswordToggle = false,
  onTogglePassword,
  showPassword = false
}) => {
  const inputType = type === "password" && showPassword ? "text" : type

  return (
    <div>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
          <Icon size={18} className="text-gray-400" />
        </div>
        <input
          type={inputType}
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChange(e.target.value)
          }
          className={`w-full pl-10 pr-${
            showPasswordToggle ? "10" : "3"
          } py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 text-sm ${
            error
              ? "border-red-400 focus:ring-red-400/50"
              : "border-white/20 focus:border-firstColor focus:ring-firstColor/50"
          }`}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={type === "password" ? "current-password" : "username"}
        />
        {showPasswordToggle && onTogglePassword && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300 transition-colors"
            disabled={disabled}
            aria-label={
              showPassword
                ? "Masquer le mot de passe"
                : "Afficher le mot de passe"
            }
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && (
        <p className="mt-1 text-red-400 text-xs flex items-center">
          <AlertCircle size={12} className="mr-1" />
          {error}
        </p>
      )}
    </div>
  )
}

// Composant principal
const AdminLoginPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: ""
  })

  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [loginAttempts, setLoginAttempts] = useState<number>(0)
  const [isBlocked, setIsBlocked] = useState<boolean>(false)
  const [blockTimer, setBlockTimer] = useState<NodeJS.Timeout | null>(null)

  const handleChange = (field: keyof FormData, value: string): void => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const validateForm = (): ValidationResult => {
    const newErrors: FormErrors = {}

    if (!formData.username.trim()) {
      newErrors.username = "Le nom d'utilisateur est requis"
    } else if (formData.username.length < CONFIG.MIN_USERNAME_LENGTH) {
      newErrors.username = `Minimum ${CONFIG.MIN_USERNAME_LENGTH} caractères`
    }

    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis"
    } else if (formData.password.length < CONFIG.MIN_PASSWORD_LENGTH) {
      newErrors.password = `Minimum ${CONFIG.MIN_PASSWORD_LENGTH} caractères`
    }

    setErrors(newErrors)
    return {
      isValid: Object.keys(newErrors).length === 0,
      errors: newErrors
    }
  }

  const blockAccount = (): void => {
    setIsBlocked(true)
    if (blockTimer) {
      clearTimeout(blockTimer)
    }

    const timer = setTimeout(() => {
      setIsBlocked(false)
      setLoginAttempts(0)
    }, CONFIG.BLOCK_DURATION_MS)

    setBlockTimer(timer)
  }

  const handleSubmit = async (): Promise<void> => {
    if (isBlocked) {
      alert("Compte bloqué. Réessayez dans quelques minutes.")
      return
    }

    const validation = validateForm()
    if (!validation.isValid) return

    setIsLoading(true)

    try {
      await new Promise<void>((resolve) => setTimeout(resolve, 1500))

      const isValidCredentials =
        formData.username === CONFIG.DEMO_CREDENTIALS.username &&
        formData.password === CONFIG.DEMO_CREDENTIALS.password

      if (isValidCredentials) {
        alert("Connexion réussie ! Redirection...")
        setLoginAttempts(0)
        setErrors({})
      } else {
        const newAttempts = loginAttempts + 1
        setLoginAttempts(newAttempts)

        if (newAttempts >= CONFIG.MAX_LOGIN_ATTEMPTS) {
          blockAccount()
          setErrors({
            general: "Trop de tentatives. Compte bloqué 5 min."
          })
        } else {
          setErrors({
            general: `Identifiants incorrects (${newAttempts}/${CONFIG.MAX_LOGIN_ATTEMPTS})`
          })
        }
      }
    } catch (error) {
      setErrors({ general: "Erreur de connexion" })
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    return () => {
      if (blockTimer) {
        clearTimeout(blockTimer)
      }
    }
  }, [blockTimer])

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-firstColor/20 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-firstColor/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-secondColor/10 rounded-full blur-2xl animate-bounce"></div>
      </div>

      <div className="relative z-10 w-full max-w-sm">
        {/* Card principale */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Header compact */}
          <div className="px-6 pt-6 pb-4 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3">
              <Image
                src="/logo.png"
                alt="logo"
                height={32}
                width={32}
                className="w-full h-full object-cover rounded-lg animate-bounce"
              />
            </div>
            <h1 className="text-xl font-bold text-white mb-1">Admin</h1>
            <p className="text-gray-300 text-sm">
              Panneau d&apos;administration
            </p>
          </div>

          {/* Formulaire compact */}
          <div className="px-6 pb-6">
            {errors.general && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-400/30 rounded-lg flex items-start">
                <AlertCircle
                  size={16}
                  className="text-red-400 mr-2 mt-0.5 flex-shrink-0"
                />
                <span className="text-red-300 text-xs">{errors.general}</span>
              </div>
            )}

            <div className="space-y-4">
              {/* Nom d'utilisateur */}
              <div>
                <label className="block text-gray-300 text-xs font-medium mb-2">
                  Nom d&apos;utilisateur
                </label>
                <InputField
                  type="text"
                  value={formData.username}
                  onChange={(value) => handleChange("username", value)}
                  placeholder="admin"
                  icon={User}
                  error={errors.username}
                  disabled={isLoading || isBlocked}
                />
              </div>

              {/* Mot de passe */}
              <div>
                <label className="block text-gray-300 text-xs font-medium mb-2">
                  Mot de passe
                </label>
                <InputField
                  type="password"
                  value={formData.password}
                  onChange={(value) => handleChange("password", value)}
                  placeholder="password123"
                  icon={Lock}
                  error={errors.password}
                  disabled={isLoading || isBlocked}
                  showPasswordToggle={true}
                  onTogglePassword={() => setShowPassword(!showPassword)}
                  showPassword={showPassword}
                />
              </div>

              {/* Indicateur tentatives */}
              {loginAttempts > 0 && !isBlocked && (
                <div className="flex items-center justify-center p-2 bg-yellow-500/20 border border-yellow-400/30 rounded-lg">
                  <AlertCircle size={14} className="text-yellow-400 mr-2" />
                  <span className="text-yellow-300 text-xs">
                    Échec: {loginAttempts}/{CONFIG.MAX_LOGIN_ATTEMPTS}
                  </span>
                </div>
              )}

              {/* Bouton connexion */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading || isBlocked}
                className={`w-full py-3 rounded-lg font-semibold text-sm transition-all duration-300 transform ${
                  isLoading || isBlocked
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-firstColor to-secondColor text-white hover:from-firstColor/90 hover:to-secondColor/90 hover:scale-[1.02] shadow-lg hover:shadow-xl"
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <LoadingSpinner size="sm" className="mr-2" />
                    Connexion...
                  </div>
                ) : isBlocked ? (
                  <div className="flex items-center justify-center">
                    <Lock size={16} className="mr-2" />
                    Bloqué
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Shield size={16} className="mr-2" />
                    Se connecter
                  </div>
                )}
              </button>
            </div>

            {/* Footer */}
            <div className="mt-4 text-center">
              <p className="text-gray-500 text-xs">© 2025 STRASS SHOP</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLoginPage
