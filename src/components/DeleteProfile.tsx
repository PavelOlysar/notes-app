// 'use client'

// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from '@/components/ui/alert-dialog'
// import { Button } from '@/components/ui/button'
// import { toast } from 'react-hot-toast'
// import { deleteProfile } from '@/actions/profile.action'

// export function DeleteProfile({ username }: { username: string }) {
//   const [isDeleting, setIsDeleting] = useState(false)
//   const router = useRouter()

//   const handleDelete = async () => {
//     setIsDeleting(true)
//     try {
//       const result = await deleteProfile(username)
//       if (result.success) {
//         toast.success('Profile deleted successfully')
//         router.push('/')
//       } else {
//         toast.error(result.error ?? 'Failed to delete profile')
//       }
//     } catch (error) {
//       toast.error('Failed to delete profile')
//     } finally {
//       setIsDeleting(false)
//     }
//   }

//   return (
//     <AlertDialog>
//       <AlertDialogTrigger asChild>
//         <Button variant="destructive">Delete Account</Button>
//       </AlertDialogTrigger>
//       <AlertDialogContent>
//         <AlertDialogHeader>
//           <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
//           <AlertDialogDescription>
//             This action cannot be undone. This will permanently delete your
//             account and all of your notes.
//           </AlertDialogDescription>
//         </AlertDialogHeader>
//         <AlertDialogFooter>
//           <AlertDialogCancel>Cancel</AlertDialogCancel>
//           <AlertDialogAction
//             onClick={handleDelete}
//             className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
//             disabled={isDeleting}
//           >
//             {isDeleting ? 'Deleting...' : 'Delete Account'}
//           </AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   )
// }
