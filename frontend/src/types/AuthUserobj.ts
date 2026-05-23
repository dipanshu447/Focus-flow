export type AuthUserobj = {
    name?: string
    email: string
    password: string
}

export type ResAuthUserObj = {
    token: string
    user: {
        id: string
        name: string
        email: string,
        theme: "dark" | "light",
    }
}