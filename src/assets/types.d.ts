export interface Message {
    id: string
    message: string
    userToId: string
    userFromId?: string
    liked: boolean
    createdAt: string
}