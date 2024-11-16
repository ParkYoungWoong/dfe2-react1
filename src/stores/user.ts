import { create } from 'zustand'
import { combine } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export const useUserStore = create(
  immer(
    combine(
      {
        user: {
          address: {
            city: 'Seoul',
            contact: {
              phone: '01012345678',
              emails: ['thesecon@gmail.com']
            }
          },
          displayName: 'HEROPY',
          isValid: true
        }
      },
      set => ({
        setEmail: (email: string) => {
          set(state => {
            state.user.address.contact.emails[0] = email
            // return {
            //   user: {
            //     ...state.user,
            //     address: {
            //       ...state.user.address,
            //       contact: {
            //         ...state.user.address.contact,
            //         emails: [email]
            //       }
            //     }
            //   }
            // }
          })
        }
      })
    )
  )
)
