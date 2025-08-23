import { UserDTO } from '@/lib/dtos/user_dto_validator'

export const getUserDisplayName = (
  user: Pick<UserDTO, 'given_name' | 'family_name'>,
) => {
  if (user.family_name) {
    return `${user.given_name} ${user.family_name}`
  }

  return user.given_name
}
